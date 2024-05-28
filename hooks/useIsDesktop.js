import { useState, useEffect } from 'react';

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 800px)');
    const set = () => setIsDesktop(query.matches);

    set();

    query.addEventListener('change', set);

    return () => {
      query.removeEventListener('change', set);
    };
  });

  return {
    isDesktop,
  };
};
