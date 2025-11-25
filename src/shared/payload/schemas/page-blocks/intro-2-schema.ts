import type { Field } from 'payload'

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
]
