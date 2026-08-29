import { useRef, useEffect, useContext, useLayoutEffect } from 'react';
import { resizeCanvas } from './resizeCanvas';
import { drawWaves } from './drawWaves';
import { SettingsContext } from './control-context';
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

    const draw = () => {
      drawWaves(canvas.current, {
        phase,
        harmonicCount: harmonicCountRef.current,
        layout: layoutRef.current,
      });
    };

    const tick = () => {
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
