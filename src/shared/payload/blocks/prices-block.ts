import type { Block } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';
import { createCollectionReferenceField } from '@/features/payload-admin/fields/collection-reference-field';

export const pricesBlock: Block = {
  slug: BLOCK_TYPES.PRICES,
  labels: {
    singular: 'Секція цін',
    plural: 'Секції цін',
  },
  imageURL: '/blocks/prices.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Ціни',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
    },
    createCollectionReferenceField({
      collectionSlug: 'service-prices',
      title: 'Ціни на послуги',
      description: 'Для редагування цін перейдіть до колекції Service Prices',
      showTable: true,
      columns: [
        { key: 'title', label: 'Назва процедури' },
        { key: 'price', label: 'Ціна' },
        { key: 'serviceId', label: 'Послуга' },
      ],
      pageSize: 10,
    }),
  ],
};
