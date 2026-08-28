export const resizeCanvas = (canvas, render) => {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    render?.();
  };

  resize();
  window.addEventListener('resize', resize);

  return () => {
    window.removeEventListener('resize', resize);
  };
};
