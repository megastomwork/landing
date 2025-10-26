import client from '@/shared/lib/directus';
import { Question } from '@/shared/types/question.types';
import { readItems } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';

export const useQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: () =>
      client.request<Question[]>(
        readItems('FAQ', {
          sort: 'sort',
          filter: {
            status: {
              _eq: 'published',
            },
          },
        }),
      ),
  });
};
