import styles from './config-block.module.css';

// The principles slide, styled like a config file: key (accent) + value
// (muted), no elaboration. Rows are [key, value] pairs.
export const ConfigBlock = ({ rows }) => (
  <div className={`monospace ${styles.config}`}>
    {rows.map(([key, value]) => (
      <div key={key} className={styles.row}>
        <span className={styles.key}>{key}</span>
        <span className={styles.value}>{value}</span>
      </div>
    ))}
  </div>
);
