import type { Block, Field } from 'payload';
import { CollectionReferenceFieldOptions, createCollectionReferenceField } from '@/features/payload-admin';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';

/**
 * Schema for Doctors block
 */
export const createDoctorsBlockFields = (): Field[] => [
  {
    name: 'style',
    type: 'select',
    label: 'Стилістика',
    defaultValue: 'list',
    options: [
      {
        label: 'Список',
        value: 'list',
      },
      {
        label: 'Сітка',
        value: 'grid',
      },
    ],
    admin: {
      description: 'Оберіть стиль відображення лікарів',
    },
  },
];

/**
 * Configuration for doctors collection reference field
 * Used by createCollectionReferenceField in the block definition
 */
export const doctorsReferenceConfig: CollectionReferenceFieldOptions = {
  collectionSlug: 'doctors' as const,
  reorderable: true,
  title: 'Лікарі',
  showTable: true,
  pageSize: 10,
  paginationType: 'load-more',
  columns: [
    { key: 'name', label: "Ім'я" },
    { key: 'position', label: 'Посада' },
    { key: 'experience', label: 'Досвід' },
    { key: 'status', label: 'Статус' },
  ],
};

export const doctorsBlock: Block = {
  slug: BLOCK_TYPES.DOCTORS,
  labels: {
    singular: 'Секція лікарів',
    plural: 'Секції лікарів',
  },
  imageURL: '/blocks/doctors.png',
  fields: [
    ...createDoctorsBlockFields(),
    createCollectionReferenceField(doctorsReferenceConfig),
  ],
};
