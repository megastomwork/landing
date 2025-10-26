import client from '@/shared/lib/directus';
import { Feedbacks } from '@/shared/types/feedbacks.types';
import { readItems } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';

export const useFeedbacks = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['feedbacks'],
    queryFn: () =>
      client.request<Feedbacks[]>(
        readItems('Feedbacks', {
          filter: {
            status: {
              _eq: 'published',
            },
          },
        }),
      ),
  });

  return {
    feedbacks: data,
    isFeedbacksLoading: isLoading,
  };
};
