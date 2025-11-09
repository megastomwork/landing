import type { CollectionConfig } from 'payload'

export const Feedbacks: CollectionConfig = {
  slug: 'feedbacks',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'ClientName',
  },
  fields: [
    {
      name: 'ClientName',
      type: 'text',
      required: true,
    },
    {
      name: 'Stars',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'Content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
