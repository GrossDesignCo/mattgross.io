import styles from './00.module.css';

export const ControlGroup = ({ options, selected, select }) => {
  const isMultiple = Array.isArray(selected);

  return (
    <div className={styles.controlGroup}>
      {options.map((option) => {
        const isSelected = isMultiple
          ? selected.includes(option)
          : selected === option;

        const handleClick = () => {
          if (isMultiple) {
            console.log('isMultiple', {
              isMultiple,
              selected,
              isSelected,
              added: [...selected, option],
              filtered: selected.filter((opt) => opt !== option),
            });
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

          console.log({ selected, isMultiple, isSelected, option });
        };

        return (
          <button
            key={option}
            className={styles.control}
            onClick={handleClick}
            aria-pressed={isSelected}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
