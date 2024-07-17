import { useEffect, useState } from 'react';

export const useMediaQuery = (queryString) => {
  // Default to dark because a flash of dark in light contexts
  // is better than a flash of white in dark contexts
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Initialize query and default value for CSR
    const query = window.matchMedia(queryString);
    const update = () => setMatches(query.matches);

    update();

    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, [queryString]);

  return matches;
};
