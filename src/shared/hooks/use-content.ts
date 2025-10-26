import client from '@/shared/lib/directus';
import { readItems } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';

type UseContentOptions = {
  context:
    | 'HomePage'
    | 'NavigationMenu'
    | 'DoctorsPage'
    | 'BlogPage'
    | 'CallToActionSection'
    | 'PricesPage';
};

export const useContent = <T>({ context }: UseContentOptions) => {
  return useQuery({
    queryKey: ['content', context],
    queryFn: () => client.request<T>(readItems(context)),
  });
};
