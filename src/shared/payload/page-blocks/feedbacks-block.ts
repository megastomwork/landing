import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'

export const feedbacksBlock: Block = {
  slug: BLOCK_TYPES.FEEDBACKS,
  labels: {
    singular: 'Секція відгуків',
    plural: 'Секції відгуків',
  },
  imageURL: '/blocks/feedbacks.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Відгуки наших клієнтів',
    },
  ],
}
