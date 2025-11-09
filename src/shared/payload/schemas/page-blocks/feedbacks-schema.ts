import type { Field } from 'payload'

/**
 * Schema for Feedbacks block base fields
 * Custom fields (like collection reference) are added in the block definition
 */
export const createFeedbacksBlockFields = (): Field[] => [
  {
    name: 'title',
    type: 'text',
    label: 'Заголовок',
    defaultValue: 'Відгуки наших клієнтів',
  },
]

/**
 * Configuration for feedbacks reference field
 * Used by createCollectionReferenceField in the block definition
 */
export const feedbacksReferenceConfig = {
  collectionSlug: 'feedbacks' as const,
  title: 'Відгуки',
  showTable: true,
  pageSize: 5,
  columns: [
    { key: 'clientName', label: 'Клієнт' },
    { key: 'content', label: 'Відгук' },
    { key: 'status', label: 'Статус' },
  ],
}
