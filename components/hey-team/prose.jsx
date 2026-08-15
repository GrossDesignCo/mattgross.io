import styles from './prose.module.css';

// Plain paragraph body copy — NOT FitText-driven. SlideBody's viewport-fluid
// sizing is tuned for short single-line taglines/subheads; multi-sentence
// content reads better at a comfortable, only-mildly-responsive size.
export const Prose = ({ children, className = '' }) => (
  <div className={`${styles.prose} ${className}`}>{children}</div>
);
