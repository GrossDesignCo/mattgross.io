import { useEffect, useState } from 'react';
import styles from './digital.module.css';
import cx from 'classnames';

// Character grid system:
// 5-row grid where:
// - Rows 1,3,5: [x,x] support horizontal dashes (-)
// - Rows 2,4: [x,x,x] support vertical bars (|)
// Segments only included when part of the character structure

const characterPatterns = {
  0: [
    [1, 1], // - -
    [1, 0, 1], // | |
    [0, 0], //
    [1, 0, 1], // | |
    [1, 1], // - -
  ],
  1: [
    [0, 0], //
    [0, 0, 1], //  |
    [0, 0], //
    [0, 0, 1], //  |
    [0, 0], //
  ],
  2: [
    [1, 1], // - -
    [0, 0, 1], //  |
    [1, 1], // - -
    [1, 0, 0], // |
    [1, 1], // - -
  ],
  3: [
    [1, 1], // - -
    [0, 0, 1], //  |
    [1, 1], // - -
    [0, 0, 1], //  |
    [1, 1], // - -
  ],
  4: [
    [0, 0], //
    [1, 0, 1], // | |
    [1, 1], // - -
    [0, 0, 1], //  |
    [0, 0], //
  ],
  5: [
    [1, 1], // - -
    [1, 0, 0], // |
    [1, 1], // - -
    [0, 0, 1], //  |
    [1, 1], // - -
  ],
  6: [
    [1, 1], // - -
    [1, 0, 0], // |
    [1, 1], // - -
    [1, 0, 1], // | |
    [1, 1], // - -
  ],
  7: [
    [1, 1], // - -
    [0, 0, 1], //  |
    [0, 0], //
    [0, 0, 1], //  |
    [0, 0], //
  ],
  8: [
    [1, 1], // - -
    [1, 0, 1], // | |
    [1, 1], // - -
    [1, 0, 1], // | |
    [1, 1], // - -
  ],
  9: [
    [1, 1], // - -
    [1, 0, 1], // | |
    [1, 1], // - -
    [0, 0, 1], //  |
    [1, 1], // - -
  ],
  ':': [
    [0, 0], //
    [0, 1, 0], // •
    [0, 0], //
    [0, 1, 0], // •
    [0, 0], //
  ],
  A: [
    [1, 1], // - -
    [1, 0, 1], // | |
    [1, 1], // - -
    [1, 0, 1], // | |
    [0, 0], //
  ],
  M: [
    [0, 0], //
    [0, 0, 0], // | |
    [1, 1], // - -
    [1, 0, 1], // | |
    [0, 0], //
  ],
  P: [
    [1, 1], // - -
    [1, 0, 1], // | |
    [1, 1], // - -
    [1, 0, 0], // |
    [0, 0], //
  ],
  ' ': [
    [0, 0], //
    [0, 0, 0], //
    [0, 0], //
    [0, 0, 0], //
    [0, 0], //
  ],
};

const CharacterDisplay = ({ char }) => {
  const pattern = characterPatterns[char] || characterPatterns[' '];

  return (
    <div className={styles['digital-char']}>
      {pattern.map((row, rowIndex) => (
        <div key={rowIndex} className={styles['digital-row']}>
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={cx(
                styles['digital-cell'],
                styles[cell ? 'digital-cell-on' : 'digital-cell-off']
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export const DigitalClock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Convert 0 to 12
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTime(
        `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`
      );
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.clockContainer}>
      <div className={styles.displayRow}>
        {time.split('').map((char, index) => (
          <CharacterDisplay key={index} char={char} />
        ))}
      </div>
    </div>
  );
};
