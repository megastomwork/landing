import type { Field } from 'payload'

interface GlobalReferenceFieldOptions {
  globalSlug: string
  title: string
  fields: string[]
  fieldLabels?: Record<string, string>
  name?: string
}

export const createGlobalReferenceField = ({
  globalSlug,
  title,
  fields,
  fieldLabels = {},
  name = `${globalSlug}Reference`,
}: GlobalReferenceFieldOptions): Field => {
  return {
    name,
    type: 'ui',
    admin: {
      components: {
        Field: {
          path: '@/features/payload-admin/components/global-reference-field#GlobalReferenceField',
          clientProps: {
            globalSlug,
            title,
            fields,
            fieldLabels,
          },
        },
      },
    },
  }
}
