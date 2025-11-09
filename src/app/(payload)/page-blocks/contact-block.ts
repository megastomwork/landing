import type { Block } from 'payload'
import { createGlobalReferenceField, createCollectionReferenceField } from '@/features/payload-admin'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'
import {
  createContactBlockFields,
  contactsGlobalReferenceConfig,
  socialsReferenceConfig
} from '@/shared/payload/schemas/page-blocks/contact-schema'

export const contactBlock: Block = {
  slug: BLOCK_TYPES.CONTACT,
  labels: {
    singular: 'Секція контактів',
    plural: 'Секції контактів',
  },
  imageURL: '/blocks/contact.png',
  fields: [
    ...createContactBlockFields(),
    createGlobalReferenceField(contactsGlobalReferenceConfig),
    createCollectionReferenceField(socialsReferenceConfig),
  ],
}
