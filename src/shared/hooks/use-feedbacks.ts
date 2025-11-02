import payloadAPI from '@/shared/lib/payload-rest';
import { Feedbacks } from '@/shared/types/feedbacks.types';
import { useQuery } from '@tanstack/react-query';

export const useFeedbacks = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: () =>
      payloadAPI.getCollection<Feedbacks>('feedbacks', {
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
  });

  return {
    feedbacks: data,
    isFeedbacksLoading: isLoading,
  };
};
