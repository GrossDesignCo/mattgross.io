import { useId } from 'react';
import cx from 'classnames';
import styles from './04.module.css';

export const ControlRange = ({ min, max, value, select, label }) => {
  const id = useId();

  return (
    <div className={styles.controlRange}>
      <label className={styles.control}>
        <input
          type="range"
          onChange={(e) => select(e.target.value)}
          min={min}
          max={max}
          name={id}
          value={value}
        />
        <span>{label}</span>
      </label>
    </div>
  );
};
