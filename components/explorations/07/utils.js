// Utils
export const lerp = (start, end, delta) => (1 - delta) * start + delta * end;

export const getDistance = (x1, y1, x2, y2) => {
  return Math.hypot(x1 - x2, y1 - y2);
};

export const isWithinRadius = (x1, y1, x2, y2, radius) => {
  return getDistance(x1, y1, x2, y2) <= radius;
};

export const radialToVector = (radians, length) => {
  const x = length * Math.cos(radians);
  const y = length * Math.sin(radians);

  return [x, y];
};

export const vectorToRadial = (x, y) => {
  const length = Math.sqrt(x * x + y * y);

  const radians = Math.atan2(y, x);

  return [radians, length];
};
