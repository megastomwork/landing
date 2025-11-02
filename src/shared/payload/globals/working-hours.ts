import type { GlobalConfig } from 'payload'

export const WorkingHours: GlobalConfig = {
  slug: 'workingHours',
  label: 'Робочі години',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'schedule',
      type: 'array',
      label: 'Розклад',
      required: true,
      fields: [
        {
          name: 'days',
          type: 'text',
          label: 'Дні',
          required: true,
          admin: {
            placeholder: 'Наприклад: Пн-Пт',
          },
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Години',
          required: true,
          admin: {
            placeholder: 'Наприклад: 9:00 - 18:00',
          },
        },
      ],
    },
  ],
}
