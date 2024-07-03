import { createContext, useState } from 'react';

// Group settings data with logic until it grows too big
export const patterns = ['radial', 'conic', 'none'];

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [pattern, setPattern] = useState('radial');

  return (
    <SettingsContext.Provider
      value={{
        patterns,
        pattern,
        setPattern,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
