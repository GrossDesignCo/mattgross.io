import styles from '../index.module.css';
import { Chapter } from './chapter';

export const Book = ({ book, chapters }) => {
  return (
    <div className={styles.book}>
      <h1 className={styles.title}>{book}</h1>

      <div className={styles.chapters}>
        {chapters.map(({ chapter, verses }) => {
          return <Chapter chapter={chapter} verses={verses} />;
        })}
      </div>
    </div>
  );
};
