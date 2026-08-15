import styles from './todo.module.css';

// Visible placeholder for [TODO — Matt] content — deliberately shown, not
// hidden, so the whole deck flow and pacing can be reviewed before every
// gap is filled in.
export const Todo = ({ children }) => (
  <div className={`monospace ${styles.todo}`}>
    <span className={styles.label}>TODO</span>
    <span className={styles.body}>{children}</span>
  </div>
);
