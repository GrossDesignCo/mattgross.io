import { useMediaQuery } from './useMediaQuery';

export const usePrefersReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion)');
};
