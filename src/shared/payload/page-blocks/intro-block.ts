import type { Block } from 'payload'

export const introBlock: Block = {
  slug: 'intro',
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
