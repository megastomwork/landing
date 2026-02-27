import { useState, useCallback, useEffect, useRef } from 'react';
import { useCollectionReference } from './use-collection-reference';

interface UseLoadMoreParams {
  collectionSlug: string;
  filters?: Record<string, string>;
  pageSize: number;
  showTable: boolean;
  reorderable: boolean;
}

export function useLoadMore({
  collectionSlug,
  filters,
  pageSize,
  showTable,
  reorderable,
}: UseLoadMoreParams) {
  const [page, setPage] = useState(1);
  const [accumulatedItems, setAccumulatedItems] = useState<
    Record<string, unknown>[]
  >([]);

  const { data, totalDocs, hasNextPage, isLoading, refetch, whereCondition } =
    useCollectionReference({
      collectionSlug,
      filters,
      pageSize,
      page,
      showTable,
      reorderable,
    });

  // Reset accumulated data when filters change
  const prevWhereRef = useRef(whereCondition);
  useEffect(() => {
    if (
      JSON.stringify(prevWhereRef.current) !== JSON.stringify(whereCondition)
    ) {
      setAccumulatedItems([]);
      setPage(1);
      prevWhereRef.current = whereCondition;
    }
  }, [whereCondition]);

  // Accumulate data as pages are loaded
  useEffect(() => {
    if (data.length > 0) {
      if (page === 1) {
        setAccumulatedItems(data);
      } else {
        setAccumulatedItems(prev => {
          const existingIds = new Set(prev.map(item => item.id));
          const newItems = data.filter(item => !existingIds.has(item.id));
          return newItems.length > 0 ? [...prev, ...newItems] : prev;
        });
      }
    }
  }, [data, page]);

  const isLoadingMore = isLoading && page > 1;

  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      setPage(prev => prev + 1);
    }
  }, [hasNextPage, isLoading]);

  return {
    items: accumulatedItems,
    hasNextPage: isLoadingMore || hasNextPage,
    isLoading: isLoading && page === 1,
    isLoadingMore,
    loadMore,
    totalItems: totalDocs,
    refetch,
  };
}
