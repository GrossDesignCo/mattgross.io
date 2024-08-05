import { useCallback, useEffect } from 'react';
import cx from 'classnames';
import styles from './07.module.css';
import { IconPlayPause } from '../../icons/play-pause';
import { IconReset } from '../../icons/reset';
import { IconMinus } from '../../icons/minus';
import { IconPlus } from '../../icons/plus';
import { IconCheckbox } from '../../icons/checkbox';

export const Controls = ({
  setAngle,
  angleRef,
  paused,
  setPaused,
  pausedRef,
  patterns,
  speed = 1,
  setSpeed,
  showArms,
  setShowArms,
}) => {
  // Allow animating the proportion value forward
  const animate = useCallback(
    (a) => {
      if (pausedRef.current) return;

      // Step from range
      const step = 0.005 * speed;
      const newAngle = a + step; // TODO swap for dt
      setAngle(newAngle);
      requestAnimationFrame(() => animate(newAngle));
    },
    [pausedRef, speed, setAngle]
  );

  // Ajust presets for speed
  const incrementSpeed = useCallback(() => {
    setSpeed(Math.abs(speed >= 1) ? speed + 1 : speed + 0.25);
  }, [setSpeed, speed]);

  const decrementSpeed = useCallback(() => {
    setSpeed(Math.abs(speed > 1) ? speed - 1 : speed - 0.25);
  }, [setSpeed, speed]);

  // Use spacebar to play/pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        setPaused(!pausedRef.current);
      }
    };

    addEventListener('keydown', handleKeyDown);

    return () => {
      removeEventListener('keydown', handleKeyDown);
    };
  }, [setPaused, pausedRef]);

  // Play the animation whenever un-pausing (or if initially un-paused)
  useEffect(() => {
    if (!paused) {
      animate(angleRef.current);
    }
  }, [paused, angleRef, animate]);

  return (
    <div className={styles.controls}>
      {/* Include a play/pause button for visual affordance */}
      <button
        onClick={() => {
          setPaused(!paused);
        }}
        className={cx(styles.button, styles[paused ? 'play' : 'pause'])}
      >
        <IconPlayPause paused={paused} />
      </button>
      {/* Reset button to start over */}
      <button
        onClick={() => {
          patterns.current = [];
          setAngle(0.0);
        }}
        className={styles.button}
      >
        <IconReset />
      </button>
      <hr className={styles.vertical} />
      {/* Speed +/- to help move long patterns along or slow down & be mesmerized */}
      <button
        onClick={() => {
          decrementSpeed();
        }}
        className={styles.button}
      >
        <IconMinus />
      </button>
      {speed}x
      <button
        onClick={() => {
          incrementSpeed();
        }}
        className={styles.button}
      >
        <IconPlus />
      </button>
      <hr className={styles.vertical} />
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          onChange={(e) => {
            setShowArms(e.target.checked);
          }}
          checked={showArms}
        />
        <IconCheckbox checked={showArms} />
        <span>Show Arms</span>
      </label>
    </div>
  );
};
