import type { Block } from 'payload'

export const pricesBlock: Block = {
  slug: 'prices',
  labels: {
    singular: 'Секція цін',
    plural: 'Секції цін',
  },
  imageURL: '/blocks/prices.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Ціни',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
    },
  ],
}
