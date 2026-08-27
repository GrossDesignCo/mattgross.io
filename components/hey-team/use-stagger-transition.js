import { useCallback, useEffect, useRef, useState } from 'react';

// Exit/enter choreography for a same-section slide move: the outgoing
// slide's .stack items stagger out, and the instant the LAST one begins
// leaving, the incoming slide's items start staggering in over it — one
// continuous handoff, not a cut (see deck.jsx's goTo for how this is
// gated behind the eyebrow finishing its typing first).
//
// Event-driven (animationstart/animationend on each side's last .stack
// child, matched via :last-child so nothing here ever needs to count how
// many items a slide has) rather than timer-driven like
// use-theme-wipe.js — that hook's COVER_MS/REVEAL_MS are fixed, but the
// exit/enter duration here depends on item count, which varies per
// slide.
//
// overlayRef/incomingRef point at two wrapper elements Deck renders
// permanently (never unmounted, only their contents/attributes change)
// so the listeners below can be bound once on mount rather than rebound
// on every transition. Matched by :last-child alone, not animation name
// too — CSS Modules hashes keyframe names per-file, so the value
// event.animationName reports never equals the plain name written in
// slide.module.css; :last-child is unambiguous on its own anyway, since
// nothing else inside either wrapper ever animates.
export function useStaggerTransition() {
  const [stagger, setStagger] = useState(null); // { Outgoing, phase: 'exiting' | 'entering' }
  const overlayRef = useRef(null);
  const incomingRef = useRef(null);
  const onSwapRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const incoming = incomingRef.current;
    if (!overlay || !incoming) return;

    const isLastStackItem = (event) =>
      typeof event.target.matches === 'function' && event.target.matches(':last-child');

    // The outgoing overlay's last item beginning to leave is the handoff
    // instant — swap the real slide in underneath (still hidden behind
    // the overlay everywhere except where its now-animating items have
    // already moved/faded) and let the incoming stagger take over.
    const onOverlayStart = (event) => {
      if (!isLastStackItem(event)) return;
      onSwapRef.current?.();
      setStagger((prev) => (prev ? { ...prev, phase: 'entering' } : prev));
    };
    // The overlay's own exit is fully done — nothing left to show through it.
    const onOverlayEnd = (event) => {
      if (!isLastStackItem(event)) return;
      setStagger((prev) => (prev ? { ...prev, Outgoing: null } : prev));
    };
    // The incoming slide's own entrance is fully done — pipeline settles.
    // Also reachable (harmlessly, a no-op) from the wipe-driven vertical
    // reveal, which mounts into this same wrapper but never sets `stagger`
    // in the first place.
    const onIncomingEnd = (event) => {
      if (!isLastStackItem(event)) return;
      setStagger(null);
    };

    overlay.addEventListener('animationstart', onOverlayStart);
    overlay.addEventListener('animationend', onOverlayEnd);
    incoming.addEventListener('animationend', onIncomingEnd);
    return () => {
      overlay.removeEventListener('animationstart', onOverlayStart);
      overlay.removeEventListener('animationend', onOverlayEnd);
      incoming.removeEventListener('animationend', onIncomingEnd);
    };
  }, []);

  // onSwap is what actually advances Deck's slide index — called at the
  // handoff instant above, not synchronously here, so the outgoing
  // content is still what's on screen (and mid-exit) the moment play()
  // returns. Direction itself isn't tracked here — Deck sets
  // --hey-team-slide-direction directly on .viewport, inherited by both
  // the overlay and the incoming wrapper this hook renders into.
  const play = useCallback((Outgoing, onSwap) => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      onSwap();
      setStagger(null);
      return;
    }

    onSwapRef.current = onSwap;
    setStagger({ Outgoing, phase: 'exiting' });
  }, []);

  // Fast path for a goTo that lands while busy (see deck.jsx's shortcut
  // branch): skip the exit choreography entirely — there's no handoff to
  // wait for, since the caller is about to swap content in synchronously
  // — and cut straight to the incoming slide's own entrance. That
  // entrance is still the same real .stack animation 'entering' always
  // plays, closed out by the same onIncomingEnd listener above, so
  // whatever reads `stagger` downstream (deck.jsx's busyRef) stays
  // accurate for exactly as long as this snap's animation is actually
  // still on screen — no separate cooldown timer standing in for that.
  const snap = useCallback((onSwap) => {
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    onSwapRef.current = null;
    onSwap();

    if (reduceMotion) {
      setStagger(null);
      return;
    }

    setStagger({ Outgoing: null, phase: 'entering' });
  }, []);

  return { stagger, overlayRef, incomingRef, play, snap };
}
