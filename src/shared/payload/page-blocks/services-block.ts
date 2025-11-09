import type { Block } from 'payload'
import { createCollectionReferenceField } from '@/shared/payload/fields/collection-reference-field'

export const servicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Секція послуг',
    plural: 'Секції послуг',
  },
  imageURL: '/blocks/services.png',
  fields: [
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
    createCollectionReferenceField({
      collectionSlug: 'services',
      title: 'Послуги',
      description: 'Оберіть конкретні послуги для відображення або залиште порожнім щоб показати всі опубліковані.',
      showTable: true,
      pageSize: 5,
      columns: [
        { key: "title", label: "Заголовок" },
        { key: "description", label: "Опис" },
      ]
    }),
  ],
}
