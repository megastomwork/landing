import type { Block } from 'payload'

export const aboutBlock: Block = {
  slug: 'about',
  labels: {
    singular: 'Секція "Про нас"',
    plural: 'Секції "Про нас"',
  },
  imageURL: '/blocks/about-us.png',
  fields: [
    {
      name: 'showDefaultContent',
      type: 'checkbox',
      label: 'Показати стандартний контент',
      defaultValue: true,
    },
  ],
}
