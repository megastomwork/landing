import type { Block, Field } from 'payload';
import { createCollectionReferenceField } from '@/features/payload-admin';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';

/**
 * Schema for Services block base fields
 * Custom fields (like collection reference) are added in the block definition
 */
export const createServicesBlockFields = (): Field[] => [
  {
    name: 'title',
    type: 'text',
    label: 'Заголовок',
    defaultValue: 'Наші послуги',
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Опис',
  },
  {
    name: 'services',
    type: 'relationship',
    relationTo: 'services',
    hasMany: true,
    label: 'Послуги',
    admin: {
      description:
        'Оберіть конкретні послуги для відображення або залиште порожнім щоб показати всі опубліковані.',
    },
    filterOptions: {
      status: { equals: 'published' },
    },
  },
];

/**
 * DEPRECATED
 * Configuration for services reference field
 * Used by createCollectionReferenceField in the block definition
 */
export const servicesReferenceConfig = {
  collectionSlug: 'services' as const,
  title: 'Послуги',
  description:
    'Оберіть конкретні послуги для відображення або залиште порожнім щоб показати всі опубліковані.',
  showTable: true,
  pageSize: 5,
  columns: [
    { key: 'title', label: 'Заголовок' },
    { key: 'description', label: 'Опис' },
  ],
};

export const servicesBlock: Block = {
  slug: BLOCK_TYPES.SERVICES,
  labels: {
    singular: 'Секція послуг',
    plural: 'Секції послуг',
  },
  imageURL: '/blocks/services.png',
  fields: [...createServicesBlockFields()],
};
