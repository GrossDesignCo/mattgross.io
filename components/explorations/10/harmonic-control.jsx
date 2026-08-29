import { useContext } from 'react';
import { SettingsContext } from './control-context';
import { IconMinus } from '../../icons/minus';
import { IconPlus } from '../../icons/plus';
import styles from './10.module.css';

export const HarmonicControl = () => {
  const { harmonicCount, setHarmonicCount, minHarmonics, maxHarmonics, claimUserControl } =
    useContext(SettingsContext);

  const adjust = (delta) => {
    claimUserControl();
    setHarmonicCount((count) =>
      Math.min(maxHarmonics, Math.max(minHarmonics, count + delta))
    );
  };

  return (
    <div className={styles.harmonicControl}>
      <button
        type="button"
        className={styles.stepButton}
        aria-label="Fewer harmonics"
        disabled={harmonicCount <= minHarmonics}
        onClick={() => adjust(-1)}
      >
        <IconMinus />
      </button>

      <div className={styles.rangeWrapper}>
        <input
          type="range"
          id="harmonics"
          min={minHarmonics}
          max={maxHarmonics}
          step="1"
          className={styles.range}
          value={harmonicCount}
          onPointerDown={claimUserControl}
          onChange={(e) => {
            claimUserControl();
            setHarmonicCount(parseInt(e.target.value, 10));
          }}
        />
      </div>

      <button
        type="button"
        className={styles.stepButton}
        aria-label="More harmonics"
        disabled={harmonicCount >= maxHarmonics}
        onClick={() => adjust(1)}
      >
        <IconPlus />
      </button>

      <label className={styles.harmonicLabel} htmlFor="harmonics">
        {harmonicCount}
      </label>
    </div>
  );
};
