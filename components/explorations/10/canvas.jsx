import { useRef, useEffect } from 'react';
import { resizeCanvas } from './resizeCanvas';
import { drawWaves } from './drawWaves';
import styles from './10.module.css';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

export const Canvas = () => {
  const canvas = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!canvas.current) return;

    let frameId;
    let phase = prefersReducedMotion ? 1.2 : 0;
    let harmonicCount = 1;

    const render = () => {
      drawWaves(canvas.current, { phase, harmonicCount });

      if (!prefersReducedMotion) {
        phase += 0.018;

        if (harmonicCount < 7) {
          harmonicCount += (7 - harmonicCount) * 0.0025;
        }
      }

      frameId = requestAnimationFrame(render);
    };

    render();
    const cleanupResize = resizeCanvas(canvas.current, render);

    return () => {
      cancelAnimationFrame(frameId);
      cleanupResize?.();
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvas} className={styles.canvas} width="100" height="100" />;
};
