import type { Field } from 'payload';
import type { ReactNode } from 'react';

export interface CollectionReferenceFieldColumn {
  key: string;
  label: string;
  render?: (value: unknown, row: Record<string, unknown>) => ReactNode;
}

export interface CollectionReferenceFieldOptions {
  collectionSlug: string;
  title: string;
  description?: string;
  name?: string;
  showTable?: boolean;
  columns?: CollectionReferenceFieldColumn[];
  pageSize?: number;
  /**
   * Filters to apply to the collection query
   * Use $id, $field_name to reference current document fields
   *
   * @example
   * filters: { serviceId: '$id' } // Filter by current document ID
   * filters: { status: 'published' } // Filter by static value
   * filters: { authorId: '$createdBy', status: 'published' } // Multiple filters
   */
  filters?: Record<string, string>;
}

export const createCollectionReferenceField = ({
  collectionSlug,
  title,
  description,
  name = `${collectionSlug}Reference`,
  showTable = false,
  columns = [],
  pageSize = 10,
  filters,
}: CollectionReferenceFieldOptions): Field => {
  return {
    name,
    type: 'ui',
    admin: {
      components: {
        Field: {
          path: '@/features/payload-admin/components/collection-reference-field#CollectionReferenceField',
          clientProps: {
            collectionSlug,
            title,
            description,
            showTable,
            columns,
            pageSize,
            filters,
          },
        },
      },
    },
  };
};
