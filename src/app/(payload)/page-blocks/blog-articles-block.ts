import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'

export const blogArticlesBlock: Block = {
  slug: BLOCK_TYPES.BLOG_ARTICLES,
  labels: {
    singular: 'Секція статей блогу',
    plural: 'Секції статей блогу',
  },
  imageURL: '/blocks/blog-articles.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Наш блог',
    },
    {
      name: 'articlesCount',
      type: 'number',
      label: 'Кількість статей',
      defaultValue: 3,
      min: 1,
      max: 12,
    },
    {
      name: 'showMoreLink',
      type: 'checkbox',
      label: 'Показати посилання "Більше"',
      defaultValue: true,
    },
  ],
}
