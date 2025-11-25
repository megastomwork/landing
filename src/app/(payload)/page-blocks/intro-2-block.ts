import type { Block } from 'payload'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'
import { createIntro2BlockFields } from '@/shared/payload/schemas/page-blocks/intro-2-schema'

export const intro2Block: Block = {
  slug: BLOCK_TYPES.INTRO_2,
  labels: {
    singular: 'Вступна секція (Intro 2)',
    plural: 'Вступні секції (Intro 2)',
  },
  imageURL: '/blocks/intro-2.png',
  fields: createIntro2BlockFields(),
}
