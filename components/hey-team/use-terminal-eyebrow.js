import { useEffect, useRef, useState } from 'react';
import { buildFrames, promptFor } from './eyebrow-engine';

// Plays back whatever buildFrames compiles for the {dir, command} target.
// Deliberately dumb: it tracks the last frame actually rendered (not the
// destination it was heading to) and steps through new frames on a
// timeout chain. All the terminal-y behavior lives in eyebrow-engine.js —
// this file would look the same if the frames were typing an eyebrow or
// crawling a progress bar.
//
// Tracking the *last rendered frame* rather than the target we were
// asked for is what makes redirects — target changing again before a
// sequence finishes — continue smoothly instead of jumping: buildFrames
// gets handed "wherever we actually stopped" as `prev`, so an abandoned
// half-typed `cd ~/portfolio/te` keeps backspacing from exactly that,
// not from a state that was never actually shown.
//
// `onExecute` fires synchronously the instant a frame flagged
// `execute: true` is applied — that's Deck's hook for firing the theme
// wipe at the exact moment a section-crossing `cd` "runs".
//
// `onSettle` fires once the whole frame sequence has finished playing —
// the universal "typing is done" signal Deck gates every slide content
// transition on (not just section crossings), per CLAUDE.md's
// entering/exiting-has-a-purpose rule: the eyebrow's own typing motion
// is the anticipation beat, the content transition is the payoff.
//
// `instant` collapses the sequence straight to its final frame, same as
// prefers-reduced-motion below — Deck sets it whenever a goTo lands
// while the previous one is still in flight (typing or the content
// transition it gates), so scrubbing through several slides doesn't
// force each one's full choreography to play out.
export function useTerminalEyebrow(target, { onExecute, onSettle, instant } = {}) {
  const [frame, setFrame] = useState({ prompt: '', command: '' });
  // Whether a frame sequence is actively playing — false once it's
  // settled on its last frame with nothing left scheduled. Eyebrow uses
  // this to gate its idle cursor fade so it never fires mid-typing.
  const [isTyping, setIsTyping] = useState(false);
  const currentRef = useRef(null);
  const onExecuteRef = useRef(onExecute);
  const onSettleRef = useRef(onSettle);
  const instantRef = useRef(instant);

  // Keep the refs in sync outside of render (mutating them during render
  // trips react-hooks/refs) without making the main effect below depend
  // on onExecute's/onSettle's/instant's identity.
  useEffect(() => {
    onExecuteRef.current = onExecute;
    onSettleRef.current = onSettle;
    instantRef.current = instant;
  });

  useEffect(() => {
    const prev = currentRef.current;
    const frames = buildFrames(prev, target);

    const reduceMotion =
      instantRef.current ||
      (typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const applyFrame = (f) => {
      currentRef.current = { dir: f.dir, command: f.command };
      setFrame({ prompt: f.prompt, command: f.command });
      if (f.execute) onExecuteRef.current?.();
    };

    if (reduceMotion) {
      const last = frames[frames.length - 1] ?? {
        prompt: promptFor(target.dir),
        command: target.command ?? '',
        dir: target.dir,
      };
      // Skipping the animation shouldn't skip the execute signal — Deck
      // still needs to know a dir change happened so the content/theme
      // swap fires, just without the choreography around it.
      applyFrame({ ...last, execute: !!prev && prev.dir !== target.dir });
      setIsTyping(false);
      onSettleRef.current?.();
      return;
    }

    let cancelled = false;
    let timerId;
    let i = 0;

    const tick = () => {
      if (cancelled) return;
      // This is also the trailing call scheduled after the last real
      // frame (see the unconditional setTimeout below) — the point at
      // which the sequence has actually settled, not just applied its
      // last frame, so the idle blink doesn't start competing with that
      // frame's own dwell time.
      if (i >= frames.length) {
        setIsTyping(false);
        onSettleRef.current?.();
        return;
      }
      applyFrame(frames[i]);
      const { delay } = frames[i];
      i += 1;
      timerId = setTimeout(tick, delay);
    };
    setIsTyping(true);
    tick();

    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
    // Deps are target's fields, not target itself — Eyebrow passes a
    // fresh {dir, command} object every render, and re-running this
    // effect (restarting the whole frame sequence) should only happen
    // when the destination actually changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.dir, target.command]);

  return { ...frame, isTyping };
}
