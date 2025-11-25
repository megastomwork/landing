import payloadAPI from '@/shared/lib/payload-rest';
import { Service } from '@/shared/payload/payload-types';
import { useQuery } from '@tanstack/react-query';

export const useServices = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () =>
      payloadAPI.getCollection<Service>('services', {
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
