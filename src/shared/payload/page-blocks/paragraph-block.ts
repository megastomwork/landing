import type { Block } from 'payload'

export const paragraphBlock: Block = {
  slug: 'paragraph',
  labels: {
    singular: 'Секція-параграф',
    plural: 'Секції-параграфи',
  },
  imageURL: '/blocks/paragraph.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Контент',
      required: true,
    },
  ],
}
