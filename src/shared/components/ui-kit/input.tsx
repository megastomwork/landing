import * as React from 'react';

import { cn } from '@/shared/lib/css';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex min-h-[36px] w-full min-w-[209px] max-w-[336px] rounded-[16px] border border-black border-input bg-transparent px-3 px-4 py-1 py-2 text-left font-sans text-base font-bold text-black shadow-sm transition-colors file:border file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
