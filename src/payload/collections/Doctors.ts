import type { CollectionConfig } from 'payload'

export const Doctors: CollectionConfig = {
  slug: 'doctors',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'experience',
      type: 'text',
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
