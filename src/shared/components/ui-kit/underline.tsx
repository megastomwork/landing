import type { PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/css';

type UnderlineProps = PropsWithChildren<{
  underlineClassName?: string;
}>;

export const Underline = ({ children, underlineClassName }: UnderlineProps) => {
  return (
    <span className="relative">
      {children}
      <span
        className={cn(
          'bg-accent-100 absolute bottom-0 left-0 h-1 w-full max-w-full',
          underlineClassName,
        )}
      />
    </span>
  );
};
