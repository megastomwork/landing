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
    }),
    {
      name: 'selectedServices',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Обрані послуги',
      admin: {
        description: 'Якщо не обрано - показуються всі опубліковані послуги',
      },
    },
    {
      name: 'displayLimit',
      type: 'number',
      label: 'Кількість послуг для відображення',
      admin: {
        description: 'Залиште порожнім щоб показати всі',
      },
      min: 1,
    },
  ],
}
