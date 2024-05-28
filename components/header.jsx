import styles from './header.module.css';

export const Header = ({ tagline }) => {
  return (
    <header className={styles.header}>
      <h1>Matt Gross</h1>

      <div className={styles.tagline}>{tagline}</div>
    </header>
  );
};
