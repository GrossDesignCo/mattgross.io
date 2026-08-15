import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Eyebrow } from './eyebrow';
import { ThemeWipe } from './theme-wipe';
import { useTerminalEyebrow } from './use-terminal-eyebrow';
import { useThemeWipe } from './use-theme-wipe';
import { themeFor } from './themes';
import styles from './deck.module.css';
import themeStyles from './theme.module.css';

// Keys that map to each mock keycap in .chrome — Home/End included since
// they're "jump to the far end," the same direction as the arrow they sit
// under.
const RIGHT_KEYS = ['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'End'];
const LEFT_KEYS = ['ArrowLeft', 'ArrowUp', 'PageUp', 'Home'];

// Below this gap between keypresses, a section crossing is treated as
// someone skimming/holding a key rather than deliberately watching a
// crossing — the cd/wipe choreography is a flourish for the latter, not
// something that should slow down the former. Comfortably above OS key
// -repeat's inter-repeat interval (~30-50ms) and comfortably below the
// gap between two deliberate taps (~250ms+), so it separates the two
// reliably without needing to special-case "held" vs. "mashed."
const FAST_REPEAT_MS = 200;

// Orchestrates slide state + keyboard nav. Transitions use the browser's
// native View Transitions API (same-document mode) so the crossfade/slide
// is GPU-composited with zero animation-library weight. Direction is
// written to a CSS custom property on <html> before the transition starts;
// deck.module.css reads it via calc() inside a single unconditional
// keyframe so "next"/"back" mirror each other instead of playing a
// generic fade — see "directional transitions carry meaning" in
// CLAUDE.md. (Two earlier versions relied on selector-matching into the
// view-transition pseudo-element tree — a `data-*` attribute + descendant
// combinator, then `:active-view-transition-type()` — and neither matched
// reliably in Safari. Custom-property *inheritance* into that tree is a
// far more basic mechanism and isn't affected by that gap.)
//
// Three pieces of index state now, each answering a different question:
//   - `index` — what's actually in .viewport. Only ever set inside the
//     flushSync that startViewTransition() captures as its before/after
//     pair. The deck's theme (see the .deck className below) is derived
//     directly from this, so a section-crossing theme flip lands at
//     exactly the same instant as the content swap it's paired with.
//   - `displayIndex` — what .chrome (page count / dots) shows. Set after
//     transition.ready resolves, same as before.
//   - `announcedIndex` — what the eyebrow is currently typing toward.
//     Unlike the other two, this updates *immediately* on every goTo
//     call, same-section or not — it's what lets a section-crossing cd
//     sequence start typing the instant you press a key, while `index`/
//     `displayIndex` (and the actual view transition) stay frozen on the
//     old slide until the sequence executes.
//
// Same-section moves are unchanged from before: goTo runs the content
// swap immediately, non-blocking, exactly like a normal keypress always
// has here. Section-crossing moves defer that same content-swap function
// until useTerminalEyebrow's onExecute fires — see the cd/pause/execute
// choreography in eyebrow-engine.js — and pair it with a theme wipe
// (theme-wipe.jsx / use-theme-wipe.js). Redirecting mid-sequence (a new
// key press before execute) just overwrites the pending closure and lets
// useTerminalEyebrow's own redirect handling (see its comment) keep the
// typing smooth; nothing here needs to know a redirect happened.
//
// goTo calls closer together than FAST_REPEAT_MS skip that choreography
// entirely (see the `fast` check below) — holding a key or tapping
// through several sections shouldn't force each crossing's cd/pause/
// execute sequence to play out.
export const Deck = ({ slides }) => {
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [announcedIndex, setAnnouncedIndex] = useState(0);
  // Whether the section crossing announcedIndex is currently heading
  // toward should skip its choreography — see FAST_REPEAT_MS.
  const [fastTransition, setFastTransition] = useState(false);
  // Currently-held nav keys, so the mock keycaps in .chrome can visually
  // depress in step with the real keyboard — a Set (not two booleans) so
  // holding one key while tapping another doesn't drop the first.
  const [heldKeys, setHeldKeys] = useState(() => new Set());
  const total = slides.length;
  const indexRef = useRef(index);
  // What to run when the in-flight section-crossing sequence executes.
  // Overwritten wholesale on redirect — only the latest survives.
  const pendingRunRef = useRef(null);
  // Timestamp of the last goTo call, for the FAST_REPEAT_MS check below.
  const lastGoToAtRef = useRef(0);
  // The view transition currently in flight, if any.
  const activeTransitionRef = useRef(null);
  // Bumped on every real `execute` — Eyebrow re-keys its accent chip off
  // this to replay a one-shot flash, and skips it entirely at 0 so first
  // paint doesn't also flash (see the mount-only scale-in in
  // eyebrow.module.css, which already covers that moment).
  const [flashSeq, setFlashSeq] = useState(0);

  const { wipe, play: playWipe, coverMs, revealMs } = useThemeWipe();

  // `instant` skips .viewport's own crossfade entirely — used for a
  // section-crossing swap, which happens while the wipe's cover panel is
  // fully opaque. That crossfade would be invisible at the moment it
  // starts, but nothing forces its ~320ms to fit inside the wipe's own
  // reveal timing; on a slow frame (or after either duration gets tuned
  // independently) its tail can run past the reveal and become visible
  // as the wipe finishes uncovering. The wipe's sweep already *is* the
  // transition's motion here, so the fix is to not run a second,
  // redundant one underneath it rather than chase a timing margin.
  const runContentSwap = useCallback((clamped, direction, { instant } = {}) => {
    indexRef.current = clamped;

    // --hey-team-slide-direction is one shared property on <html>, read
    // *live* by whichever crossfade keyframes are currently animating.
    // Calling startViewTransition() again while one's still in flight
    // does auto-skip the old one, but not necessarily before this next
    // line flips the property — catch that ourselves so the outgoing
    // transition's animation is fully torn down before its direction
    // changes out from under it. Losing that race is what let a still-
    // exiting slide suddenly reverse direction mid-flight, only really
    // reachable now that the fast-repeat path (above) makes firing two
    // transitions this close together easy.
    activeTransitionRef.current?.skipTransition();

    if (instant || typeof document === 'undefined' || !document.startViewTransition) {
      activeTransitionRef.current = null;
      setIndex(clamped);
      setDisplayIndex(clamped);
      return;
    }

    document.documentElement.style.setProperty(
      '--hey-team-slide-direction',
      direction === 'forward' ? '1' : '-1'
    );

    // Only .viewport's index is inside the transitioned callback.
    const transition = document.startViewTransition(() => {
      flushSync(() => setIndex(clamped));
    });
    activeTransitionRef.current = transition;
    transition.finished.finally(() => {
      if (activeTransitionRef.current === transition) {
        activeTransitionRef.current = null;
      }
    });
    // indexRef.current (not the closed-over `clamped`) so rapid presses
    // that resolve out of order still converge on the true current slide.
    const syncDisplay = () => setDisplayIndex(indexRef.current);
    // A skipped transition rejects `ready` — still sync, that's expected
    // whenever a press interrupts one already in flight.
    transition.ready.then(syncDisplay, syncDisplay);
  }, []);

  const onEyebrowExecute = useCallback(() => {
    const run = pendingRunRef.current;
    pendingRunRef.current = null;
    run?.();
    setFlashSeq((n) => n + 1);
  }, []);

  const eyebrowTarget = slides[announcedIndex].eyebrow;
  const { prompt, command, isTyping } = useTerminalEyebrow(eyebrowTarget, {
    onExecute: onEyebrowExecute,
    instant: fastTransition,
  });

  const goTo = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      if (clamped === indexRef.current) return;

      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const fast = now - lastGoToAtRef.current < FAST_REPEAT_MS;
      lastGoToAtRef.current = now;

      const direction = clamped > indexRef.current ? 'forward' : 'backward';
      const crossesSection = slides[clamped].eyebrow.dir !== slides[indexRef.current].eyebrow.dir;

      setAnnouncedIndex(clamped);
      setFastTransition(fast);

      if (!crossesSection || fast) {
        pendingRunRef.current = null;
        runContentSwap(clamped, direction);
        return;
      }

      pendingRunRef.current = () => {
        playWipe(direction, themeFor(slides[clamped].eyebrow.dir), () => {
          runContentSwap(clamped, direction, { instant: true });
        });
      };
    },
    [total, slides, runContentSwap, playWipe]
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          event.preventDefault();
          goTo(indexRef.current + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          goTo(indexRef.current - 1);
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

  return (
    <div
      className={`${styles.deck} ${themeStyles.themed}`}
      data-hey-team-theme={themeFor(slides[index].eyebrow.dir)}
    >
      <Eyebrow prompt={prompt} command={command} isTyping={isTyping} flashSeq={flashSeq} />

      <div
        className={styles.viewport}
        // Set for exactly the "revealing" half of a section-crossing wipe
        // — the same instant runContentSwap's instant path already swaps
        // in the new slide underneath the wipe's cover panel (see goTo's
        // pendingRunRef above), so new content and this attribute always
        // land in the same render. Slide's staggered-reveal keyframes
        // (slide.module.css) key off this rather than firing on every
        // same-section crossfade too.
        data-hey-team-reveal={wipe?.phase === 'revealing' ? 'stagger' : undefined}
      >
        <Current />
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
