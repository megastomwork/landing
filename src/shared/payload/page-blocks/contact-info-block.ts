import type { Block } from 'payload'

export const contactInfoBlock: Block = {
  slug: 'contactInfo',
  labels: {
    singular: 'Розширена контактна секція',
    plural: 'Розширені контактні секції',
  },
  imageURL: '/blocks/contact-info.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Контактна інформація',
    },
    {
      name: 'showMap',
      type: 'checkbox',
      label: 'Показати карту',
      defaultValue: true,
    },
  ],
}
