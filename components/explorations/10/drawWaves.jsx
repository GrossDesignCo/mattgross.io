const HARMONIC_COUNT = 7;
const CYCLES = 2;

export const drawWaves = (canvas, { phase = 0, harmonicCount = HARMONIC_COUNT } = {}) => {
  if (!canvas) return;

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const ctx = canvas.getContext('2d');
  const width = canvas.width / window.devicePixelRatio;
  const height = canvas.height / window.devicePixelRatio;
  const centerY = height * 0.5;
  const amplitude = height * 0.22;
  const paddingX = width * 0.08;
  const plotWidth = width - paddingX * 2;

  ctx.clearRect(0, 0, width, height);

  const sampleX = (progress) => paddingX + progress * plotWidth;
  const sampleT = (progress) => progress * Math.PI * 2 * CYCLES;

  const harmonicAt = (t, n) => Math.sin(n * t + phase) / n;

  const sumAt = (t) => {
    let total = 0;
    for (let n = 1; n <= harmonicCount; n++) {
      total += harmonicAt(t, n);
    }
    return total;
  };

  const normalize = (value) => centerY - value * amplitude;

  // Baseline
  ctx.beginPath();
  ctx.moveTo(paddingX, centerY);
  ctx.lineTo(width - paddingX, centerY);
  ctx.strokeStyle = isDark ? 'lch(100 0 0 / 12%)' : 'lch(0 0 0 / 10%)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Individual harmonics
  for (let n = 1; n <= harmonicCount; n++) {
    ctx.beginPath();
    for (let i = 0; i <= plotWidth; i++) {
      const progress = i / plotWidth;
      const x = sampleX(progress);
      const y = normalize(harmonicAt(sampleT(progress), n));

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    const hue = isDark ? 250 + n * 18 : 240 + n * 16;
    ctx.strokeStyle = isDark ? `lch(72 55 ${hue} / 35%)` : `lch(48 45 ${hue} / 40%)`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Composite sum
  ctx.beginPath();
  for (let i = 0; i <= plotWidth; i++) {
    const progress = i / plotWidth;
    const x = sampleX(progress);
    const y = normalize(sumAt(sampleT(progress)));

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = isDark ? 'lch(92 18 95)' : 'lch(18 12 280)';
  ctx.lineWidth = 2;
  ctx.stroke();
};
