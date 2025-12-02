import type { Block } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';

export const blogGridBlock: Block = {
  slug: BLOCK_TYPES.BLOG_GRID,
  labels: {
    singular: 'Секція статей блогу (Grid)',
    plural: 'Секції статей блогу (Grid)',
  },
  imageURL: '/blocks/blog-grid.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Наш блог',
    },
    {
      name: 'articlesCount',
      type: 'number',
      label: 'Кількість статей',
      defaultValue: 3,
      min: 1,
      max: 12,
    },
    {
      name: 'showMoreLink',
      type: 'checkbox',
      label: 'Показати посилання "Більше"',
      defaultValue: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Текст кнопки',
      defaultValue: 'Більше статей',
    },
  ],
};
