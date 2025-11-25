import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'

export const blogRowBlock: Block = {
  slug: BLOCK_TYPES.BLOG_ROW,
  labels: {
    singular: 'Секція статей блогу (Row)',
    plural: 'Секції статей блогу (Row)',
  },
  imageURL: '/blocks/blog-row.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Наші статті',
    },
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      label: 'Статті',
      required: true,
      admin: {
        description: 'Виберіть статті для відображення',
      },
    },
    {
      name: 'showMoreLink',
      type: 'checkbox',
      label: 'Показати посилання "Більше"',
      defaultValue: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Текст кнопки',
      defaultValue: 'Більше статей',
    },
  ],
}
