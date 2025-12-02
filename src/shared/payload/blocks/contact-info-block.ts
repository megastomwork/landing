import type { Block } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';

export const contactInfoBlock: Block = {
  slug: BLOCK_TYPES.CONTACT_INFO,
  labels: {
    singular: 'Розширена контактна секція',
    plural: 'Розширені контактні секції',
  },
  imageURL: '/blocks/contact-info.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Контактна інформація',
    },
    {
      name: 'showMap',
      type: 'checkbox',
      label: 'Показати карту',
      defaultValue: true,
    },
  ],
};
