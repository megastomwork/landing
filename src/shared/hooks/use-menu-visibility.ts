import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from './use-media-query';
import { useClickOutside } from './use-click-outside';

export const useMenuVisibility = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    if (menuVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [menuVisible]);

  useClickOutside(menuRef, () => setMenuVisible(false));

  const isDesktop = useMediaQuery('(min-width: 640px)');

  useEffect(() => {
    if (isDesktop) {
      setMenuVisible(false);
    }
  }, [isDesktop, setMenuVisible]);

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return { menuVisible, toggleMenu, menuRef, closeMenu };
};
