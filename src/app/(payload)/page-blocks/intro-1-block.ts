import type { Block } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';
import { createIntro1BlockFields } from '@/shared/payload/schemas/page-blocks/intro-1-schema';

export const intro1Block: Block = {
  slug: BLOCK_TYPES.INTRO_1,
  labels: {
    singular: 'Вступна секція (Intro 1)',
    plural: 'Вступні секції (Intro 1)',
  },
  imageURL: '/blocks/intro-1.png',
  fields: createIntro1BlockFields(),
};
