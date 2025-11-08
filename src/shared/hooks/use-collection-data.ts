import { useQuery } from '@tanstack/react-query'
import payloadAPI from '@/shared/lib/payload-rest'

interface UseCollectionDataParams {
  collectionSlug: string
  page?: number
  limit?: number
  enabled?: boolean
}

export function useCollectionData<T = Record<string, unknown>>({
  collectionSlug,
  page = 1,
  limit = 10,
  enabled = true,
}: UseCollectionDataParams) {
  return useQuery({
    queryKey: ['collection', collectionSlug, page, limit],
    queryFn: () =>
      payloadAPI.getCollectionWithPagination<T>(collectionSlug, {
        page,
        limit,
      }),
    enabled,
  })
}
