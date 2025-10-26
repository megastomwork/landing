import client from '@/shared/lib/directus';
import { ServicePrice } from '@/shared/types/service-prices.types';
import { readItems } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';

export const usePrices = () => {
  const prices = useQuery({
    queryKey: ['prices'],
    queryFn: () =>
      client.request<ServicePrice[]>(
        readItems('ServicePrices', {
          filter: {
            status: {
              _eq: 'published',
            },
          },
        }),
      ),
  });

  return {
    ...prices,
    data: prices.data?.reduce(
      (acc, price) => {
        acc[price.serviceId] = [...(acc[price.serviceId] || []), price];
        return acc;
      },
      {} as Record<string, ServicePrice[]>,
    ),
  };
};
