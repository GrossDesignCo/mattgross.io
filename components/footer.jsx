import styles from './footer.module.css';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className={`frame ${styles['footer-frame']}`}>
      <footer className={styles.footer}>
        <div className={styles.copyright}>© Matt Gross / {year}</div>
      </footer>
    </div>
  );
};
