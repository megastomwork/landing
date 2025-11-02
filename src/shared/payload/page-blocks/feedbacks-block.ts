import type { Block } from 'payload'

export const feedbacksBlock: Block = {
  slug: 'feedbacks',
  labels: {
    singular: 'Секція відгуків',
    plural: 'Секції відгуків',
  },
  imageURL: '/blocks/feedbacks.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Відгуки наших клієнтів',
    },
  ],
}
