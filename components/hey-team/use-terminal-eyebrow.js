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
// `execute: true` is applied — that's Deck's hook for firing the content
// swap and theme wipe at the exact moment the prompt "runs".
//
// `instant` collapses the sequence straight to its final frame, same as
// prefers-reduced-motion below — Deck sets it for a section crossing that
// followed another goTo within FAST_REPEAT_MS, so skimming/holding a key
// through several sections doesn't force each one's cd/pause/execute to
// play out in full.
export function useTerminalEyebrow(target, { onExecute, instant } = {}) {
  const [frame, setFrame] = useState({ prompt: '', command: '' });
  const currentRef = useRef(null);
  const onExecuteRef = useRef(onExecute);
  const instantRef = useRef(instant);

  // Keep the refs in sync outside of render (mutating them during render
  // trips react-hooks/refs) without making the main effect below depend
  // on onExecute's/instant's identity.
  useEffect(() => {
    onExecuteRef.current = onExecute;
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
      return;
    }

    let cancelled = false;
    let timerId;
    let i = 0;

    const tick = () => {
      if (cancelled || i >= frames.length) return;
      applyFrame(frames[i]);
      const { delay } = frames[i];
      i += 1;
      timerId = setTimeout(tick, delay);
    };
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

  return frame;
}
