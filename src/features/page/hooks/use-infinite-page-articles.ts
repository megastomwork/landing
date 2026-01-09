import { useInfiniteQuery } from '@tanstack/react-query';
import payloadAPI from '@/shared/lib/payload-rest';
import type { Article } from '@/shared/payload/payload-types';

const PAGE_LIMIT = 4;

export const useInfinitePageArticles = () => {
  return useInfiniteQuery({
    queryKey: ['infinite-page-articles'],
    queryFn: async ({ pageParam }) => {
      return payloadAPI.getCollectionWithPagination<Article>('articles', {
        where: {
          status: {
            equals: 'published',
          },
        },
        limit: PAGE_LIMIT,
        page: pageParam,
        sort: '-createdAt',
      });
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (!lastPage.hasNextPage) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
};
