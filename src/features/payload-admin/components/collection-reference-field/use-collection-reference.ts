import { useMemo } from 'react';
import { useDocumentInfo, useAllFormFields } from '@payloadcms/ui';
import { useCollectionData } from '@/shared/hooks/use-collection-data';

interface UseCollectionReferenceParams {
  collectionSlug: string;
  filters?: Record<string, string>;
  pageSize: number;
  page: number;
  showTable: boolean;
  reorderable: boolean;
}

export function useCollectionReference({
  collectionSlug,
  filters,
  pageSize,
  page,
  showTable,
  reorderable,
}: UseCollectionReferenceParams) {
  const { id } = useDocumentInfo();
  const [fields] = useAllFormFields();

  // Build where condition from filters config
  // Replaces $id and $field_name with actual document values
  const whereCondition = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) {
      return undefined;
    }

    const condition: Record<string, { equals: unknown }> = {};

    Object.entries(filters).forEach(([field, value]) => {
      if (typeof value === 'string' && value.startsWith('$')) {
        const fieldName = value.slice(1);

        if (fieldName === 'id') {
          if (id) {
            condition[field] = { equals: id };
          }
        } else {
          const fieldValue = fields?.[fieldName]?.value;
          if (fieldValue !== undefined && fieldValue !== null) {
            condition[field] = { equals: fieldValue };
          }
        }
      } else {
        condition[field] = { equals: value };
      }
    });

    return Object.keys(condition).length > 0 ? condition : undefined;
  }, [filters, id, fields]);

  const { data: response, isLoading, refetch } = useCollectionData({
    collectionSlug,
    page,
    limit: pageSize,
    enabled: showTable,
    where: whereCondition,
    sort: reorderable ? 'sortOrder' : undefined,
  });

  return {
    data: response?.docs || [],
    totalDocs: response?.totalDocs || 0,
    hasNextPage: response?.hasNextPage || false,
    isLoading,
    refetch,
    whereCondition,
  };
}
