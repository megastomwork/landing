import { PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/css';

type UnderlineProps = {
  underlineClassName?: string;
};

export const Underline = ({
  children,
  underlineClassName = 'bg-accent-100',
}: PropsWithChildren<UnderlineProps>) => {
  return (
    <span className="relative">
      {children}
      <span
        className={cn(
          'absolute bottom-0 left-0 h-[4px] w-full bg-accent-100',
          underlineClassName,
        )}
      />
    </span>
  );
};
