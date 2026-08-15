import styles from './stat-line.module.css';

export const StatLine = ({ items }) => (
  <p className={`monospace ${styles.statLine}`}>{items.join('   ·   ')}</p>
);
