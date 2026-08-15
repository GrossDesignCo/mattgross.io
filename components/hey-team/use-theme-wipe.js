import { useCallback, useRef, useState } from 'react';

// A section-crossing transition's ceremony: a solid panel slides in from
// the nav-direction edge to fully cover the screen (COVER_MS), the real
// content + theme swap happens invisibly at that exact covered instant
// (the caller's onMidpoint), then the panel continues in the same
// direction off the opposite edge (REVEAL_MS) — so the "swipe" is one
// continuous motion, and the reveal half is what makes the next slide
// read as animating in rather than just appearing.
//
// Deliberately not the View Transition API: this deck already leaned on
// it for the slide crossfade and hit real Safari selector-matching bugs
// doing so (see deck.jsx) — a second, fancier usage isn't worth risking
// here when a plain transform + timeout does the same job. Re-calling
// play() while a previous wipe is still animating just retargets the
// panel's transform mid-flight (redirects — see eyebrow-engine.js for
// the matching logic on the typing side); CSS transitions retarget from
// their current computed value on their own, no extra bookkeeping needed.
const COVER_MS = 240;
const REVEAL_MS = 340;

export function useThemeWipe() {
  const [wipe, setWipe] = useState(null); // { direction, theme, phase }
  const timerRef = useRef(null);

  const play = useCallback((direction, theme, onMidpoint) => {
    clearTimeout(timerRef.current);

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      onMidpoint();
      setWipe(null);
      return;
    }

    setWipe({ direction, theme, phase: 'covering' });
    timerRef.current = setTimeout(() => {
      onMidpoint();
      setWipe({ direction, theme, phase: 'revealing' });
      timerRef.current = setTimeout(() => setWipe(null), REVEAL_MS);
    }, COVER_MS);
  }, []);

  return { wipe, play, coverMs: COVER_MS, revealMs: REVEAL_MS };
}
