import payloadAPI from '@/shared/lib/payload-rest';
import { ServicePrice } from '@/shared/types/service-prices.types';
import { useQuery } from '@tanstack/react-query';

export const usePrices = () => {
  const prices = useQuery({
    queryKey: ['prices'],
    queryFn: () => payloadAPI.getCollection<ServicePrice>('service-prices'),
  });

  return {
    ...prices,
    data: prices.data?.reduce(
      (acc, price) => {
        const serviceId = typeof price.serviceId === 'object' ? (price.serviceId as any).id : price.serviceId;
        acc[serviceId] = [...(acc[serviceId] || []), price];
        return acc;
      },
      {} as Record<string, ServicePrice[]>,
    ),
  };
};
