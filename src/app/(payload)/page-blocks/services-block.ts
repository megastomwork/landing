import type { Block } from 'payload'
import { createCollectionReferenceField } from '@/features/payload-admin'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'

export const servicesBlock: Block = {
  slug: BLOCK_TYPES.SERVICES,
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
