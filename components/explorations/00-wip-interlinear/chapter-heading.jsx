import styles from './00.module.css';

export const ChapterHeading = () => {
  return (
    <h1 dir="ltr">
      <span className={styles.title}>Genesis</span>{' '}
      <span className={styles.chapter}>03</span>
    </h1>
  );
};
