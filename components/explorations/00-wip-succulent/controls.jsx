import { useEffect, useMemo } from 'react';
import cx from 'classnames';
import styles from './06.module.css';
import { IconPlayPause } from '../../icons/play-pause';

const presetProportions = [
  ['0', 0],
  ['1/8', 1 / 8],
  ['1/5', 1 / 5],
  ['1/4', 1 / 4],
  ['1/3', 1 / 3],
  ['2/5', 2 / 5],
  ['1/2', 1 / 2],
  ['2/3', 2 / 3],
  // Golden angle: ~137.5 degrees, exact math below
  ['(3-√5)', 3 - Math.sqrt(5), true],
  ['', 1],
  ['8/7', 8 / 7],
  ['4/3', 4 / 3],
  ['5/3', 5 / 3],
  ['20/11', 20 / 11],
  ['2', 2],
];

export const Controls = ({
  proportion,
  setProportion,
  proportionRef,
  paused,
  setPaused,
  pausedRef,
}) => {
  const formattedProportion = proportion.toFixed(3);

  // Allow animating the proportion value forward
  const animatePoints = useMemo(() => {
    const animatePoints = (p) => {
      if (pausedRef.current) return;

      // Step from range
      const step = 0.001;
      const newProportion = (p < 2 ? p : 0) + step * 0.1; // TODO swap for dt
      setProportion(newProportion);
      requestAnimationFrame(() => animatePoints(newProportion));
    };

    return animatePoints;
  }, [pausedRef, setProportion]);

  // Use spacebar to play/pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      let p = proportionRef.current;

      if (e.key === ' ') {
        setPaused(!pausedRef.current);
      }

      if (e.key === 'ArrowLeft') {
        setPaused(true);
        setProportion(p <= 0 ? 1.999 : p - 0.001);
      }

      if (e.key === 'ArrowRight') {
        setPaused(true);
        setProportion(p >= 2 ? 0.001 : p + 0.001);
      }
    };

    addEventListener('keydown', handleKeyDown);

    return () => {
      removeEventListener('keydown', handleKeyDown);
    };
  }, [setPaused, pausedRef, proportionRef, setProportion]);

  // Play the animation whenever un-pausing (or if initially un-paused)
  useEffect(() => {
    if (!paused) {
      animatePoints(proportionRef.current);
    }
  }, [paused, proportionRef, animatePoints]);

  return (
    <div className={cx(styles.controls, 'monospace')}>
      {/* Include a button for visual affordance */}
      <button
        onClick={() => {
          setPaused(!paused);
        }}
        className={cx(styles.button, styles[paused ? 'play' : 'pause'])}
      >
        <IconPlayPause paused={paused} />
      </button>

      <div className={styles.rangeWrapper}>
        <input
          type="range"
          id="proportion"
          min="0"
          max="2"
          step="0.001"
          className={styles.range}
          value={proportion}
          onChange={(e) => {
            // Pause animation when setting values manually
            setPaused(true);
            setProportion(parseFloat(e.target.value));
          }}
        />

        {/* Preset proportions with cool visuals */}
        <div className={styles.presets}>
          {presetProportions.map(([label, value, isGoldenAngle]) => {
            return (
              <button
                key={label}
                className={cx(styles.preset, {
                  [styles.isGoldenAngle]: isGoldenAngle,
                })}
                style={{ left: `calc(${(value * 100) / 2}%)` }}
                onClick={() => {
                  setPaused(true);
                  setProportion(value);
                }}
              >
                {label}π
              </button>
            );
          })}
        </div>
      </div>

      <label htmlFor="proportion">{formattedProportion}π</label>
    </div>
  );
};
