import { useRef, useEffect } from 'react';
import { resizeCanvas } from './resizeCanvas';
import styles from './00.module.css';

export const Canvas = ({ selectedFn, drawFn }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current && selectedFn) {
      const render = () => {
        if (drawFn) drawFn(ref.current, selectedFn);
      };

      // Handle window resizing
      const cleanup = resizeCanvas(ref.current, render);

      return () => {
        cleanup();
      };
    }
  }, [ref, drawFn, selectedFn]);

  return (
    <>
      <canvas ref={ref} className={styles.canvas} width="100" height="100" />
    </>
  );
};
