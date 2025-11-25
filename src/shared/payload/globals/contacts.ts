import type { GlobalConfig, Validate } from 'payload'

export const contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Контакти',

  admin: {
    description: 'Clinic contact information',
    group: 'Контент',
  },

  fields: [
    {
      type: 'collapsible',
      label: 'Основна інформація',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Адреса',
          required: true,
          admin: {
            placeholder: 'вул. Прикладна 123, Київ',
            rows: 3,
          },
        },
        {
          name: 'addressMapLink',
          type: 'text',
          label: 'Посилання на Google Maps',
          required: true,
          admin: {
            placeholder: 'https://maps.app.goo.gl/...',
          },
          validate: ((value, { siblingData }) => {
            if (typeof value === 'string' && !value.startsWith('http')) {
              return 'Must be a full URL (starts with http)'
            }
            return true
          }) as Validate,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Телефон',
          required: true,
          admin: {
            placeholder: '+380 XX XXX XX XX',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Налаштування відображення',
      fields: [
        {
          name: 'addressLabel',
          type: 'text',
          label: 'Підпис адреси',
          defaultValue: 'Наша адреса',
        },
        {
          name: 'phoneLabel',
          type: 'text',
          label: 'Підпис телефону',
          defaultValue: 'Телефон',
        },
      ],
    },
  ],
}
