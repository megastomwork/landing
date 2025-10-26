'use client';

import { useEffect, useState } from 'react';

export const useInScreenBounds = (ref: React.RefObject<HTMLElement | null>) => {
  const [isInScreen, setIsInScreen] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const screenHeight = window.innerHeight;
    const elementOffset =
      ref.current.getBoundingClientRect().top + window.scrollY;

    if (elementOffset < screenHeight) {
      setIsInScreen(true);
    }
  }, [ref]);

  return isInScreen;
};
