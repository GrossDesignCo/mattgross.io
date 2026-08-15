import styles from './slide.module.css';

// Three-row flex frame: reserved space top and bottom (clearing Deck's
// fixed tagline and controls bars) around a flex-grow content row whose
// contents anchor to the bottom-left. Reuses the site's `.frame` scale
// for outer padding.
export const Slide = ({ children, className = '' }) => (
  <section className={`frame ${styles.slide} ${className}`}>
    <div className={styles.topSpace} aria-hidden />

    <div className={styles.content}>{children}</div>

    <div className={styles.controlsSpace} aria-hidden />
  </section>
);
