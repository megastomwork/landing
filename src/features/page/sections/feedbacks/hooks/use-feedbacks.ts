import payloadAPI from '@/shared/lib/payload-rest';
import { useQuery } from '@tanstack/react-query';
import { Feedback } from '@types';

export const useFeedbacks = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: () =>
      payloadAPI.getCollection<Feedback>('feedbacks', {
        "where[status][equals]": "published"
      }),
  });

  return {
    feedbacks: data,
    isFeedbacksLoading: isLoading,
  };
};
