import type { Block } from 'payload'

export const faqBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'Секція питань',
    plural: 'Секції питань',
  },
  imageURL: '/blocks/faq.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Часті питання',
    },
  ],
}
