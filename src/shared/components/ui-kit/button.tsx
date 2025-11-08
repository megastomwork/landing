'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/shared/lib/css';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        header:
          'bg-accent-60 text-base font-sans font-bold text-center text-black  shadow-sm hover:bg-[#80E1FF] rounded-[20px]',
        default:
          'bg-accent-60 text-base font-sans font-bold text-center text-black  shadow-sm hover:bg-accent-80 rounded-[20px] active:bg-accent-100',
        secondary:
          'bg-[#99ECFF] text-base font-sans font-bold text-center text-black  shadow-sm hover:bg-[#80E1FF] rounded-[20px] ',
        tertiary:
          'bg-[#00D9FF] text-base font-sans font-bold text-center text-black shadow-sm hover:bg-[#00C8F2] rounded-[20px]',
        disabled:
          'bg-[#C4F1FF] text-base font-sans font-bold text-center text-[#A3D9F2] shadow-sm rounded-[20px]',
        outline:
          'border-2 border-[#00D9FF] text-base font-sans font-bold text-center bg-white text-black shadow-sm hover:bg-[#E5FBFF] rounded-[20px]',
        ghost:
          'bg-transparent text-center text-base font-sans font-bold text-black shadow-sm hover:bg-[#E5FBFF] rounded-[20px]',
        white:
          'bg-white text-center text-base font-sans font-bold text-black shadow-sm hover:bg-[#f1fdff] rounded-[20px]',
        'admin-secondary': 'bg-secondary hover:bg-white/10 rounded-sm no-underline',
        'admin-outline': 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-lg no-underline',
        'admin-ghost': 'bg-transparent hover:bg-accent hover:text-accent-foreground rounded-lg no-underline border-none'
      },
      size: {
        default: 'h-[40px]  w-[198px] px-4 py-2',
        sm: 'h-[40px] w-[146px] px-3 ',
        lg: 'h-[44px] px-8',
        icon: 'h-[40px] w-[40px]',
        'admin-default': 'h-10 px-4 py-2'
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
