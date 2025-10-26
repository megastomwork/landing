import client from '@/shared/lib/directus';
import { Services } from '@/shared/types/services.types';
import { readItems } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';

export const useServices = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () =>
      client.request<Services[]>(
        readItems('Services', {
          filter: {
            status: {
              _eq: 'published',
            },
          },
        }),
      ),
  });

  return {
    services: data,
    isServicesLoading: isLoading,
  };
};
