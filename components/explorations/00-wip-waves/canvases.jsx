import { useState } from 'react';
import { drawWaveFunctions } from './drawWaveFunctions';
import { drawBezierFunctions } from './drawBezierFunctions';
import { drawLightness } from './drawLightness';
import { Controls } from './controls';
import { Canvas } from './canvas';
import styles from './00.module.css';

export const Canvases = () => {
  const [selectedFn, setSelectedFn] = useState('inverted cosine');

  return (
    <>
      <Controls selectedFn={selectedFn} onChange={setSelectedFn} />

      <div className={styles.canvases}>
        <Canvas selectedFn={selectedFn} drawFn={drawWaveFunctions} />
        <Canvas selectedFn={selectedFn} drawFn={drawLightness} />

        <hr className={styles.hr} />

        <Canvas selectedFn={() => {}} drawFn={drawBezierFunctions} />
        {/* <Canvas selectedFn={selectedFn} drawFn={drawLightness} /> */}
      </div>
    </>
  );
};
