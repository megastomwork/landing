'use client';

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from '@/shared/components/ui-kit/menubar';
import { cn } from '@/shared/lib/css';
import Link from 'next/link';
import { useMainMenu } from '../hooks/use-menu';

type HeaderMenuProps = {
  className?: string;
  onClose?: () => void;
};

export function HeaderMenu({ className, onClose }: HeaderMenuProps) {
  const menu = useMainMenu();

  return (
    <Menubar className={cn('flex', className)}>
      {menu.map((item, index) => (
        <MenubarMenu key={index}>
          <MenubarTrigger
            isActive={item.isSelected}
            className="w-full px-4 py-2 text-center font-sans text-base text-black sm:w-auto"
          >
            <Link href={item.link} onClick={onClose}>
              {item.title}
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}
