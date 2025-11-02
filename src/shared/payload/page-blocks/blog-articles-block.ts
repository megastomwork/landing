import type { Block } from 'payload'

export const blogArticlesBlock: Block = {
  slug: 'blogArticles',
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
