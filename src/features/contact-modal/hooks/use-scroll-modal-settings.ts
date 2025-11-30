import payloadAPI from '@/shared/lib/payload-rest';
import { useQuery } from '@tanstack/react-query';

type ScrollModalSettings = {
  isEnabled: boolean;
  scrollDownTrigger: number;
  scrollUpTrigger: number;
  image?: {
    id: string;
    url?: string;
    alt?: string;
  } | string;
  title: string;
  description: string;
};

export const useScrollModalSettings = () => {
  return useQuery({
    queryKey: ['scrollModal'],
    queryFn: () => payloadAPI.getGlobal<ScrollModalSettings>('scrollModal'),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
