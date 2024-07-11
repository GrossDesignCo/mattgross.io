import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  // Default to dark because a flash of dark in light contexts
  // is better than a flash of white in dark contexts
  const [prefersDarkMode, setPrefersDarkMode] = useState(true);

  useEffect(() => {
    // Initialize query and default value for CSR
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDarkMode(query.matches);

    // Listen for changes
    const update = () => {
      setPrefersDarkMode(query.matches);
    };

    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  return prefersDarkMode;
};
