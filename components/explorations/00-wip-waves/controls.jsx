import { IconArrowLeft } from '../../icons/arrow-left';
import { IconArrowRight } from '../../icons/arrow-right';
import { functions } from './functions';
import styles from './00.module.css';

export const Controls = ({ selectedFn, onChange }) => {
  const options = Object.keys(functions);

  console.log({ selectedFn, options, onChange });

  const handleClick = (increment) => {
    const i = options.findIndex((fn) => selectedFn === fn);
    let newI = (i + increment) % options.length;
    if (newI < 0) newI = options.length - 1;

    console.log({ i, newI });

    onChange(options[newI]);
  };

  return (
    <div className={styles.controls}>
      <button
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
      </button>

      {functions[selectedFn].toString()}
    </div>
  );
};
