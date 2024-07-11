export const functions = {
  linear: (x) => x,
  sine: (x) => Math.sin(x * Math.PI * 2),
  cosine: (x) => Math.cos(x * Math.PI * 2),
  'inverted cosine': (x) => Math.cos(x * Math.PI * 2) * -1,
};
