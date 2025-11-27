'use client';

import { useSiteSettings } from '@/shared/hooks/use-site-settings';
import type { MenuItemWithState } from '@/shared/types/layout.types';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const useMainMenu = (): {
  data: MenuItemWithState[];
  isLoading: boolean;
} => {
  const pathname = usePathname();
  const { data: settings, isLoading } = useSiteSettings();

  const menu = useMemo(() => {
    if (!settings?.menuItems) return [];

    return settings.menuItems.map(item => ({
      label: item.label,
      link: item.path,
      isSelected: pathname === item.path,
    }));
  }, [pathname, settings]);

  return {
    data: menu,
    isLoading,
  };
};
