import { MAX_HARMONICS } from './control-context';

export const HARMONIC_TRANSITION_MS = 1000;
export const WEIGHT_EPSILON = 0.001;

export const harmonicWeight = (n, displayCount) =>
  Math.min(1, Math.max(0, displayCount - n + 1));

export const peakHarmonicSum = (displayCount = MAX_HARMONICS) => {
  let total = 0;
  for (let n = 1; n <= MAX_HARMONICS; n++) {
    total += harmonicWeight(n, displayCount) / n;
  }
  return total;
};
