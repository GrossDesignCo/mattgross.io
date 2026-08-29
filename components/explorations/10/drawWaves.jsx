import { MAX_HARMONICS } from './control-context';
import { harmonicWeight, peakHarmonicSum, WEIGHT_EPSILON } from './harmonics';

const STEPS = 480;
const CYCLES = 2;
const EDGE_INSET = 0.985;

const harmonicAt = (t, n, phase) => Math.sin(n * t + phase) / n;

const weightedHarmonicAt = (t, n, phase, displayCount) =>
  harmonicWeight(n, displayCount) * harmonicAt(t, n, phase);

const HARMONIC_LINE_WIDTH_MAX = 3;
const HARMONIC_LINE_WIDTH_MIN = 0.65;
const HARMONIC_LINE_WIDTH_DECAY = 0.48;
const SUM_LINE_WIDTH = 3;

// Yellow → orange → red → violet → blue (no green on the wheel)
const HARMONIC_GRADIENT = {
  dark: [
    { l: 70, c: 132, h: 80 }, // --caution-yellow
    { l: 67, c: 128, h: 55 },
    { l: 58, c: 120, h: 28 },
    { l: 55, c: 95, h: 310 },
    { l: 52, c: 75, h: 265 },
  ],
  light: [
    { l: 52, c: 95, h: 80 },
    { l: 50, c: 92, h: 55 },
    { l: 45, c: 88, h: 28 },
    { l: 43, c: 72, h: 310 },
    { l: 40, c: 62, h: 265 },
  ],
};

const lerp = (a, b, t) => a + (b - a) * t;

const sampleGradient = (stops, t) => {
  const segments = stops.length - 1;
  const scaled = Math.min(Math.max(t, 0), 1) * segments;
  const index = Math.min(Math.floor(scaled), segments - 1);
  const localT = scaled - index;
  const from = stops[index];
  const to = stops[index + 1];

  return {
    l: lerp(from.l, to.l, localT),
    c: lerp(from.c, to.c, localT),
    h: lerp(from.h, to.h, localT),
  };
};

const harmonicProgress = (n) =>
  MAX_HARMONICS <= 1 ? 0 : (n - 1) / (MAX_HARMONICS - 1);

const harmonicLineWidth = (n) => {
  const width =
    HARMONIC_LINE_WIDTH_MIN +
    (HARMONIC_LINE_WIDTH_MAX - HARMONIC_LINE_WIDTH_MIN) *
      Math.exp(-HARMONIC_LINE_WIDTH_DECAY * (n - 1));

  return Math.round(width * 100) / 100;
};

const harmonicStroke = (n, isDark, weight = 1, opacityScale = 1) => {
  const { l, c, h } = sampleGradient(
    isDark ? HARMONIC_GRADIENT.dark : HARMONIC_GRADIENT.light,
    harmonicProgress(n)
  );
  const alpha = Math.round(
    Math.min(1, Math.max(0, weight)) * opacityScale * 100
  );

  return `lch(${l} ${c} ${h} / ${alpha}%)`;
};


const sumStrokeColor = (isDark, opacity = 1) => {
  const alpha = Math.round(Math.min(1, Math.max(0, opacity)) * 100);
  return isDark
    ? `lch(92 18 95 / ${alpha}%)`
    : `lch(18 12 280 / ${alpha}%)`;
};

const sumAt = (t, displayCount, phase) => {
  let total = 0;
  for (let n = 1; n <= MAX_HARMONICS; n++) {
    const weight = harmonicWeight(n, displayCount);
    if (weight < WEIGHT_EPSILON) continue;
    total += weight * harmonicAt(t, n, phase);
  }
  return total;
};

const polar = (cx, cy, radius, angle) => ({
  x: cx + radius * Math.cos(angle),
  y: cy + radius * Math.sin(angle),
});

const drawRadialCurve = (
  ctx,
  { cx, cy, baseRadius, amplitude, valueAt, steps = STEPS, close = true }
) => {
  ctx.beginPath();

  for (let i = 0; i <= steps; i++) {
    const theta = (i / steps) * Math.PI * 2;
    const radius = baseRadius + amplitude * valueAt(theta);
    const { x, y } = polar(cx, cy, radius, theta);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  if (close) ctx.closePath();
};

const drawLinearWaves = (ctx, { width, height, phase, displayCount, isDark }) => {
  const peak = peakHarmonicSum(MAX_HARMONICS);
  const centerY = height * 0.5;
  const amplitude = (height * 0.5 * EDGE_INSET) / peak;

  const sampleX = (progress) => progress * width;
  const sampleT = (progress) => progress * Math.PI * 2 * CYCLES;
  const normalize = (value) => centerY - value * amplitude;

  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.strokeStyle = isDark ? 'lch(100 0 0 / 12%)' : 'lch(0 0 0 / 10%)';
  ctx.lineWidth = 1;
  ctx.stroke();

  for (let n = 1; n <= MAX_HARMONICS; n++) {
    const weight = harmonicWeight(n, displayCount);
    if (weight < WEIGHT_EPSILON) continue;

    ctx.beginPath();
    for (let i = 0; i <= STEPS; i++) {
      const progress = i / STEPS;
      const x = sampleX(progress);
      const y = normalize(weightedHarmonicAt(sampleT(progress), n, phase, displayCount));

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    const stroke = harmonicStroke(n, isDark, weight);
    const lineWidth = harmonicLineWidth(n);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  ctx.beginPath();
  for (let i = 0; i <= STEPS; i++) {
    const progress = i / STEPS;
    const x = sampleX(progress);
    const y = normalize(sumAt(sampleT(progress), displayCount, phase));

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = sumStrokeColor(isDark);
  ctx.lineWidth = SUM_LINE_WIDTH;
  ctx.stroke();
};

const drawRadialWaves = (ctx, { width, height, phase, displayCount, isDark }) => {
  const cx = width * 0.5;
  const cy = height * 0.5;
  const peak = peakHarmonicSum(MAX_HARMONICS);
  const maxRadius = Math.min(width, height) * 0.5 * EDGE_INSET;
  const baseRadius = maxRadius * 0.5;
  const amplitude = (maxRadius * 0.5) / peak;

  ctx.beginPath();
  ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
  ctx.strokeStyle = isDark ? 'lch(100 0 0 / 12%)' : 'lch(0 0 0 / 10%)';
  ctx.lineWidth = 1;
  ctx.stroke();

  for (let n = 1; n <= MAX_HARMONICS; n++) {
    const weight = harmonicWeight(n, displayCount);
    if (weight < WEIGHT_EPSILON) continue;

    drawRadialCurve(ctx, {
      cx,
      cy,
      baseRadius,
      amplitude,
      valueAt: (theta) => weightedHarmonicAt(theta, n, phase, displayCount),
    });
    const stroke = harmonicStroke(n, isDark, weight);
    const lineWidth = harmonicLineWidth(n);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  drawRadialCurve(ctx, {
    cx,
    cy,
    baseRadius,
    amplitude,
    valueAt: (theta) => sumAt(theta, displayCount, phase),
  });
  ctx.strokeStyle = sumStrokeColor(isDark);
  ctx.lineWidth = SUM_LINE_WIDTH;
  ctx.stroke();
};

export const drawWaves = (
  canvas,
  { phase = 0, displayCount = MAX_HARMONICS, layout = 'radial' } = {}
) => {
  if (!canvas) return;

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const ctx = canvas.getContext('2d');
  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;

  ctx.clearRect(0, 0, width, height);

  const props = { width, height, phase, displayCount, isDark };

  if (layout === 'linear') {
    drawLinearWaves(ctx, props);
  } else {
    drawRadialWaves(ctx, props);
  }
};
