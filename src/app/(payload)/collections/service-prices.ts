import type { CollectionConfig } from 'payload'

export const ServicePrices: CollectionConfig = {
  slug: 'service-prices',
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
      name: 'price',
      type: 'text',
      required: true,
    },
    {
      name: 'serviceId',
      type: 'relationship',
      relationTo: 'services',
      required: true,
    },
  ],
}
