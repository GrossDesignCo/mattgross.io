// cubic-bezier(1, 0, 0.1, 0.9) — matches --bezier in styles/vars.css
const [p1x, p1y, p2x, p2y] = [1, 0, 0.1, 0.9];

const bezierCoord = (t, a, b) => {
  const mt = 1 - t;
  return 3 * mt * mt * t * a + 3 * mt * t * t * b + t * t * t;
};

const sampleCurveX = (t) => bezierCoord(t, p1x, p2x);
const sampleCurveY = (t) => bezierCoord(t, p1y, p2y);
const sampleCurveDerivativeX = (t) => {
  const mt = 1 - t;
  return 3 * mt * mt * p1x + 6 * mt * t * (p2x - p1x) + 3 * t * t * (1 - p2x);
};

export const easeBezier = (progress) => {
  if (progress <= 0) return 0;
  if (progress >= 1) return 1;

  let t = progress;

  for (let i = 0; i < 8; i++) {
    const x = sampleCurveX(t) - progress;
    if (Math.abs(x) < 1e-6) break;
    const dx = sampleCurveDerivativeX(t);
    if (Math.abs(dx) < 1e-6) break;
    t -= x / dx;
  }

  return sampleCurveY(t);
};
