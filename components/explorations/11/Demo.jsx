import styles from './Demo.module.css';
import { ResizeableFrame } from '../gallery/resizeable-frame';
import { FitHeading } from './fit-heading';

export const Demo = () => {
  return (
    <div className={styles.root}>
      <ResizeableFrame>
        <FitHeading
          containerClassName={styles.container}
          className={styles.heading}
        />
      </ResizeableFrame>
    </div>
  );
};
