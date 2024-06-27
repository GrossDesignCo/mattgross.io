export const GRID_SIZE = 20;
export const MAX_HEIGHT = 5;

// Base numerical grid for the cityscape
export const grid = Array.from({ length: GRID_SIZE }, () =>
  Array.from({ length: GRID_SIZE }, () => Math.random())
);
