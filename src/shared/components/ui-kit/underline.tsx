import type { PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/css';

const underlineVariants = cva('bg-accent-100 absolute bottom-0 left-0 h-1', {
  variants: {
    variant: {
      full: 'w-full max-w-full',
      accent: 'w-[120px] max-w-full max-sm:left-1/2 max-sm:-translate-x-1/2',
    },
  },
  defaultVariants: {
    variant: 'full',
  },
});

type UnderlineProps = PropsWithChildren<{
  underlineClassName?: string;
}> &
  VariantProps<typeof underlineVariants>;

export const Underline = ({
  children,
  underlineClassName,
  variant,
}: UnderlineProps) => {
  return (
    <span className="relative">
      {children}
      <span
        className={cn(underlineVariants({ variant }), underlineClassName)}
      />
    </span>
  );
};
