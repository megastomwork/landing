import type { Block } from 'payload'
import { createCollectionReferenceField } from '@/features/payload-admin'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'
import {
  createDoctorsBlockFields,
  doctorsReferenceConfig,
} from '@/shared/payload/schemas/page-blocks/doctors-schema'

export const doctorsBlock: Block = {
  slug: BLOCK_TYPES.DOCTORS,
  labels: {
    singular: 'Секція лікарів',
    plural: 'Секції лікарів',
  },
  imageURL: '/blocks/doctors.png',
  fields: [
    ...createDoctorsBlockFields(),
    createCollectionReferenceField(doctorsReferenceConfig),
  ],
}
