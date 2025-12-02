import type { Block, Field } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';

/**
 * Schema for Intro 1 block
 * Intro with image
 */
export const createIntro1BlockFields = (): Field[] => [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Зображення',
    required: true,
  },
];

export const intro1Block: Block = {
  slug: BLOCK_TYPES.INTRO_1,
  labels: {
    singular: 'Вступна секція (Intro 1)',
    plural: 'Вступні секції (Intro 1)',
  },
  imageURL: '/blocks/intro-1.png',
  fields: createIntro1BlockFields(),
};
