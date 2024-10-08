export const resizeCanvas = (canvas, render) => {
  if (canvas) {
    const ctx = canvas.getContext('2d');

    // Maintain canvas size relative to window
    const resize = () => {
      const style = getComputedStyle(canvas);
      const width = style.getPropertyValue('width')?.replace('px', '');
      const height = style.getPropertyValue('height')?.replace('px', '');

      canvas.width = parseInt(width) * window.devicePixelRatio;
      canvas.height = parseInt(height) * window.devicePixelRatio;

      // console.log({ style, width: style.getPropertyValue('width') });

      // Reset scale in case of moving window between screens of different dpi
      // ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
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
