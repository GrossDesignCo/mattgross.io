import { useContext, useEffect } from 'react';
import {
  INTRO_END_COUNT,
  INTRO_START_COUNT,
  INTRO_STEP_MS,
  SettingsContext,
} from './control-context';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';

export const useHarmonicIntro = () => {
  const { setHarmonicCount, userHasControlled } = useContext(SettingsContext);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (userHasControlled) return;

    if (prefersReducedMotion) {
      setHarmonicCount(INTRO_END_COUNT);
      return;
    }

    setHarmonicCount(INTRO_START_COUNT);

    let count = INTRO_START_COUNT;
    const intervalId = setInterval(() => {
      count += 1;

      if (count > INTRO_END_COUNT) {
        clearInterval(intervalId);
        return;
      }

      setHarmonicCount(count);
    }, INTRO_STEP_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [userHasControlled, prefersReducedMotion, setHarmonicCount]);
};
