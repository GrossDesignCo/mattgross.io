import { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './gallery.module.css';

export const ResizeableFrame = ({ children, className, ...rest }) => {
  /**
   * Normally this could be done with a css prop `resize: both`, however that only works
   * when overflow: hidden is set to true, which would interfere with the position of the control buttons
   * TBD???
   */
  const [size, setSize] = useState({ height: 0, width: 0 });

  useEffect(() => {
    // Default height/width for the container
    const height = window.innerHeight / 2;
    const width = window.innerWidth / 2;

    setSize({ height, width });
  }, []);

  return (
    <div
      className={cx(styles.resizeableFrame, className)}
      style={{ height: `${size.height}px`, width: `${size.width}px` }}
      {...rest}
    >
      {children}
    </div>
  );
};
