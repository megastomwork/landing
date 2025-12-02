import type { Field } from 'payload';

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
