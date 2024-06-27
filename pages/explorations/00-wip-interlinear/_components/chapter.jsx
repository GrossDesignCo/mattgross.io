import { useContext } from 'react';
import styles from '../index.module.css';
import { Word } from './word';
import { SettingsContext } from './control-context';

export const Chapter = ({ chapter, verses }) => {
  const { selectedLanguages } = useContext(SettingsContext);
  const paddedChapter = chapter.toString().padStart(2, '0');

  return (
    <article className={styles.chapter}>
      <h2 className={styles.chapterHeading}>{paddedChapter}</h2>

      <div className={styles.verses}>
        {verses.map(({ type, words }, i) => {
          const isCaption = type === 'caption';
          const Tag = isCaption ? 'div' : `${type}`;

          return (
            <Tag
              key={`block-${i}`}
              className={`${styles.block} ${isCaption ? styles.caption : ''}`}
            >
              {/* Map over each word in the block */}
              {words.map((word, j) => {
                return (
                  <Word
                    key={`block-${i}-word-${j}`}
                    word={word}
                    selectedLanguages={selectedLanguages}
                  />
                );
              })}
            </Tag>
          );
        })}
      </div>
    </article>
  );
};
