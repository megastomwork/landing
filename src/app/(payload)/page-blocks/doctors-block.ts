import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'

export const doctorsBlock: Block = {
  slug: BLOCK_TYPES.DOCTORS,
  labels: {
    singular: 'Секція лікарів',
    plural: 'Секції лікарів',
  },
  imageURL: '/blocks/doctors.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Наші лікарі',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
    },
  ],
}
