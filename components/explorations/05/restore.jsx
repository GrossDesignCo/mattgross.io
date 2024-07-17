export const restore = (canvas) => {
  const ctx = canvas.getContext('2d');
  ctx.restore();
};
