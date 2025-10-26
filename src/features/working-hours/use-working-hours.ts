import { readItems } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';
import client from '@/shared/lib/directus';
import { Schedule } from '@/shared/types/schedule.types';

export const useWorkingHours = () => {
  return useQuery({
    queryKey: ['working-hours'],
    queryFn: () =>
      client.request<Schedule[]>(
        readItems('WorkingHours', {
          filter: {
            status: {
              _eq: 'published',
            },
          },
          sort: ['sort'],
        }),
      ),
  });
};
