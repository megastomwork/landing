import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'
import { createAboutBlockFields } from '@/shared/payload/schemas/page-blocks/about-schema'

export const aboutBlock: Block = {
  slug: BLOCK_TYPES.ABOUT,
  labels: {
    singular: 'Секція "Про нас"',
    plural: 'Секції "Про нас"',
  },
  imageURL: '/blocks/about-us.png',
  fields: createAboutBlockFields(),
}
