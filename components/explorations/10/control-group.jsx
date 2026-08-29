import { useId } from 'react';
import cx from 'classnames';
import styles from './10.module.css';

export const ControlGroup = ({ options, selected, select }) => {
  const isMultiple = Array.isArray(selected);
  const id = useId();

  return (
    <div className={styles.controlGroup}>
      {options.map((option) => {
        const isSelected = isMultiple
          ? selected.includes(option)
          : selected === option;

        const handleChange = () => {
          if (isMultiple) {
            select(
              isSelected
                ? selected.filter((opt) => opt !== option)
                : [...selected, option]
            );
          } else {
            select(option);
          }
        };

        return (
          <label key={option} className={cx(styles.control, styles[option])}>
            <input
              type={isMultiple ? 'checkbox' : 'radio'}
              onChange={handleChange}
              checked={isSelected}
              name={id}
              value={option}
            />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
};
