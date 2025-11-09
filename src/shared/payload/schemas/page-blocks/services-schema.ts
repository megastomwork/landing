import type { Field } from 'payload'

/**
 * Schema for Services block base fields
 * Custom fields (like collection reference) are added in the block definition
 */
export const createServicesBlockFields = (): Field[] => [
  {
    name: 'title',
    type: 'text',
    label: 'Заголовок',
    defaultValue: 'Наші послуги',
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Опис',
  },
]

/**
 * Configuration for services reference field
 * Used by createCollectionReferenceField in the block definition
 */
export const servicesReferenceConfig = {
  collectionSlug: 'services' as const,
  title: 'Послуги',
  description: 'Оберіть конкретні послуги для відображення або залиште порожнім щоб показати всі опубліковані.',
  showTable: true,
  pageSize: 5,
  columns: [
    { key: 'title', label: 'Заголовок' },
    { key: 'description', label: 'Опис' },
  ],
}
