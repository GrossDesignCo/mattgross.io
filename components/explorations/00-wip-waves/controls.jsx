import cx from 'classnames';
import { IconArrowLeft } from '../../icons/arrow-left';
import { IconArrowRight } from '../../icons/arrow-right';
import { functions } from './functions';
import styles from './00.module.css';

export const Controls = ({ selectedFn, onChange }) => {
  const options = Object.keys(functions);

  return (
    <div className={styles.controls}>
      {options.map((key) => {
        return (
          <button
            key={key}
            className={cx(styles.controlButton, {
              [styles.controlButtonSelected]: selectedFn === key,
            })}
            aria-label="Previous function"
            onClick={() => onChange(key)}
          >
            {key}
          </button>
        );
      })}
      {/* <button
        className={styles.controlIconButton}
        aria-label="Previous function"
        onClick={() => handleClick(-1)}
      >
        <IconArrowLeft />
      </button>

      <button
        className={styles.controlIconButton}
        aria-label="Next function"
        onClick={() => handleClick(1)}
      >
        <IconArrowRight />
      </button> */}

      {functions[selectedFn].toString()}
    </div>
  );
};
