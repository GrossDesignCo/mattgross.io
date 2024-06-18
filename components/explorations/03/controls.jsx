import { useContext, useEffect } from 'react';
import cx from 'classnames';
import { CanvasContext } from './canvas';
import styles from './03.module.css';

const Controls = () => {
  const { playing, togglePlaying, progress, setProgress } =
    useContext(CanvasContext);

  useEffect(() => {
    const handleKeys = (e) => {
      if (e.key === ' ') {
        togglePlaying();
      }
    };
    window.addEventListener('keydown', handleKeys);

    return () => {
      window.removeEventListener('keydown', handleKeys);
    };
  }, [togglePlaying]);

  /**
   * PAUSE HERE
   * - Allow toggling freelook while animating
   * - Come up with a few camera orientation presets based on the target position
   * - Bias it to look forward early and backward late
   * - Bias it to look up when above equator and down when below
   */

  return (
    <>
      {/* Exterior Controls */}
      <div className={cx(styles.controls, 'monospace')}>
        <button
          className={cx(styles.playpause, styles.button)}
          onClick={togglePlaying}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  );
};

export default Controls;
