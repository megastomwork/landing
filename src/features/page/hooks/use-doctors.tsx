import payloadAPI from '@/shared/lib/payload-rest';
import type { Doctor } from '@/shared/payload/payload-types';
import { useQuery } from '@tanstack/react-query';

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: () =>
      payloadAPI.getCollection<Doctor>('doctors', {
        where: {
          status: {
            equals: 'published',
          },
        },
        sort: 'sortOrder',
      }),
  });
};
