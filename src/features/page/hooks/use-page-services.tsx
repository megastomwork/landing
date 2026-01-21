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
    queryFn: async () => {
      if (selectedServices && selectedServices.length > 0) {
        return selectedServices;
      }

      return payloadAPI.getCollection<Service>('services', {
        'where[status][equals]': 'published',
        limit: displayLimit || 100,
      });
    },
  });
};
