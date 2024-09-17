import { functions } from './functions';

export const drawWaveFunctions = (canvas, selectedFn) => {
  if (canvas) {
    const fn = functions[selectedFn];
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const colors = {
      line: isDark ? 'lch(100 0 0)' : 'lch(0 0 0)',
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

    const drawFn = () => {
      // Iterate along the x axis and represent the given function on the y
      for (let i = 0; i <= chartWidth; i++) {
        // Get x on a scale of 0-1
        const x = i / chartWidth;

        // Get y on a scale of 0-1
        const y = fn(x);

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
    drawFn();

    ctx.stroke();

    // Fill space under line
    ctx.fillStyle = colors.fillUnderLine;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    drawFn();

    ctx.lineTo(chartWidth, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();

    ctx.fill();
  }
};
