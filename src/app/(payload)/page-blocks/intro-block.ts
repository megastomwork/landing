import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'
import { createIntroBlockFields } from '@/shared/payload/schemas/page-blocks/intro-schema'

export const introBlock: Block = {
  slug: BLOCK_TYPES.INTRO,
  labels: {
    singular: 'Вступна секція',
    plural: 'Вступні секції',
  },
  imageURL: '/blocks/intro.png',
  fields: createIntroBlockFields(),
}
