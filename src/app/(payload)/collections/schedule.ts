import type { CollectionConfig } from 'payload'

export const Schedule: CollectionConfig = {
  slug: 'schedule',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'days',
  },
  fields: [
    {
      name: 'days',
      type: 'text',
      required: true,
    },
    {
      name: 'hours',
      type: 'text',
      required: true,
    },
  ],
}
