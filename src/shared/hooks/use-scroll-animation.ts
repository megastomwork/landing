'use client';

import { ANIMATION_SCREEN_TRIGGER_OFFSET } from '@/shared/constants/animations.constants';
import { useAnimation, useInView, Variants } from 'framer-motion';
import { useEffect } from 'react';

const VISIBLE = 'visible';
const HIDDEN = 'hidden';

const SECTION_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    paddingTop: 40,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  visible: {
    opacity: 1,
    paddingTop: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const useScrollAnimation = (
  ref: React.RefObject<HTMLElement | null>,
) => {
  const control = useAnimation();
  const isInViewForEnter = useInView(ref, {
    once: false,
    margin: `-${ANIMATION_SCREEN_TRIGGER_OFFSET}px`,
  });

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (isInViewForEnter) {
      control.start(VISIBLE);
    } else {
      const { bottom } = ref.current.getBoundingClientRect();
      const isBelowScreenBottom = bottom > window.innerHeight;
      if (isBelowScreenBottom) {
        control.start(HIDDEN);
      }
    }
  }, [isInViewForEnter, control, ref]);

  return {
    control,
    sectionVariants: SECTION_VARIANTS,
    initial: HIDDEN,
  };
};
