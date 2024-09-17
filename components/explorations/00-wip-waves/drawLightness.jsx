import { functions } from './functions';

export const drawLightness = (canvas, selectedFn) => {
  if (canvas) {
    const fn = functions[selectedFn];
    const ctx = canvas.getContext('2d');

    // Clear previous visuals
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    const chartWidth = canvas.width / 2;
    const chartHeight = canvas.height / 2;

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

        ctx.strokeStyle = `lch(${y * 100} 0 0)`;

        ctx.beginPath();

        // Scale function by the chart dimensions
        ctx.moveTo(x * chartWidth, 0);
        ctx.lineTo(x * chartWidth, chartHeight);
        ctx.moveTo(x * chartWidth, 0);
        ctx.stroke();
      }
    };

    // Draw a line following the function path
    drawFn();
  }
};
