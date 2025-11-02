import type { Field } from 'payload'

interface CollectionReferenceFieldOptions {
  collectionSlug: string
  title: string
  description?: string
  name?: string
}

export const createCollectionReferenceField = ({
  collectionSlug,
  title,
  description,
  name = `${collectionSlug}Reference`,
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
          },
        },
      },
    },
  }
}
