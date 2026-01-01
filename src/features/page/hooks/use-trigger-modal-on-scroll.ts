'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useOpenContactModal } from '@/features/contact-modal/hooks/use-open-contact-modal';
import { useScrollModalSettings } from '@/features/contact-modal/hooks/use-scroll-modal-settings';

type UseTriggerModalOnScrollOptions = {
  isEnabled?: boolean;
};

export const useTriggerModalOnScroll = ({
  isEnabled = true,
}: UseTriggerModalOnScrollOptions) => {
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const openModal = useOpenContactModal();
  const { data: settings, isLoading } = useScrollModalSettings();
  const pathname = usePathname();

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    // Don't attach scroll listener if:
    // - Settings are loading
    // - Modal is disabled
    // - Modal was already shown
    // - Required trigger values are missing
    if (
      isLoading ||
      !settings?.isEnabled ||
      hasShownModal ||
      typeof settings.scrollDownTrigger !== 'number' ||
      typeof settings.scrollUpTrigger !== 'number'
    ) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Prevent division by zero for short pages
      if (docHeight <= 0) {
        return;
      }

      const scrollPercent = (scrollTop / docHeight) * 100;

      if (!hasScrolledDown) {
        if (scrollPercent >= settings.scrollDownTrigger) {
          setHasScrolledDown(true);
        }
      } else if (!hasShownModal) {
        if (scrollPercent <= settings.scrollUpTrigger) {
          openModal();
          setHasShownModal(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [
    pathname,
    hasScrolledDown,
    hasShownModal,
    openModal,
    settings?.isEnabled,
    settings?.scrollDownTrigger,
    settings?.scrollUpTrigger,
    isLoading,
  ]);
};
