import { useQuery } from '@tanstack/react-query'
import payloadAPI from '@/shared/lib/payload-rest'
import type { Article } from '@/shared/payload/payload-types'

interface UsePageArticlesParams {
  articlesCount?: number | null
}

export const usePageArticles = ({ articlesCount }: UsePageArticlesParams) => {
  return useQuery({
    queryKey: ['page-articles', articlesCount],
    queryFn: () =>
      payloadAPI.getCollection<Article>('articles', {
        where: {
          status: {
            equals: 'published',
          },
        },
        limit: articlesCount || 3,
        sort: '-createdAt',
      }),
  })
}
