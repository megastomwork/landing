import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'

export const paragraphBlock: Block = {
  slug: BLOCK_TYPES.PARAGRAPH,
  labels: {
    singular: 'Секція-параграф',
    plural: 'Секції-параграфи',
  },
  imageURL: '/blocks/paragraph.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Контент',
      required: true,
    },
  ],
}
