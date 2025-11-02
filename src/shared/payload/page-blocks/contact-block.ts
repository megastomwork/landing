import type { Block } from 'payload'
import { createGlobalReferenceField } from '@/shared/payload/fields/global-reference-field'

export const contactBlock: Block = {
  slug: 'contact',
  labels: {
    singular: 'Секція контактів',
    plural: 'Секції контактів',
  },
  imageURL: '/blocks/contact.png',
  fields: [
    createGlobalReferenceField({
      globalSlug: 'contacts',
      title: 'Контактна інформація',
      fields: ['phone', 'email', 'address'],
      fieldLabels: {
        phone: 'Телефон',
        email: 'Email',
        address: 'Адреса',
      },
    }),
    createGlobalReferenceField({
      globalSlug: 'workingHours',
      title: 'Робочі години',
      fields: ['schedule'],
      fieldLabels: {
        schedule: 'Розклад',
      },
    }),
    {
      name: 'showImage',
      type: 'checkbox',
      label: 'Показати зображення',
      defaultValue: true,
    },
  ],
}
