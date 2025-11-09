import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'

export const faqBlock: Block = {
  slug: BLOCK_TYPES.FAQ,
  labels: {
    singular: 'Секція питань',
    plural: 'Секції питань',
  },
  imageURL: '/blocks/faq.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Часті питання',
    },
  ],
}
