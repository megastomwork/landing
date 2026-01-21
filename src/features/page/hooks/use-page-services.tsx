import { useQuery } from '@tanstack/react-query';
import payloadAPI from '@/shared/lib/payload-rest';
import type { Service } from '@/shared/payload/payload-types';

interface UsePageServicesParams {
  selectedServices?: (number | Service)[] | null;
  displayLimit?: number | null;
}

export const usePageServices = ({
  selectedServices,
  displayLimit,
}: UsePageServicesParams) => {
  return useQuery({
    queryKey: ['page-services', selectedServices, displayLimit],
    queryFn: async (): Promise<Service[]> => {
      // If services are already populated as objects, filter and return them
      if (selectedServices && selectedServices.length > 0) {
        const services = selectedServices.filter(
          (s): s is Service => typeof s === 'object' && s !== null,
        );

        if (services.length > 0) {
          return services.filter(s => s.status === 'published');
        }
      }

      // Otherwise get all published services
      return payloadAPI.getCollection<Service>('services', {
        'where[status][equals]': 'published',
        limit: displayLimit || 100,
      });
    },
  });
};
