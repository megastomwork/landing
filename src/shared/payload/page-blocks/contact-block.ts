import type { Block } from 'payload'
import { createGlobalReferenceField } from '@/shared/payload/fields/global-reference-field'
import { createCollectionReferenceField } from '@/shared/payload/fields/collection-reference-field'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'

export const contactBlock: Block = {
  slug: BLOCK_TYPES.CONTACT,
  labels: {
    singular: 'Секція контактів',
    plural: 'Секції контактів',
  },
  imageURL: '/blocks/contact.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Зв\'яжіться з нами',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Зображення',
    },
    {
      name: 'showImage',
      type: 'checkbox',
      label: 'Показати зображення',
      defaultValue: true,
    },
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
    createCollectionReferenceField({
      collectionSlug: 'socials',
      title: 'Соціальні мережі',
      description: 'Для редагування соціальних мереж перейдіть до колекції Socials',
      showTable: true,
      columns: [
        { key: 'title', label: 'Назва' },
        { key: 'username', label: 'Username' },
        { key: 'link', label: 'Посилання' },
        { key: 'icon', label: 'Іконка' },
      ],
      pageSize: 10,
    }),
  ],
}
