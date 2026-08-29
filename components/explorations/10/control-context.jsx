import { createContext, useState } from 'react';

export const layouts = ['linear', 'radial'];
export const MIN_HARMONICS = 1;
export const MAX_HARMONICS = 20;

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [layout, setLayout] = useState('radial');
  const [harmonicCount, setHarmonicCount] = useState(7);

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
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
