import type { Block } from 'payload'
import { createCollectionReferenceField } from '@/features/payload-admin'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'
import {
  createServicesBlockFields,
  servicesReferenceConfig
} from '@/shared/payload/schemas/page-blocks/services-schema'

export const servicesBlock: Block = {
  slug: BLOCK_TYPES.SERVICES,
  labels: {
    singular: 'Секція послуг',
    plural: 'Секції послуг',
  },
  imageURL: '/blocks/services.png',
  fields: [
    ...createServicesBlockFields(),
    createCollectionReferenceField(servicesReferenceConfig),
  ],
}
