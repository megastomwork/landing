import { ROUTES } from '@/shared/constants/routes.constants';
import { useContent } from '@/shared/hooks/use-content';
import { ContentTextNavigationMenu } from '@/shared/types/content.types';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type MenuItem = {
  title: string;
  link: string;
  isSelected?: boolean;
  setActiveSelected?: (link: string) => void;
};

export const useMainMenu = (): MenuItem[] => {
  const pathname = usePathname();
  const texts = useContent<ContentTextNavigationMenu>({
    context: 'NavigationMenu',
  });

  return useMemo(
    () => [
      {
        title: texts.data?.home ?? 'Головна',
        link: ROUTES.HOME,
        isSelected: pathname === ROUTES.HOME,
      },
      {
        title: texts.data?.doctors ?? 'Лікарі',
        link: ROUTES.DOCTORS,
        isSelected: pathname === ROUTES.DOCTORS,
      },
      {
        title: texts.data?.services ?? 'Послуги',
        link: ROUTES.SERVICES,
      },
      {
        title: texts.data?.feedbacks ?? 'Відгуки',
        link: ROUTES.FEEDBACKS,
      },
      {
        title: texts.data?.blog ?? 'Блог',
        link: ROUTES.ARTICLES,
        isSelected: pathname === ROUTES.ARTICLES,
      },
      {
        title: texts.data?.prices ?? 'Ціни',
        link: ROUTES.PRICES,
        isSelected: pathname === ROUTES.PRICES,
      },
    ],
    [pathname, texts.data],
  );
};
