import styles from './nav-category.module.css';

export const NavCategory = ({ children }) => {
  return <span className={styles['nav-category']}>{children}</span>;
};
