import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'

export const pricesBlock: Block = {
  slug: BLOCK_TYPES.PRICES,
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
