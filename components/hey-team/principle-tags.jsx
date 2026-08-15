import styles from './principle-tags.module.css';

// The callback only works if it's never re-defined here — see CLAUDE.md
// / the six-principles doc. Plain, small, uncommented on purpose.
export const PrincipleTags = ({ tags }) => (
  <p className={`monospace ${styles.tags}`}>{`// ${tags.join(' · ')}`}</p>
);
