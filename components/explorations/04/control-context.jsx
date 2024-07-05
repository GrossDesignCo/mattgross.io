import { createContext, useState } from 'react';

// Group settings data with logic until it grows too big
export const patterns = ['radial', 'conic', 'none'];

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [pattern, setPattern] = useState('radial');
  const [layerCount, setLayerCount] = useState(24);
  const [petalCount, setPetalCount] = useState(32);

  return (
    <SettingsContext.Provider
      value={{
        patterns,
        pattern,
        setPattern,
        layerCount,
        setLayerCount,
        petalCount,
        setPetalCount,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
