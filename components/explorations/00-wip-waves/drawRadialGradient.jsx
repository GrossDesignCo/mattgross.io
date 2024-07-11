import { functions } from './functions';

export const drawRadialGradient = (canvas, selectedFn) => {
  if (canvas) {
    const fn = functions[selectedFn];
    const ctx = canvas.getContext('2d');

    // Clear previous visuals
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    const canvasCenterX = canvas.width / (2 * window.devicePixelRatio);
    const canvasCenterY = canvas.height / (2 * window.devicePixelRatio);

    const chartWidth = window.innerWidth / 2;
    const chartHeight = window.innerHeight / 4;

    // Define start point for visuals,
    // x=0 center screen,
    // y=0.5 center screen
    ctx.translate(canvasCenterX - chartWidth / 2, canvasCenterY);

    // const drawFn = () => {
    //   // Iterate along the x axis and represent the given function on the y
    //   for (let i = 0; i <= chartWidth; i++) {
    //     // Get x on a scale of 0-1
    //     const x = i / chartWidth;

    //     // Get y on a scale of 0-1
    //     const y = fn(x);

    //     ctx.strokeStyle = `lch(${y * 100} 0 0)`;
    //     ctx.beginPath();

    //     // Scale function by the chart dimensions
    //     ctx.moveTo(x * chartWidth, 0);
    //     ctx.lineTo(x * chartWidth, chartHeight);
    //     ctx.moveTo(x * chartWidth, 0);
    //     ctx.stroke();
    //   }
    // };

    // // Draw a line following the function path
    // drawFn();

    // Create a radial gradient
    // The inner circle is at x=110, y=90, with radius=30
    // The outer circle is at x=100, y=100, with radius=70
    const gradient = ctx.createRadialGradient(
      chartWidth / 2,
      chartHeight / 2,
      25,
      chartWidth,
      chartHeight,
      275
    );

    // Add three color stops
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'transparent');

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, chartWidth, chartHeight);
  }
};
