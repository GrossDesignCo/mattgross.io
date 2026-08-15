import { FitText } from './fit-text';
import styles from './typography.module.css';

// Uses FitText's own defaults: 12px floor, 15vh ceiling, 15vw scaling
// down to 10vw as intrinsic width goes from 50% to 75% of the viewport.
export const SlideTitle = ({ children, className = '' }) => (
  <FitText as="h1" className={`${styles.title} ${className}`}>
    {children}
  </FitText>
);

// Same ruleset as SlideTitle (12px floor, 50-75% width range), just a
// smaller width-scale target: 5vw down to 2.5vw.
export const SlideBody = ({ children, className = '' }) => (
  <FitText
    as="p"
    className={`${styles.body} ${className}`}
    widthScaleMaxVw={4}
    widthScaleMinVw={2.5}
  >
    {children}
  </FitText>
);
