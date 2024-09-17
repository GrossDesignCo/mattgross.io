import { useRef, useEffect } from 'react';
import { resizeCanvas } from './resizeCanvas';
import { drawPoints } from './drawPoints';
import styles from './06.module.css';

export const Canvas = () => {
  const canvas = useRef();

  useEffect(() => {
    if (canvas.current) {
      let petalCount = 4;
      let rotation = 0.0;
      const render = () => {
        drawPoints(canvas.current, petalCount, rotation);

        // Only jack the petals up to a few hundred
        if (petalCount < 360) {
          petalCount = petalCount + (360 - petalCount / 2) * 0.0015;
        }

        // Continuously rotate slowly
        rotation = rotation + 0.0005;

        requestAnimationFrame(() => {
          render();
        });
      };

      render();

      // Handle window resizing & re-render
      const cleanup = resizeCanvas(canvas.current, render);

      return () => {
        cleanup();
      };
    }
  }, [canvas]);

  return (
    <>
      <canvas ref={canvas} className={styles.canvas} width="100" height="100" />
    </>
  );
};
