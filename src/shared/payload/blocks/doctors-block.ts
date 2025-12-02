import type { Block, Field } from 'payload';
import { createCollectionReferenceField } from '@/features/payload-admin';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';

/**
 * Schema for Doctors block
 * No custom fields needed - only displays collection reference UI
 */
export const createDoctorsBlockFields = (): Field[] => [];

/**
 * Configuration for doctors collection reference field
 * Used by createCollectionReferenceField in the block definition
 */
export const doctorsReferenceConfig = {
  collectionSlug: 'doctors' as const,
  title: 'Лікарі',
  showTable: true,
  pageSize: 10,
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
