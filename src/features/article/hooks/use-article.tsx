import client from '@/shared/lib/directus';
import { Article } from '@/shared/types/article.types';
import { readItem } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';

type UseArticleOptions = {
  id?: string | null;
};

export const useArticle = ({ id }: UseArticleOptions) => {
  const { data, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () =>
      client.request<Article>(
        readItem('Articles', id!, {
          filter: {
            status: {
              _eq: 'published',
            },
          },
        }),
      ),
    enabled: !!id,
  });

  return {
    article: data,
    isArticleLoading: isLoading,
  };
};
