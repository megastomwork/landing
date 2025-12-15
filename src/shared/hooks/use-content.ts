import payloadAPI from '@/shared/lib/payload-rest';
import { useQuery } from '@tanstack/react-query';

type UseContentOptions = {
  context: 'navigationMenu' | 'callToActionSection';
};

export const useContent = <T>({ context }: UseContentOptions) => {
  return useQuery({
    queryKey: ['content', context],
    queryFn: async () => {
      const data =
        await payloadAPI.getGlobal<Record<string, unknown>>('content');
      return data[context] as T;
    },
  });
};
