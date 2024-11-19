export const resizeCanvas = (canvas, render) => {
  if (canvas) {
    // Maintain canvas size relative to window
    const resize = () => {
      const ctx = canvas.getContext('2d');
      // Assumes canvas takes up the full viewport
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;

      // Reset scale in case of moving window between screens of different dpi
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

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
