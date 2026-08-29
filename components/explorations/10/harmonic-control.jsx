import { useContext } from 'react';
import { SettingsContext } from './control-context';
import styles from './10.module.css';

export const HarmonicControl = () => {
  const { harmonicCount, setHarmonicCount, minHarmonics, maxHarmonics } =
    useContext(SettingsContext);

  return (
    <div className={styles.harmonicControl}>
      <div className={styles.rangeWrapper}>
        <input
          type="range"
          id="harmonics"
          min={minHarmonics}
          max={maxHarmonics}
          step="1"
          className={styles.range}
          value={harmonicCount}
          onChange={(e) => {
            setHarmonicCount(parseInt(e.target.value, 10));
          }}
        />
      </div>
      <label className={styles.harmonicLabel} htmlFor="harmonics">
        {harmonicCount}
      </label>
    </div>
  );
};
