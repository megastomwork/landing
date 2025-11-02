import payloadAPI from '@/shared/lib/payload-rest';
import type { Article } from '@/shared/payload/payload-types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

export const useArticles = () => {
  const [isShowingAll, setIsShowingAll] = useState(false);
  const queryResult = useQuery({
    queryKey: ['articles'],
    queryFn: () =>
      payloadAPI.getCollection<Article>('articles', {
        where: {
          status: {
            equals: 'published',
          },
        },
      }),
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
