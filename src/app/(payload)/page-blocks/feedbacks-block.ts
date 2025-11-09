import type { Block } from 'payload'
import { createCollectionReferenceField } from '@/features/payload-admin'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'
import {
  createFeedbacksBlockFields,
  feedbacksReferenceConfig
} from '@/shared/payload/schemas/page-blocks/feedbacks-schema'

export const feedbacksBlock: Block = {
  slug: BLOCK_TYPES.FEEDBACKS,
  labels: {
    singular: 'Секція відгуків',
    plural: 'Секції відгуків',
  },
  imageURL: '/blocks/feedbacks.png',
  fields: [
    ...createFeedbacksBlockFields(),
    createCollectionReferenceField(feedbacksReferenceConfig),
  ],
}
