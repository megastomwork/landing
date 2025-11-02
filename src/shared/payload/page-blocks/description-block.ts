import type { Block } from 'payload'

export const descriptionBlock: Block = {
  slug: 'description',
  labels: {
    singular: 'Текстова секція',
    plural: 'Текстові секції',
  },
  imageURL: '/blocks/description.png',
  fields: [
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст',
      required: true,
    },
  ],
}
