import { useQuery } from '@tanstack/react-query';
import payloadAPI from '@/shared/lib/payload-rest';

interface UseCollectionDataParams {
  collectionSlug: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
  where?: Record<string, unknown>;
  sort?: string;
}

export function useCollectionData<T = Record<string, unknown>>({
  collectionSlug,
  page = 1,
  limit = 10,
  enabled = true,
  where,
  sort,
}: UseCollectionDataParams) {
  return useQuery({
    queryKey: ['collection', collectionSlug, page, limit, where, sort],
    queryFn: () =>
      payloadAPI.getCollectionWithPagination<T>(collectionSlug, {
        page,
        limit,
        where,
        sort,
      }),
    enabled,
  });
}
