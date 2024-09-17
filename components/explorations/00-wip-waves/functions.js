export const functions = {
  linear: (x) => x,
  sine: (x) => Math.sin(x * Math.PI * 0.5),
  // cosine: (x) => Math.cos(x * Math.PI) * 0.5 + 0.5,
  'inverted cosine': (x) => Math.cos(x * Math.PI) * -0.5 + 0.5,
};

export const lerp = (start, end, delta) => (1 - delta) * start + delta * end;

export const bezierLerpDetailed = (p1, p2, p3, p4, delta) => {
  const a = lerp(p1, p2, delta);
  const b = lerp(p2, p3, delta);
  const c = lerp(p3, p4, delta);

  const d = lerp(a, b, delta);
  const e = lerp(b, c, delta);

  const point = lerp(d, e, delta);

  return { a, b, c, d, e, point };
};

export const bezierLerp = (p1, p2, p3, p4, delta) => {
  const { point } = bezierLerpDetailed(p1, p2, p3, p4, delta);

  return point;
};
