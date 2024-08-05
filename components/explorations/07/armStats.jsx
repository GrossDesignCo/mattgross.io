import { useEffect, useState } from 'react';
import cx from 'classnames';
import styles from './07.module.css';

const modeHotkeysMap = {
  l: 'set-length',
  s: 'set-speed',
  a: 'set-start-angle',
};

export const ArmStats = ({ clickedArm, setMode, canvas }) => {
  // Listen for mode selection
  // useEffect(() => {
  //   const setModeFromKey = (e) => {
  //     if (Object.keys(modeHotkeysMap).includes(e.key)) {
  //       setMode(modeHotkeysMap[e.key]);
  //     }
  //   };
  //   if (clickedArm) {
  //     window.addEventListener('keydown', setModeFromKey);
  //   }

  //   return () => {
  //     window.removeEventListener('keydown', setModeFromKey);
  //   };
  // }, [clickedArm, setMode]);

  if (!clickedArm) return;
  const [x, y] = clickedArm?.pos;
  const { length, speed, startAngle } = clickedArm?.arm;

  const canvasCenterX = canvas.current.width / 2;
  const canvasCenterY = canvas.current.height / 2;
  const windowSize = Math.min(canvas.current.width, canvas.current.height);
  const maxSize = (windowSize / 2) * 0.8;
  const scaledLength = maxSize * length;

  // console.log('ARM STATS', {
  //   clickedArm,
  // });

  return (
    <div
      style={{
        '--arm-x': `${(x + canvasCenterX) / window.devicePixelRatio}px`,
        '--arm-y': `${(y + canvasCenterY) / window.devicePixelRatio}px`,
        // '--arm-speed-transform-origin': `${
        //   -1 * scaledLength * window.devicePixelRatio
        // }px`,
        // '--arm-speed': `${(-1 * speed) / 2}rad`,
      }}
      className={cx(styles.armStats, 'monospace')}
    >
      <div className={styles.length}>Length: {length}</div>
      <div className={styles.speed}>Speed: {speed}</div>
      <div className={styles.startAngle}>St. Angle: {startAngle}</div>

      {/* {Object.entries(modeHotkeysMap).map(([key, mode]) => {
        return (
          <button key={mode} onClick={() => setMode(mode)}>
            <span className="key">{key.toUpperCase()}</span>
            {mode}
          </button>
        );
      })} */}
    </div>
  );
};
