import { createContext, useCallback, useState } from 'react';

export const layouts = ['linear', 'radial'];
export const MIN_HARMONICS = 1;
export const MAX_HARMONICS = 20;
export const INTRO_START_COUNT = 1;
export const INTRO_END_COUNT = 10;
export const INTRO_STEP_MS = 1000;

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [layout, setLayout] = useState('radial');
  const [harmonicCount, setHarmonicCount] = useState(INTRO_START_COUNT);
  const [userHasControlled, setUserHasControlled] = useState(false);

  const claimUserControl = useCallback(() => {
    setUserHasControlled(true);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        layouts,
        layout,
        setLayout,
        harmonicCount,
        setHarmonicCount,
        minHarmonics: MIN_HARMONICS,
        maxHarmonics: MAX_HARMONICS,
        userHasControlled,
        claimUserControl,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
