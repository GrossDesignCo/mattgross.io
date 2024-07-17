export const drawPoints = (canvas, proportion) => {
  if (canvas && proportion !== undefined) {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const colors = {
      line: isDark ? 'lch(100 0 0)' : 'lch(0 0 0)',
      fillUnderLine: 'lch(50 0 0 / 10%)',
      axis: 'lch(50 0 0 / 20%)',
    };
    const ctx = canvas.getContext('2d');

    // Clear previous visuals
    ctx.restore();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    const canvasCenterX = canvas.width / (2 * window.devicePixelRatio);
    const canvasCenterY = canvas.height / (2 * window.devicePixelRatio);

    const windowSize = Math.min(window.innerHeight, window.innerWidth);
    // 80% window size for diameter
    const radius = (windowSize / 2) * 0.8;

    // Define start point for visuals,
    // x=0 center screen,
    // y=0 center screen
    ctx.translate(canvasCenterX, canvasCenterY);

    const drawFn = () => {
      // Distribute items around the circle
      for (let i = 0; i <= 360; i++) {
        const progress = i / 360;
        // Get x on a scale of 0-1
        const rad = progress * radius;

        const color = isDark ? `lch(80 100 ${i})` : `lch(65 100 ${i})`;

        // Scale function by the chart dimensions
        // ctx.beginPath();
        // ctx.arc(0, 0, rad, 0, Math.PI * proportion);
        // ctx.lineWidth = 0.25;
        // ctx.strokeStyle = color;
        // ctx.stroke();

        ctx.beginPath();
        ctx.rotate(Math.PI * proportion);
        ctx.arc(rad, 0, 1 + progress * 4, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }
    };

    // Draw axis
    ctx.strokeStyle = colors.axis;

    ctx.beginPath();
    ctx.lineTo(0, radius * -1);
    ctx.lineTo(0, radius);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(radius * -1, 0);
    ctx.lineTo(radius, 0);

    ctx.stroke();

    // Draw border
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = colors.axis;
    ctx.stroke();

    // // Draw a line following the function path
    // ctx.strokeStyle = colors.line;
    // ctx.lineWidth = 2;
    // ctx.lineCap = 'round';
    drawFn();

    // ctx.stroke();

    // // Fill space under line
    // ctx.fillStyle = colors.fillUnderLine;

    // ctx.beginPath();
    // ctx.moveTo(0, 0);
    // drawFn();

    // ctx.lineTo(chartWidth, 0);
    // ctx.lineTo(0, 0);
    // ctx.closePath();

    // ctx.fill();
  }
};
