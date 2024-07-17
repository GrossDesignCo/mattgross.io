export const resizeCanvas = (canvas, render) => {
  if (canvas) {
    const ctx = canvas.getContext('2d');

    // Maintain canvas size relative to window
    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;

      // Reset scale in case of moving window between screens of different dpi
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.font = `${16 * window.devicePixelRatio}px monospace`;

      if (render) render();
    };
    // Get initial window size & maintain
    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }
};
