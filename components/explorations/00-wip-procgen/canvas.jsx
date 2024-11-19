import { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { resizeCanvas } from './resizeCanvas';
import { drawTiles } from './drawTiles';

import styles from './00.module.css';

const testTiles = [
  {
    type: 'forest',
  },
  {
    type: 'desert',
  },
  {
    type: 'water',
  },
];

export const Canvas = () => {
  const canvas = useRef();
  const [tiles, setTiles] = useState(testTiles);

  // Draw scribe arms as the angle progresses
  useEffect(() => {
    if (canvas.current) {
      const render = () => {
        // draw the canvas itself
        drawTiles(canvas.current, tiles);
      };

      // Render in response to effects/changes
      render();

      // Handle window resizing & re-render
      const resizeCleanup = resizeCanvas(canvas.current, render);

      return () => {
        resizeCleanup();
      };
    }
  }, [canvas, tiles]);

  return (
    <div className="monospace">
      {/* Top canvas draws the arms, resetting and redrawing every frame */}
      <canvas
        ref={canvas}
        className={cx(styles.canvas)}
        width="1000"
        height="1000"
      />
    </div>
  );
};
