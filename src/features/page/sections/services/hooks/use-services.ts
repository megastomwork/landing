import payloadAPI from '@/shared/lib/payload-rest';
import { Services } from '@/shared/types/services.types';
import { useQuery } from '@tanstack/react-query';

export const useServices = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () =>
      payloadAPI.getCollection<Services>('services', {
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
  });

  return {
    services: data,
    isServicesLoading: isLoading,
  };
};
