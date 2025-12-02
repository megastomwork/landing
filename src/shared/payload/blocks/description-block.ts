import type { Block } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';

export const descriptionBlock: Block = {
  slug: BLOCK_TYPES.DESCRIPTION,
  labels: {
    singular: 'Текстова секція',
    plural: 'Текстові секції',
  },
  imageURL: '/blocks/description.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: false,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Текст',
      required: true,
    },
  ],
};
