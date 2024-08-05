import { isWithinRadius, radialToVector, vectorToRadial } from './utils';

export const drawScribeArms = ({
  canvas,
  angle,
  armsRef,
  mousePos,
  mouseDownPos,
  prefersDarkMode,
  clickedArm,
  hoveredArm,
}) => {
  if (canvas) {
    const arms = armsRef.current;
    const ctx = canvas.getContext('2d');

    // Clear previous visuals / Done by the canvas resize handler every render
    ctx.restore();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Basic data
    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const windowSize = Math.min(canvas.width, canvas.height);
    // 80% window size for diameter
    const maxSize = (windowSize / 2) * 0.8;

    // Styles
    const colors = {
      base: prefersDarkMode ? `lch(100 0 0)` : `lch(0 0 0)`,
      midtone: `lch(50 0 0)`,
      light: prefersDarkMode ? `lch(100 0 0 / 10%)` : `lch(0 0 0 / 10%)`,
    };
    const stylusTipRadius = 5 * window.devicePixelRatio;
    const bufferedRadius = stylusTipRadius + 10 * window.devicePixelRatio;

    // Arm = angle, speed, length, children
    const drawArm = (arm) => {
      const { startX = 0, startY = 0, startAngle, speed, length, child } = arm;
      const isClicked = clickedArm?.arm?.id === arm.id;
      const isHovered = hoveredArm?.arm?.id === arm.id;
      // console.log('drawArm (recurse)', {
      //   startX,
      //   startY,
      //   startAngle,
      //   speed,
      //   length,
      //   child,
      // });

      let scaledLength = maxSize * length;
      let rotatedAngle = startAngle + angle * speed;

      // Line coords (line should only extend to edge of circle)
      const [lX, lY] = radialToVector(
        rotatedAngle,
        scaledLength - stylusTipRadius
      );
      // Handle coords
      const [aX, aY] = radialToVector(rotatedAngle, scaledLength);
      const x = aX + startX;
      const y = aY + startY;

      // Arm
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(lX + startX, lY + startY);
      ctx.stroke();

      // Handle
      ctx.beginPath();
      ctx.arc(x, y, stylusTipRadius, 0, 2 * Math.PI);
      ctx.stroke();

      const drawArmHighlight = () => {
        ctx.beginPath();
        ctx.arc(x, y, bufferedRadius, 0, 2 * Math.PI);
        ctx.fillStyle = colors.light;
        ctx.fill();
        ctx.strokeStyle = colors.midtone;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(startX, startY, scaledLength, 0, 2 * Math.PI);
        ctx.stroke();

        // Extra arc around the origin to show bounding space
        ctx.beginPath();
        ctx.arc(0, 0, maxSize, 0, 2 * Math.PI);
        ctx.strokeStyle = colors.light;
        ctx.stroke();
        ctx.strokeStyle = colors.midtone;
      };

      const drawArmStats = () => {
        const width = 5 * window.devicePixelRatio;
        // Extra arc to visualize speed
        ctx.beginPath();
        ctx.arc(
          startX,
          startY,
          scaledLength + width / 2,
          speed > 0 ? (speed / 2) * -1 : 0,
          speed <= 0 ? (speed / 2) * -1 : 0
        );
        ctx.strokeStyle = colors.base;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.midtone;
      };

      // Hover effect / backing for edit menu
      if (mousePos) {
        const [mouseX, mouseY] = mousePos;
        const mouseIsIntersecting = isWithinRadius(
          mouseX * window.devicePixelRatio - canvasCenterX,
          mouseY * window.devicePixelRatio - canvasCenterY,
          x,
          y,
          bufferedRadius
        );

        if (mouseIsIntersecting) {
          // Break out hovered arm from the normal recursion so we can pass it back to
          // the outer interface without overcomplicating the positional math
          focusedArm = {
            arm,
            pos: [x, y],
          };
          // console.log('mouseIsIntersecting', { focusedArm });
        }

        // Have to be careful about re-drawing the highlight multiple times
        // if (mouseIsIntersecting) {
        //   drawArmHighlight();
        // }
      }

      // console.log('drawArm', arm.id, clickedArm?.arm?.id, hoveredArm?.arm?.id);
      if (isClicked || isHovered) {
        drawArmHighlight();
        // drawArmStats();
      }

      // Let's try to just adjust the length now
      // if (
      //   mode === 'set-length' &&
      //   mouseDownPos.current &&
      //   mouseMovePos.current
      // ) {
      //   const [rawMouseX, rawMouseY] = mouseMovePos.current;
      //   const mX = rawMouseX * window.devicePixelRatio - canvasCenterX;
      //   const mY = rawMouseY * window.devicePixelRatio - canvasCenterY;

      //   const [angle, rawNewLength] = vectorToRadial(mX - startX, mY - startY);
      //   const newLength = parseFloat((rawNewLength / maxSize).toFixed(2));

      //   console.log('Compute length change', {
      //     length,
      //     newLength: parseFloat((newLength / maxSize).toFixed(2)),
      //   });

      //   arm.length = newLength;

      //   // Line to Mouse
      //   ctx.beginPath();
      //   ctx.moveTo(startX, startY);
      //   ctx.lineTo(mX, mY);
      //   ctx.stroke();
      // }

      // console.log({ mouseDownPos });
      // if (mouseDownPos.current) {
      //   const [mouseX, mouseY] = mouseDownPos.current;
      //   const mouseIsIntersecting = isWithinRadius(
      //     mouseX * window.devicePixelRatio - canvasCenterX,
      //     mouseY * window.devicePixelRatio - canvasCenterY,
      //     x,
      //     y,
      //     bufferedRadius
      //   );

      //   if (mouseIsIntersecting && triggeredBy === 'mousedown') {
      //     clickedArm = {
      //       arm,
      //       pos: [x, y],
      //     };
      //     arm.clicked = true;
      //   }

      //   // Line to Mouse
      //   // ctx.beginPath();
      //   // ctx.moveTo(startX, startY);
      //   // ctx.lineTo(mX, mY);
      //   // ctx.stroke();
      // }

      // Recursively draw child arms
      if (child) {
        child.startX = x;
        child.startY = y;

        const [childX, childY] = drawArm(child);

        // console.log('end of child drawArm, before child return', {
        //   x,
        //   childX,
        //   y,
        //   childY,
        // });
        return [aX + childX, aY + childY];
      }

      // console.log('end of drawArm, before return', { x, y });
      return [aX, aY];
    };

    // Establish baseline / center
    ctx.resetTransform();
    ctx.translate(canvasCenterX, canvasCenterY);

    ctx.beginPath();
    ctx.arc(0, 0, stylusTipRadius - 1, 0, 2 * Math.PI);
    ctx.fillStyle = colors.base;
    ctx.fill();

    // Save list of points from each arm
    const newPoints = [];
    // State
    let focusedArm = null;
    // let clickedArm = null;

    // Draw each arm
    arms.forEach((arm) => {
      // Define start point for visuals,
      // x=0 center screen,
      // y=0 center screen
      ctx.resetTransform();
      ctx.translate(canvasCenterX, canvasCenterY);

      // console.log('arms.forEach', { arm });
      // Set stroke style at the beginning of each arm, so it can be recursively changed for children
      ctx.strokeStyle = colors.base;
      const [x, y] = drawArm(arm);
      // console.log('after DrawArm', { x, y });
      newPoints.push([x, y]);
    });

    // console.log('drawScribeArms (final)', { triggeredBy, focusedArm });
    return { newPoints, focusedArm };
  }
};
