import type { Block } from 'payload'

export const blogHeroBlock: Block = {
  slug: 'blogHero',
  labels: {
    singular: 'Герой секція блогу',
    plural: 'Герой секції блогу',
  },
  imageURL: '/blocks/blog-hero.png',
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Фонове зображення',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Блог',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
    },
  ],
}
