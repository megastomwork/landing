import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'

export const introBlock: Block = {
  slug: BLOCK_TYPES.INTRO,
  labels: {
    singular: 'Вступна секція',
    plural: 'Вступні секції',
  },
  imageURL: '/blocks/intro.png',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Зображення',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt текст',
      defaultValue: 'Зображення',
    },
  ],
}
