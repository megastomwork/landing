import type { Block, Field } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';

/**
 * Schema for Intro 2 block
 * Intro with title and description
 */
export const createIntro2BlockFields = (): Field[] => [
  {
    name: 'title',
    type: 'text',
    label: 'Заголовок',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Опис',
  },
];

export const intro2Block: Block = {
  slug: BLOCK_TYPES.INTRO_2,
  labels: {
    singular: 'Вступна секція (Intro 2)',
    plural: 'Вступні секції (Intro 2)',
  },
  imageURL: '/blocks/intro-2.png',
  fields: createIntro2BlockFields(),
};
