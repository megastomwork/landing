import client from '@/shared/lib/directus';
import { Doctor } from '@/shared/types/doctor.types';
import { readItems } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: () =>
      client.request<Doctor[]>(
        readItems('Doctors', {
          filter: {
            status: {
              _eq: 'published',
            },
          },
        }),
      ),
  });
};
