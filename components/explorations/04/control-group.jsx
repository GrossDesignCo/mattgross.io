import { useId } from 'react';
import cx from 'classnames';
import styles from './04.module.css';

export const ControlGroup = ({ options, selected, select }) => {
  // Get `multiple` setting from type of value passed
  const isMultiple = Array.isArray(selected);
  const id = useId();

  return (
    <div className={styles.controlGroup}>
      {options.map((option) => {
        // Check selected array for presence of this option
        const isSelected = isMultiple
          ? selected.includes(option)
          : selected === option;

        const handleChange = () => {
          // Add or remove the selected option from the array
          if (isMultiple) {
            select(
              isSelected
                ? selected.filter((opt) => opt !== option)
                : [...selected, option]
            );
          }
          // If not multiple, just set the clicked option
          else {
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
