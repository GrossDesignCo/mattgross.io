import { useContext, useEffect } from 'react';
import cx from 'classnames';
import { CanvasContext } from './canvas';
import styles from './3d.module.css';

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
   * - Frame the scene idea
   * - Camera within a camera
   * - allow for toggling the frame
   * - halftone pattern for light source
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
