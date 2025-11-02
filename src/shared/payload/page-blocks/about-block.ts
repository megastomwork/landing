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
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
      defaultValue: 'Про нас',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Зображення',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Показники',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'value',
          type: 'text',
          label: 'Показник',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Підпис',
          required: true,
        },
      ],
    },
  ],
}
