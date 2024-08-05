export const drawPoints = (canvas, patterns, prefersDarkMode) => {
  if (canvas && Array.isArray(patterns)) {
    const ctx = canvas.getContext('2d');

    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    ctx.restore();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    const color = prefersDarkMode ? `lch(100 0 0 / 66%)` : `lch(0 0 0 / 33%)`;

    ctx.resetTransform();
    ctx.translate(canvasCenterX, canvasCenterY);

    patterns.forEach((pattern) => {
      ctx.beginPath();
      pattern.forEach((point, i) => {
        if (i === 0) return;

        const [x, y] = point;

        ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.stroke();
    });
  }
};
