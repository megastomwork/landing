import type { Block } from 'payload'

export const doctorsBlock: Block = {
  slug: 'doctors',
  labels: {
    singular: 'Секція лікарів',
    plural: 'Секції лікарів',
  },
  imageURL: '/blocks/doctors.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Наші лікарі',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
    },
  ],
}
