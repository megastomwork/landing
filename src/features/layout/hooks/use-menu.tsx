'use client'

import { useSiteSettings } from '@/shared/hooks/use-site-settings'
import type { MenuItemWithState } from '@/shared/types/layout.types'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export const useMainMenu = (): MenuItemWithState[] => {
  const pathname = usePathname()
  const { data: settings, isLoading } = useSiteSettings()

  return useMemo(() => {
    if (!settings?.menuItems) return []

    return settings.menuItems
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(item => ({
        label: item.label,
        path: item.path,
        order: item.order || 0,
        isSelected: pathname === item.path,
      }))
  }, [pathname, settings])
}
