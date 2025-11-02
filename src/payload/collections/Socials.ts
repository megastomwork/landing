import type { CollectionConfig } from 'payload'

export const Socials: CollectionConfig = {
  slug: 'socials',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'username',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: {
        description: 'Lucide icon name',
      },
    },
  ],
}
