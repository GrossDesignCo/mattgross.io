export const resizeCanvas = (canvases, render) => {
  if (canvases) {
    // Maintain canvas size relative to window
    const resize = () => {
      canvases.forEach((canvas) => {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;

        // Reset scale in case of moving window between screens of different dpi
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        if (render) render();
      });
    };
    // Get initial window size & maintain
    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }
};
