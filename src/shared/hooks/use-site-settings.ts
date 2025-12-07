'use client';

import payloadAPI from '@/shared/lib/payload-rest';
import type { SiteSetting } from '@/shared/payload/payload-types';
import { useQuery } from '@tanstack/react-query';

export const useSiteSettings = () => {
  return useQuery<SiteSetting>({
    queryKey: ['siteSettings'],
    queryFn: () => payloadAPI.getGlobal('siteSettings'),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnWindowFocus: false,
  });
};

// Typed selectors for specific parts of settings
export const useLogo = () => {
  const { data } = useSiteSettings();
  const media = typeof data?.logo === 'number' ? null : data?.logo;
  return {
    media,
    alt: media?.alt || 'Logo',
  };
};

export const useContactButton = () => {
  const { data } = useSiteSettings();
  return {
    text: data?.contactButtonText || "Зв'язатись",
  };
};

export const useFooterSettings = () => {
  const { data } = useSiteSettings();
  return {
    menuTitle: data?.footerMenuTitle || 'Меню:',
  };
};
