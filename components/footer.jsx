import styles from './footer.module.css';
import { DoubleSlash } from './double-slash';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className={`frame sideways ${styles['footer-frame']}`}>
      <footer className={styles.footer}>
        <div className={`caption ${styles.copyright}`}>
          © Matt Gross <DoubleSlash /> {year}
        </div>
      </footer>
    </div>
  );
};
