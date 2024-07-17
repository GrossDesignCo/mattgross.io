import { useMediaQuery } from './useMediaQuery';

export const useDarkMode = () => {
  return useMediaQuery('(prefers-color-scheme: dark)');
};
