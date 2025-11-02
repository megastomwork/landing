import payloadAPI from '@/shared/lib/payload-rest';
import { Social } from '@/shared/types/socials.types';
import { useQuery } from '@tanstack/react-query';

export const useSocials = () => {
  return useQuery({
    queryKey: ['socials'],
    queryFn: () => payloadAPI.getCollection<Social>('socials'),
  });
};
