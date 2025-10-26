'use client';

import { useEffect, useRef, useState } from 'react';
import { useOpenContactModal } from './use-open-contact-modal';

export const useTriggerModalOnScroll = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [isScrolledToFooter, setIsScrolledToFooter] = useState(false);
  const [modalOpenedForServices, setModalOpenedForServices] = useState(false);
  const openModal = useOpenContactModal();

  useEffect(() => {
    const handleScroll = () => {
      const footerElement = footerRef.current;
      const servicesElement = servicesRef.current;

      if (
        !footerElement ||
        !servicesElement ||
        typeof footerElement.offsetTop !== 'number' ||
        typeof servicesElement.offsetTop !== 'number'
      ) {
        return;
      }

      const footerOffset = footerElement.offsetTop;
      const servicesOffset = servicesElement.offsetTop;
      const currentScrollY = window.scrollY;

      if (!isScrolledToFooter) {
        if (currentScrollY + window.innerHeight >= footerOffset) {
          console.log(
            `Detected scroll to footer area. ${currentScrollY + window.innerHeight} >= ${footerOffset}`,
          );
          setIsScrolledToFooter(true);
        }
      } else if (!modalOpenedForServices) {
        if (currentScrollY <= servicesOffset) {
          console.log(
            'User scrolled up to services section after reaching footer. Opening modal.',
          );
          openModal();
          setModalOpenedForServices(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolledToFooter, modalOpenedForServices, openModal]);

  return {
    footerRef,
    servicesRef,
  };
};
