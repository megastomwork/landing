import client from '@/shared/lib/directus';
import { Social } from '@/shared/types/socials.types';
import { readItems } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';

export const useSocials = () => {
  return useQuery({
    queryKey: ['socials'],
    queryFn: () =>
      client.request<Social[]>(
        readItems('SocialNetworks', {
          filter: {
            status: {
              _eq: 'published',
            },
          },
        }),
      ),
  });
};
