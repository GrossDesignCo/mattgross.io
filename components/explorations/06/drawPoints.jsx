const goldAngle = 3 - Math.sqrt(5);
const lerp = (start, end, delta) => (1 - delta) * start + delta * end;

export const drawPoints = (canvas, petalCount) => {
  if (canvas) {
    const ctx = canvas.getContext('2d');

    // Clear previous visuals
    ctx.restore();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    const canvasCenterX = canvas.width / (2 * window.devicePixelRatio);
    const canvasCenterY = canvas.height / (2 * window.devicePixelRatio);

    const windowSize = Math.min(window.innerHeight, window.innerWidth);
    // 80% window size for diameter
    const radius = (windowSize / 2) * 0.6;

    // Define start point for visuals,
    // x=0 center screen,
    // y=0 center screen
    ctx.translate(canvasCenterX, canvasCenterY);

    const drawFn = () => {
      // Distribute items around the circle
      for (let i = petalCount; i >= 0; i--) {
        const progress = i / petalCount;
        // Get x on a scale of 0-1
        const rad = lerp(0, radius, progress);
        const hue = lerp(440, 290, progress);
        const chroma = lerp(100, 70, progress);
        const lightness = lerp(100, 50, progress);

        const fill = `lch(${lightness} ${chroma} ${hue})`;
        // const stroke = `lch(${lightness - 30} ${chroma} ${hue + 15})`;
        const stroke = `lch(${(lightness - 50) / 2} ${chroma / 2} ${hue + 15})`;

        // Scale function by the chart dimensions
        ctx.beginPath();
        ctx.rotate(Math.PI * goldAngle);
        // ctx.lineTo(rad, 0);
        // ctx.lineTo(rad + rad / 4, 0);
        // ctx.arc(rad, 0, 9, 0, 2 * Math.PI);
        ctx.moveTo(rad / 1.5, 0);
        ctx.bezierCurveTo(rad, 5 + rad / 10, rad, rad / 5, rad * 1.33, 0);
        ctx.moveTo(rad / 1.5, 0);
        ctx.bezierCurveTo(
          rad,
          -5 - rad / 10,
          rad,
          (-1 * rad) / 5,
          rad * 1.33,
          0
        );
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = stroke;
        ctx.lineWidth = progress * 3 + 2;
        ctx.stroke();

        const shadow = `lch(40 100 ${hue} / ${lerp(40, 0, progress)}%)`;
        ctx.moveTo(rad / 1.5, 0);
        ctx.bezierCurveTo(rad, 5 + rad / 10, rad, rad / 4, rad * 1.5, 0);
        ctx.moveTo(rad / 1.5, 0);
        ctx.bezierCurveTo(
          rad,
          -5 - rad / 10,
          rad,
          (-1 * rad) / 4,
          rad * 1.5,
          0
        );
        ctx.fillStyle = shadow;
        ctx.fill();
      }
    };

    // // Draw axis
    // ctx.strokeStyle = colors.axis;

    // ctx.beginPath();
    // ctx.lineTo(0, radius * -1);
    // ctx.lineTo(0, radius);
    // ctx.stroke();

    // ctx.beginPath();
    // ctx.lineTo(radius * -1, 0);
    // ctx.lineTo(radius, 0);

    // ctx.stroke();

    // // Draw border
    // ctx.beginPath();
    // ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    // ctx.strokeStyle = colors.axis;
    // ctx.stroke();

    // // Draw a line following the function path
    drawFn();
  }
};
