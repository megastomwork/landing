import client from '@/shared/lib/directus';
import { Article } from '@/shared/types/article.types';
import { readItems } from '@directus/sdk';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

export const useArticles = () => {
  const [isShowingAll, setIsShowingAll] = useState(false);
  const queryResult = useQuery({
    queryKey: ['articles'],
    queryFn: () =>
      client.request<Article[]>(
        readItems('Articles', {
          filter: {
            status: {
              _eq: 'published',
            },
          },
        }),
      ),
  });

  const toggleShowAll = useCallback(() => {
    setIsShowingAll(state => !state);
  }, []);

  return {
    ...queryResult,
    totalArticles: queryResult.data?.length ?? 0,
    isShowingAll,
    toggleShowAll,
  };
};
