import type { CollectionReferenceFieldColumn } from '@/features/payload-admin';

export interface CollectionReferenceFieldProps {
  collectionSlug: string;
  title: string;
  description?: string;
  showTable?: boolean;
  columns?: CollectionReferenceFieldColumn[];
  pageSize?: number;
  filters?: Record<string, string>;
  reorderable?: boolean;
  paginationType?: 'page' | 'load-more';
}
