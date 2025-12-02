import type { Block } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';

export const blogHeroBlock: Block = {
  slug: BLOCK_TYPES.BLOG_HERO,
  labels: {
    singular: 'Герой секція блогу',
    plural: 'Герой секції блогу',
  },
  imageURL: '/blocks/blog-hero.png',
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Фонове зображення',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Блог',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
    },
    {
      name: 'showOverlay',
      type: 'checkbox',
      label: 'Показати світлий оверлей',
      defaultValue: false,
      admin: {
        description: 'Вмикає напівпрозорий білий фон поверх зображення для кращої читабельності тексту',
      },
    },
  ],
};
