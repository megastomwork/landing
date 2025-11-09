import type { Field } from 'payload'

/**
 * Schema for Intro block
 * Defines the data structure as a contract
 */
export const createIntroBlockFields = (): Field[] => [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Зображення',
    required: true,
  },
  {
    name: 'alt',
    type: 'text',
    label: 'Alt текст',
    defaultValue: 'Зображення',
  },
]
