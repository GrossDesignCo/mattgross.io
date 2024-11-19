const tileStyles = {
  forest: {
    color: 'green',
  },
  desert: {
    color: 'tan',
  },
  water: {
    color: 'blue',
  },
};

export const drawTiles = (canvas, tiles) => {
  if (canvas) {
    const ctx = canvas.getContext('2d');

    // Clear previous visuals
    ctx.restore();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    tiles.forEach((tile, i) => {
      ctx.beginPath();
      // Arc at the tile position
      ctx.arc(10 + i * 20, 10, 10, 0, 2 * Math.PI);

      ctx.fillStyle = tileStyles?.[tile.type]?.color || 'grey';
      ctx.fill();
      ctx.stroke();
    });
  }
};
