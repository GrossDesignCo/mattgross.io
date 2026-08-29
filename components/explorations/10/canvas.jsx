import { useRef, useEffect, useContext, useLayoutEffect } from 'react';
import { resizeCanvas } from './resizeCanvas';
import { drawWaves } from './drawWaves';
import { SettingsContext } from './control-context';
import { easeBezier } from './ease';
import { HARMONIC_TRANSITION_MS } from './harmonics';
import styles from './10.module.css';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

export const Canvas = () => {
  const canvas = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { layout, harmonicCount } = useContext(SettingsContext);
  const layoutRef = useRef(layout);
  const harmonicCountRef = useRef(harmonicCount);

  useLayoutEffect(() => {
    layoutRef.current = layout;
  }, [layout]);

  useLayoutEffect(() => {
    harmonicCountRef.current = harmonicCount;
  }, [harmonicCount]);

  useEffect(() => {
    if (!canvas.current) return;

    let frameId;
    let phase = prefersReducedMotion ? 1.2 : 0;
    let displayCount = harmonicCountRef.current;
    let transitionFrom = displayCount;
    let transitionTo = displayCount;
    let transitionStart = null;
    let lastTarget = harmonicCountRef.current;

    const draw = () => {
      drawWaves(canvas.current, {
        phase,
        displayCount,
        layout: layoutRef.current,
      });
    };

    const tick = (now) => {
      const target = harmonicCountRef.current;

      if (prefersReducedMotion) {
        displayCount = target;
        transitionStart = null;
        lastTarget = target;
      } else if (target !== lastTarget) {
        transitionFrom = displayCount;
        transitionTo = target;
        transitionStart = now;
        lastTarget = target;
      }

      if (transitionStart !== null) {
        const elapsed = now - transitionStart;
        const progress = Math.min(1, elapsed / HARMONIC_TRANSITION_MS);
        const eased = easeBezier(progress);

        displayCount = transitionFrom + (transitionTo - transitionFrom) * eased;

        if (progress >= 1) {
          displayCount = transitionTo;
          transitionStart = null;
        }
      }

      draw();

      if (!prefersReducedMotion) {
        phase += 0.018;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    const cleanupResize = resizeCanvas(canvas.current, draw);

    return () => {
      cancelAnimationFrame(frameId);
      cleanupResize?.();
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvas} className={styles.canvas} width="100" height="100" />;
};
