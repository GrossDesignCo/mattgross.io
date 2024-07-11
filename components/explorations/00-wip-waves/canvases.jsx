import { useRef, useEffect, useState } from 'react';
import { resizeCanvas } from './resizeCanvas';
import { drawWaveFunctions } from './drawWaveFunctions';
import styles from './00.module.css';
import { drawLightness } from './drawLightness';
import { drawRadialGradient } from './drawRadialGradient';
import { Controls } from './controls';

export const Canvases = () => {
  const rawWaveCanvas = useRef();
  const lightnessCanvas = useRef();
  const circleCanvas = useRef();

  const [selectedFn, setSelectedFn] = useState('cosine');

  useEffect(() => {
    if (rawWaveCanvas.current && selectedFn) {
      const render = () => {
        drawWaveFunctions(rawWaveCanvas.current, selectedFn);
      };

      // Handle window resizing
      const cleanup = resizeCanvas(rawWaveCanvas.current, render);

      return () => {
        cleanup();
      };
    }
  }, [rawWaveCanvas, selectedFn]);

  useEffect(() => {
    if (lightnessCanvas.current && selectedFn) {
      const render = () => {
        drawLightness(lightnessCanvas.current, selectedFn);
      };

      // Handle window resizing
      const cleanup = resizeCanvas(lightnessCanvas.current, render);

      return () => {
        cleanup();
      };
    }
  }, [lightnessCanvas, selectedFn]);

  useEffect(() => {
    if (circleCanvas.current && selectedFn) {
      const render = () => {
        drawRadialGradient(circleCanvas.current, selectedFn);
      };

      // Handle window resizing
      const cleanup = resizeCanvas(circleCanvas.current, render);

      return () => {
        cleanup();
      };
    }
  }, [circleCanvas, selectedFn]);

  return (
    <>
      <Controls selectedFn={selectedFn} onChange={setSelectedFn} />

      <canvas
        ref={rawWaveCanvas}
        className={styles.canvas}
        width="100"
        height="100"
      />

      <canvas
        ref={lightnessCanvas}
        className={styles.canvas}
        width="100"
        height="100"
      />

      <canvas
        ref={circleCanvas}
        className={styles.canvas}
        width="100"
        height="100"
      />
    </>
  );
};
