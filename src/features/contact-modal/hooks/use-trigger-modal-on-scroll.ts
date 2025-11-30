'use client';

import { useEffect, useState } from 'react';
import { useOpenContactModal } from './use-open-contact-modal';
import { useScrollModalSettings } from './use-scroll-modal-settings';

const SESSION_STORAGE_KEY = 'scrollModalShown';

export const useTriggerModalOnScroll = () => {
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const openModal = useOpenContactModal();
  const { data: settings, isLoading } = useScrollModalSettings();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wasShown = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (wasShown) {
        setHasShownModal(true);
      }
    }
  }, []);

  useEffect(() => {
    // Don't attach scroll listener if:
    // - Settings are loading
    // - Modal is disabled
    // - Modal was already shown
    if (isLoading || !settings?.isEnabled || hasShownModal) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (!hasScrolledDown) {
        if (scrollPercent >= settings.scrollDownTrigger) {
          setHasScrolledDown(true);
        }
      }
      else if (!hasShownModal) {
        if (scrollPercent <= settings.scrollUpTrigger) {
          openModal();
          setHasShownModal(true);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolledDown, hasShownModal, openModal, settings, isLoading]);
};
