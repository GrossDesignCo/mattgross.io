import { useRef, useEffect } from 'react';
import { resizeCanvas } from './resizeCanvas';
import { drawPoints } from './drawPoints';
import { Controls } from './controls';
import styles from './05.module.css';
import { useStateWithRef } from '../../../hooks/useStateWithRef';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

export const Canvas = () => {
  const canvas = useRef();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [proportion, setProportion, proportionRef] = useStateWithRef(0.0);
  const [paused, setPaused, pausedRef] = useStateWithRef(false);

  useEffect(() => {
    // Initial value only really matters for prefers-reduced-motion case, set it to something nice looking :)
    if (prefersReducedMotion) {
      setProportion(0.586);
      setPaused(true);
    }
  }, [prefersReducedMotion, setProportion, setPaused]);

  useEffect(() => {
    if (canvas.current) {
      const render = () => {
        drawPoints(canvas.current, proportion);
      };

      render();

      // Handle window resizing & re-render
      const cleanup = resizeCanvas(canvas.current, render);

      return () => {
        cleanup();
      };
    }
  }, [canvas, proportion]);

  return (
    <>
      <Controls
        proportion={proportion}
        setProportion={setProportion}
        proportionRef={proportionRef}
        paused={paused}
        setPaused={setPaused}
        pausedRef={pausedRef}
      />

      <canvas ref={canvas} className={styles.canvas} width="100" height="100" />
    </>
  );
};
