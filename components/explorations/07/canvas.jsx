import { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { resizeCanvas } from './resizeCanvas';
import { drawPoints } from './drawPoints';
import { drawScribeArms } from './drawScribeArms';
import { Controls } from './controls';
import { ArmStats } from './armStats';
import styles from './07.module.css';
import { useStateWithRef } from '../../../hooks/useStateWithRef';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { usePrefersDarkMode } from '../../../hooks/usePrefersDarkMode';
import { generateRandomArms } from './generateRandomArms';

// Basic Test Arms
const defaultArms = generateRandomArms();

export const Canvas = () => {
  const scribeArmsCanvas = useRef();
  const patternCanvas = useRef();

  const prefersDarkMode = usePrefersDarkMode();

  const [paused, setPaused, pausedRef] = useStateWithRef(false);
  const [speed, setSpeed] = useState(1);
  const [showArms, setShowArms] = useState(true);
  // const [mode, setMode] = useState('');
  // const [arms, setArms] = useState(defaultArms);
  const armsRef = useRef(defaultArms);
  const mousePos = useRef(null);
  // Track which arm is active for rendering the editor
  const [hoveredArm, setHoveredArm] = useState(null);
  const [clickedArm, setClickedArm] = useState(null);

  // Base angle to progress tha animated arms
  const [angle, setAngle, angleRef] = useStateWithRef(0);

  // Only use refs for data that just needs to be tracked and interacted with on every render,
  // that way renders are only triggered by changes to the angle and specific events
  // One pattern per scribe arm
  const patterns = useRef([]);

  // Draw scribe arms as the angle progresses
  useEffect(() => {
    if (scribeArmsCanvas.current && patternCanvas.current) {
      // Render the arms, then use the arm's terminal points to create
      // the next points in the path of the pattern
      const render = () => {
        const { newPoints, focusedArm } = drawScribeArms({
          canvas: scribeArmsCanvas.current,
          angle: angle * Math.PI,
          armsRef,
          // mode,
          mousePos: mousePos.current,
          prefersDarkMode,
          clickedArm,
          hoveredArm,
        });

        armsRef.current.forEach((arm, i) => {
          if (Array.isArray(patterns.current[i])) {
            patterns.current[i].push(newPoints[i]);
          } else {
            patterns.current[i] = [newPoints[i]];
          }
        });

        // Draw points along the path traced by the arms
        drawPoints(patternCanvas.current, patterns.current, prefersDarkMode);

        return { focusedArm };
      };

      render();

      // Handle window resizing & re-render
      const resizeCleanup = resizeCanvas(
        [scribeArmsCanvas.current, patternCanvas.current],
        render
      );

      // Re-render whenenver the mouse moves for interactivity w/ arms
      const handleMouseMove = (e) => {
        // console.log('handleMouseMove');
        mousePos.current = [e.clientX, e.clientY];
        const { focusedArm } = render();
        setHoveredArm(focusedArm);
      };

      const handleClick = (e) => {
        // console.log('handleClick');
        mousePos.current = [e.clientX, e.clientY];
        // render('mousedown');
        const { focusedArm } = render();
        // console.log('mousedown', { focusedArm });
        setClickedArm(focusedArm);
      };

      scribeArmsCanvas.current.addEventListener('mousemove', handleMouseMove);
      scribeArmsCanvas.current.addEventListener('click', handleClick);

      return () => {
        resizeCleanup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scribeArmsCanvas.current?.removeEventListener(
          'mousemove',
          handleMouseMove
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
        scribeArmsCanvas.current?.removeEventListener('click', handleClick);
      };
    }
  }, [
    scribeArmsCanvas,
    patternCanvas,
    patterns,
    angle,
    armsRef,
    mousePos,
    setHoveredArm,
    clickedArm,
    hoveredArm,
    setClickedArm,
    prefersDarkMode,
  ]);

  // Clear hover/clicked state when un-pausing
  useEffect(() => {
    if (!paused) {
      if (hoveredArm) setHoveredArm(null);
      if (clickedArm) setClickedArm(null);
    }
  }, [paused, hoveredArm, clickedArm, setHoveredArm, setClickedArm]);

  // console.log('outer render', { clickedArm, hoveredArm });

  return (
    <div className="monospace">
      <Controls
        angle={angle}
        setAngle={setAngle}
        angleRef={angleRef}
        paused={paused}
        setPaused={setPaused}
        pausedRef={pausedRef}
        patterns={patterns}
        speed={speed}
        setSpeed={setSpeed}
        showArms={showArms}
        setShowArms={setShowArms}
      />

      {showArms && (
        <ArmStats
          clickedArm={clickedArm}
          // setMode={setMode}
          canvas={scribeArmsCanvas}
        />
      )}

      {/* Top canvas draws the arms, resetting and redrawing every frame */}
      <canvas
        ref={scribeArmsCanvas}
        className={cx(styles.canvas, styles.scribeArmsCanvas, {
          [styles.armHovered]: hoveredArm,
          [styles.armClicked]: clickedArm,
          [styles.hidden]: !showArms,
        })}
        width="1000"
        height="1000"
      />
      {/* Bottom canvas draws only the next set of points every frame, not clearing the space.
      That way we don't have to re-draw potentially thousands of points every frame,
      just the latest few */}
      <canvas
        ref={patternCanvas}
        className={cx(styles.canvas, styles.patternCanvas)}
        width="1000"
        height="1000"
      />
    </div>
  );
};
