import type { Field } from 'payload'
import type { DataTableColumn } from '@/shared/components/data-table'

export interface CollectionReferenceFieldColumn {
  key: string
  label: string
  render?: (value: unknown) => string
}

interface CollectionReferenceFieldOptions {
  collectionSlug: string
  title: string
  description?: string
  name?: string
  showTable?: boolean
  columns?: CollectionReferenceFieldColumn[]
  pageSize?: number
}

export const createCollectionReferenceField = ({
  collectionSlug,
  title,
  description,
  name = `${collectionSlug}Reference`,
  showTable = false,
  columns = [],
  pageSize = 10,
}: CollectionReferenceFieldOptions): Field => {
  return {
    name,
    type: 'ui',
    admin: {
      components: {
        Field: {
          path: '@/shared/payload/components/collection-reference-field#CollectionReferenceField',
          clientProps: {
            collectionSlug,
            title,
            description,
            showTable,
            columns,
            pageSize,
          },
        },
      },
    },
  }
}
