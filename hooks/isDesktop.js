import { useState, useEffect } from "react";

export const useIsDesktop = () => {
  const checkIsDesktop = () => {
    return window.matchMedia("(min-width: 800px)").matches;
  };

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const set = () => setIsDesktop(checkIsDesktop());

    set();

    window.addEventListener("resize", set);

    return () => {
      window.removeEventListener("resize", set);
    };
  });

  return {
    isDesktop,
  };
};
