import { createContext, useState, useEffect } from 'react';

// Group settings data with logic until it grows too big
export const dirs = ['default', 'ltr', 'rtl'];
export const availableLanguages = ['en', 'en-translit', 'he'];

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [dir, setDir] = useState('default');
  const [selectedLanguages, setLanguages] = useState(['en']);

  useEffect(() => {
    // If only RTL is selected, auto-update to rtl
    if (selectedLanguages.includes('he') && selectedLanguages.length === 1) {
      setDir('rtl');
    }
    // If mixed or just english:
    else {
      setDir('default');
    }
  }, [selectedLanguages]);

  return (
    <SettingsContext.Provider
      value={{
        dirs,
        dir,
        setDir,
        availableLanguages,
        selectedLanguages,
        setLanguages,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
