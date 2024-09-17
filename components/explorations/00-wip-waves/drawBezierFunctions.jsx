// import { functions } from './functions';
import { bezierLerp, bezierLerpDetailed } from './functions';

console.log({
  zero: bezierLerp(1, 0.25, 0.25, 1, 0),
  '25%': bezierLerp(1, 0.25, 0.25, 1, 0.25),
  half: bezierLerp(1, 0.25, 0.25, 1, 0.5),
  '75%': bezierLerp(1, 0.25, 0.25, 1, 0.75),
  done: bezierLerp(1, 0.25, 0.25, 1, 1),
});

const p1 = { x: 0, y: 0, color: 'lch(50 60 0)' };
const p2 = { x: 0, y: 0.75, color: 'lch(65 100 90)' };
const p3 = { x: 1, y: 0.25, color: 'lch(50 80 180)' };
const p4 = { x: 1, y: 1, color: 'lch(50 70 270)' };

export const drawBezierFunctions = (canvas, selectedFn) => {
  if (canvas) {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const colors = {
      line: isDark ? 'lch(100 0 0)' : 'lch(0 0 0)',
      secondaryLine: 'lch(50 0 0)',
      fillUnderLine: 'lch(50 0 0 / 10%)',
      axis: 'lch(50 0 0 / 20%)',
    };
    const ctx = canvas.getContext('2d');

    // Clear previous visuals
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const chartWidth = (canvas.width / 2) * 0.9;
    const chartHeight = (canvas.height / 2) * 0.9;

    // Define start point for visuals,
    // x=0 center screen,
    // y=0.5 center screen
    ctx.translate(canvasCenterX - chartWidth / 2, canvasCenterY);

    // Generate base and intermediate lines alongside the actual bezier curve
    const lines = { a: [], b: [], c: [], d: [], e: [], point: [] };

    for (let i = 0; i < chartWidth; i++) {
      // Get x on a scale of 0-1
      const delta = i / chartWidth;

      // Get y on a scale of 0-1
      const nextPoints = bezierLerpDetailed(p1.y, p2.y, p3.y, p4.y, delta);
      Object.entries(nextPoints).forEach(([key, value]) => {
        lines[key].push(value);
      });
    }

    console.log({ lines });

    const drawFn = (line) => {
      // Iterate along the x axis and represent the given function on the y
      for (let i = 0; i < chartWidth; i++) {
        // Get x on a scale of 0-1
        const x = i / chartWidth;

        // Get y on a scale of 0-1
        const y = line[i];

        // Scale function by the chart dimensions
        ctx.lineTo(x * chartWidth, y * chartHeight);
      }
    };

    // Draw axis
    ctx.strokeStyle = colors.axis;

    ctx.beginPath();
    ctx.moveTo(0, -1 * chartHeight - 20);
    ctx.lineTo(0, chartHeight + 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-1000, 0);
    ctx.lineTo(chartWidth + 1000, 0);

    ctx.stroke();

    // Draw a line following the function path
    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    drawFn(lines.point);

    ctx.stroke();

    // Draw intermediate lines
    ctx.strokeStyle = colors.secondaryLine;
    ctx.lineWidth = 0.5;

    ctx.beginPath();
    drawFn(lines.a);
    ctx.stroke();

    ctx.beginPath();
    drawFn(lines.b);
    ctx.stroke();

    ctx.beginPath();
    drawFn(lines.c);
    ctx.stroke();

    ctx.beginPath();
    drawFn(lines.d);
    ctx.stroke();

    ctx.beginPath();
    drawFn(lines.e);
    ctx.stroke();

    // Fill space under line
    ctx.fillStyle = colors.fillUnderLine;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    drawFn(lines.point);

    ctx.lineTo(chartWidth, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();

    ctx.fill();

    // Draw control points
    [p1, p2, p3, p4].forEach(({ x, y, color }, i) => {
      ctx.beginPath();
      ctx.arc(x * chartWidth, y * chartHeight, 3, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Since the canvas is actually flipped vertically to make the y coordinates increment upwards, flip briefly before rendering text
      ctx.scale(1, -1);
      ctx.fillText(`p${i + 1}`, x * chartWidth + 5, -y * chartHeight + 3);
      ctx.scale(1, -1);
    });

    // Draw base lerps (p1-p4 / a-c)
    // const drawBaseLerp = (a, b) => {
    //   for (let i = 0; i <= chartWidth; i++) {
    //     // Get x on a scale of 0-1
    //     const delta = i / chartWidth;
    //     const x = a.x + delta * (b.x - a.x);

    //     // Get y on a scale of 0-1
    //     const y = lerp(a.y, b.y, delta);

    //     // Scale function by the chart dimensions
    //     ctx.lineTo(x * chartWidth, y * chartHeight);
    //   }
    // };

    // [
    //   [p1, p2],
    //   [p2, p3],
    //   [p3, p4],
    // ].forEach(([a, b]) => {
    //   ctx.beginPath();
    //   ctx.moveTo(a.x * chartWidth, a.y * chartHeight);
    //   drawBaseLerp(a, b);
    //   const stroke = ctx.createLinearGradient(
    //     a.x * chartWidth,
    //     a.y * chartHeight,
    //     b.x * chartWidth,
    //     b.y * chartHeight
    //   );
    //   stroke.addColorStop(0.1, a.color);
    //   stroke.addColorStop(0.9, b.color);
    //   // const stroke = a.color;
    //   ctx.strokeStyle = stroke;
    //   ctx.lineWidth = 1;
    //   ctx.stroke();
    // });

    // Draw intermediate lerps (d-e)
  }
};
