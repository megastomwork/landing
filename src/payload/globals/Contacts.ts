import type { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'googleAddress',
      type: 'text',
      required: true,
    },
    {
      name: 'addressOnMap',
      type: 'group',
      fields: [
        {
          name: 'type',
          type: 'text',
          defaultValue: 'Point',
        },
        {
          name: 'coordinates',
          type: 'array',
          fields: [
            {
              name: 'coordinate',
              type: 'number',
            },
          ],
        },
      ],
    },
  ],
}
