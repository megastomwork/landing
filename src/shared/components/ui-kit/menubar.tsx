'use client';

import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as React from 'react';

import { cn } from '@/shared/lib/css';

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />;
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn('p-[0px] md:gap-[24px]', className)}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

interface MenubarTriggerProps
  extends React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger> {
  isActive?: boolean;
}

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  MenubarTriggerProps
>(({ className, isActive, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    data-active={isActive}
    className={cn(
      'cursor-pointer outline-none',
      'hover:bg-transparent',
      'sm:data-[active=true]:border-b-2 sm:data-[active=true]:border-b-[#34E6F6]',
      className,
    )}
    {...props}
  />
));

MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

export { Menubar, MenubarMenu, MenubarTrigger };
