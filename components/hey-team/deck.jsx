import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Eyebrow } from './eyebrow';
import { ThemeWipe } from './theme-wipe';
import { useTerminalEyebrow } from './use-terminal-eyebrow';
import { useThemeWipe } from './use-theme-wipe';
import { useStaggerTransition } from './use-stagger-transition';
import { themeFor } from './themes';
import styles from './deck.module.css';
import themeStyles from './theme.module.css';

// Keys that map to each mock keycap in .chrome — Home/End included since
// they're "jump to the far end," the same direction as the arrow they sit
// under.
const RIGHT_KEYS = ['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'End'];
const LEFT_KEYS = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Home'];

// Orchestrates slide state + keyboard nav. One pipeline drives every
// move, same-section or section-crossing: the eyebrow always types the
// destination's command first, and only once it settles does the slide
// content actually transition — see useTerminalEyebrow's onSettle below.
// A second keypress that lands before the previous move has fully
// settled (typing still playing, or the content transition/wipe still
// animating — see `busyRef`) shortcuts straight to the target instead of
// queuing up the full cd/typing choreography, so holding/tapping a key
// scrubs through slides rather than forcing every crossing's full
// sequence to play. The content swap itself is still instant either way
// — what the shortcut skips is the eyebrow's typing and (for a same-
// section move) the outgoing slide's exit; the incoming slide still
// plays its real entrance (use-stagger-transition.js's `snap`), so
// `busyRef` keeps correctly reading "in flight" for as long as that
// entrance is actually still on screen, and a burst of rapid presses
// stays in shortcut mode the whole time instead of alternating back into
// the slow typing-gated path between presses.
//
// Same-section moves and section crossings differ only in what plays
// once typing settles:
//   - same-section: use-stagger-transition.js's exit/enter handoff (the
//     outgoing slide's items stagger out; the moment the last one starts
//     leaving, the incoming slide's items start staggering in over it).
//   - crossing: the existing cd/pause/execute choreography
//     (eyebrow-engine.js) fires the full-page theme wipe mid-sequence
//     (via onExecute, not onSettle — the wipe needs to start the instant
//     the `cd` resolves, not wait for a section-landing slide's typing to
//     fully finish, though for the slides here those two land on the
//     same frame anyway since landing slides have no command to type).
//     The actual content swap happens invisibly at the wipe's fully-
//     covered midpoint, same as before; the reveal half sets the same
//     data-hey-team-phase attribute the stagger transition's own
//     entrance uses (slide.module.css), just with a vertical rather than
//     horizontal variant, since the wipe's sweep already carries the
//     directional cue.
//
// Three pieces of index state, each answering a different question:
//   - `index` — what's actually in .viewport's .incoming wrapper. Only
//     ever set inside applySwap, at the exact instant the content
//     transition's own handoff (stagger's onSwap, or the wipe's
//     onMidpoint) says the swap should happen.
//   - `displayIndex` — what .chrome (page count / dots) shows. Updated
//     in the same applySwap call as `index`, since both mechanisms now
//     already resolve "when did the new slide actually appear" for us.
//   - `announcedIndex` — what the eyebrow is currently typing toward.
//     Updates immediately on every goTo call, same-section or not — it's
//     what lets typing start the instant a key is pressed while `index`/
//     `displayIndex` stay frozen on the old slide until the transition
//     that's gated on that typing actually fires.
//
// A fourth piece, `targetIndexRef`, isn't state — it's what every goTo
// call computes its destination *from*, instead of `indexRef`. Keypresses
// arrive faster than a transition can commit, so `indexRef.current` (the
// last committed slide) can still read as the *previous* destination when
// the next keydown fires. Computing off it would make consecutive presses
// collide on the same target — a shortcut-snap mid-transition would land
// exactly where the transition it just cancelled was already headed,
// silently dropping one keypress's worth of advance. `targetIndexRef`
// instead tracks the cumulative destination of every goTo call as soon as
// it's requested, so each keypress always lands one slide past whatever
// the one before it asked for, whether or not that one has visually
// caught up yet — the 1:1 between keypress and slide change this whole
// pipeline exists to guarantee.
export const Deck = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [announcedIndex, setAnnouncedIndex] = useState(0);
  // Whether the eyebrow sequence announcedIndex is heading toward should
  // skip straight to its final frame — see the busy/shortcut logic in
  // goTo below.
  const [instantTransition, setInstantTransition] = useState(false);
  // Sign for --hey-team-slide-direction (slide.module.css) — set once
  // per goTo call, read by whichever stagger keyframes end up playing.
  const [direction, setDirection] = useState(1);
  // Currently-held nav keys, so the mock keycaps in .chrome can visually
  // depress in step with the real keyboard — a Set (not two booleans) so
  // holding one key while tapping another doesn't drop the first.
  const [heldKeys, setHeldKeys] = useState(() => new Set());
  const total = slides.length;
  const indexRef = useRef(index);
  // The cumulative destination of every goTo call so far — see the
  // top-of-file comment on why this, not indexRef, is what goTo computes
  // a new keypress's target from.
  const targetIndexRef = useRef(index);
  // What to run when the in-flight sequence reaches the relevant signal.
  // Exactly one of these is armed per goTo call (see goTo); overwritten
  // wholesale on redirect — only the latest survives.
  const pendingExecuteRunRef = useRef(null);
  const pendingSettleRunRef = useRef(null);
  // Whether *anything* in the pipeline (typing, stagger, or wipe) is
  // still in flight — synced from render state below, read synchronously
  // by goTo at keypress time to decide shortcut vs. full choreography.
  const busyRef = useRef(false);
  // Bumped on every real `execute` — Eyebrow re-keys its accent chip off
  // this to replay a one-shot flash, and skips it entirely at 0 so first
  // paint doesn't also flash (see the mount-only scale-in in
  // eyebrow.module.css, which already covers that moment).
  const [flashSeq, setFlashSeq] = useState(0);

  const { wipe, play: playWipe, cancel: cancelWipe, coverMs, revealMs } = useThemeWipe();
  const {
    stagger,
    overlayRef,
    incomingRef,
    play: playStagger,
    snap: snapStagger,
  } = useStaggerTransition();

  // <html>'s own background (styles/general.css) tracks the site-wide
  // color-scheme, not this deck's per-section theme, and the section-
  // crossing wipe is `position: fixed` — mobile Safari's rubber-band
  // overscroll can still pull the viewport past a fixed element's edge
  // and reveal whatever's behind it. Rather than mirror the theme onto
  // <html> from an effect (which can't win the very first paint, and
  // lags one commit behind on every theme change after that), a pure
  // `:root:has([data-hey-team-deck]…)` rule in general.css reads
  // .deck's/ThemeWipe's own data-hey-team-theme attributes directly —
  // see that file for the full rationale.

  // The one place `index`/`displayIndex` actually change — called at
  // whatever instant the active content transition says the new slide
  // should appear (stagger's handoff, the wipe's covered midpoint, or
  // immediately for a shortcut).
  const applySwap = useCallback((next) => {
    indexRef.current = next;
    setIndex(next);
    setDisplayIndex(next);
  }, []);

  const onEyebrowExecute = useCallback(() => {
    const run = pendingExecuteRunRef.current;
    pendingExecuteRunRef.current = null;
    run?.();
    setFlashSeq((n) => n + 1);
  }, []);

  const onEyebrowSettle = useCallback(() => {
    const run = pendingSettleRunRef.current;
    pendingSettleRunRef.current = null;
    run?.();
  }, []);

  const eyebrowTarget = slides[announcedIndex].eyebrow;
  const { prompt, command, isTyping } = useTerminalEyebrow(eyebrowTarget, {
    onExecute: onEyebrowExecute,
    onSettle: onEyebrowSettle,
    instant: instantTransition,
  });

  // useLayoutEffect, not useEffect: this must be current by the time the
  // *next* keydown fires, including an OS key-repeat only ~30-50ms after
  // this render — a plain effect's async scheduling isn't guaranteed to
  // win that race, but a layout effect flushes synchronously before the
  // browser can dispatch another event.
  useLayoutEffect(() => {
    busyRef.current = isTyping || stagger !== null || wipe !== null;
  });

  const goTo = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      if (clamped === targetIndexRef.current) return;
      targetIndexRef.current = clamped;

      const shortcut = busyRef.current;
      const dir = clamped > indexRef.current ? 'forward' : 'backward';
      const crossesSection = slides[clamped].eyebrow.dir !== slides[indexRef.current].eyebrow.dir;
      const Outgoing = slides[indexRef.current].Component;

      setAnnouncedIndex(clamped);
      setInstantTransition(shortcut);
      setDirection(dir === 'forward' ? 1 : -1);

      if (shortcut) {
        pendingExecuteRunRef.current = null;
        pendingSettleRunRef.current = null;
        cancelWipe();
        snapStagger(() => applySwap(clamped));
        return;
      }

      if (crossesSection) {
        pendingSettleRunRef.current = null;
        pendingExecuteRunRef.current = () => {
          playWipe(dir, themeFor(slides[clamped].eyebrow.dir), () => applySwap(clamped));
        };
        return;
      }

      pendingExecuteRunRef.current = null;
      pendingSettleRunRef.current = () => {
        playStagger(Outgoing, () => applySwap(clamped));
      };
    },
    [total, slides, playWipe, playStagger, snapStagger, cancelWipe, applySwap]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          event.preventDefault();
          goTo(targetIndexRef.current + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          goTo(targetIndexRef.current - 1);
          break;
        case 'Home':
          event.preventDefault();
          goTo(0);
          break;
        case 'End':
          event.preventDefault();
          goTo(total - 1);
          break;
        default:
          return;
      }

      setHeldKeys((prev) => (prev.has(event.key) ? prev : new Set(prev).add(event.key)));
    };

    // Release on keyup as normal, but also on blur — if a key is held
    // through an Alt-Tab, the tab-away eats the keyup and the keycap would
    // otherwise stay stuck down.
    const onKeyUp = (event) => {
      setHeldKeys((prev) => {
        if (!prev.has(event.key)) return prev;
        const next = new Set(prev);
        next.delete(event.key);
        return next;
      });
    };
    const onBlur = () => setHeldKeys(new Set());

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, [goTo, total]);

  const Current = slides[index].Component;
  const rightPressed = RIGHT_KEYS.some((key) => heldKeys.has(key));
  const leftPressed = LEFT_KEYS.some((key) => heldKeys.has(key));
  // Which entrance the .incoming wrapper's children should play, if any
  // — same-section stagger and the post-wipe reveal both land here, just
  // with different keyframes (slide.module.css) for the reason in the
  // top comment.
  const incomingPhase =
    stagger?.phase === 'entering' ? 'entering' : wipe?.phase === 'revealing' ? 'revealing' : undefined;

  return (
    <div
      className={`${styles.deck} ${themeStyles.themed}`}
      data-hey-team-deck
      data-hey-team-theme={themeFor(slides[index].eyebrow.dir)}
    >
      <Eyebrow prompt={prompt} command={command} isTyping={isTyping} flashSeq={flashSeq} />

      <div className={styles.viewport} style={{ '--hey-team-slide-direction': direction }}>
        <div
          ref={overlayRef}
          className={styles.exitOverlay}
          data-hey-team-phase={stagger?.Outgoing ? 'exiting' : undefined}
        >
          {stagger?.Outgoing && <stagger.Outgoing />}
        </div>

        <div ref={incomingRef} className={styles.incoming} data-hey-team-phase={incomingPhase}>
          {stagger?.phase !== 'exiting' && <Current />}
        </div>
      </div>

      <div className={styles.chrome}>
        <span
          aria-hidden
          className={leftPressed ? `${styles.key} ${styles.keyPressed}` : styles.key}
        >
          &larr;
        </span>

        <div className={styles.indicator}>
          <span className="monospace caption">
            {String(displayIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>

          <div className={styles.dots} aria-hidden>
            {slides.map((_, i) => (
              <span
                key={i}
                className={
                  i === displayIndex ? `${styles.dot} ${styles.dotActive}` : styles.dot
                }
              />
            ))}
          </div>
        </div>

        <span
          aria-hidden
          className={rightPressed ? `${styles.key} ${styles.keyPressed}` : styles.key}
        >
          &rarr;
        </span>
      </div>

      <p className={styles.srOnly} aria-live="polite">
        Slide {displayIndex + 1} of {total}
      </p>

      <ThemeWipe wipe={wipe} coverMs={coverMs} revealMs={revealMs} />
    </div>
  );
};
