'use client';

import { useScrollAnimation } from '@/shared/hooks/use-scroll-animation';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { useId, useRef } from 'react';

type ScrollAnimatedContainerProps = HTMLMotionProps<'div'> & {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

const SECTION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
      delay,
    },
  }),
};

export const ScrollAnimatedContainer = ({
  children,
  className,
  delay,
  ...props
}: ScrollAnimatedContainerProps) => {
  const motionRef = useRef<HTMLDivElement>(null);
  const { control, initial } = useScrollAnimation(motionRef);
  const key = useId();

  return (
    <motion.div
      key={key}
      ref={motionRef}
      className={className}
      initial={initial}
      animate={control}
      variants={SECTION_VARIANTS}
      custom={delay}
      {...props}
    >
      {children}
    </motion.div>
  );
};
