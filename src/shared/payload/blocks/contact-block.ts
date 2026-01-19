import type { Block, Field } from 'payload';
import {
  createGlobalReferenceField,
  createCollectionReferenceField,
} from '@/features/payload-admin';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';

/**
 * Schema for Contact block base fields
 * Custom reference fields are added in the block definition
 */
export const createContactBlockFields = (): Field[] => [
  {
    name: 'title',
    type: 'text',
    label: 'Заголовок',
    defaultValue: "Зв'яжіться з нами",
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Опис',
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Зображення',
  },
  {
    name: 'showImage',
    type: 'checkbox',
    label: 'Показати зображення',
    defaultValue: true,
  },
];

/**
 * Configuration for contacts global reference
 */
export const contactsGlobalReferenceConfig = {
  globalSlug: 'contacts' as const,
  title: 'Контактна інформація',
  fields: ['phone'] as const,
  fieldLabels: {
    phone: 'Телефон',
  },
};

/**
 * Configuration for socials collection reference
 */
export const socialsReferenceConfig = {
  collectionSlug: 'socials' as const,
  title: 'Соціальні мережі',
  description: 'Для редагування соціальних мереж перейдіть до колекції Socials',
  showTable: true,
  columns: [
    { key: 'title', label: 'Назва' },
    { key: 'link', label: 'Посилання' },
    // { key: 'icon', label: 'Іконка' }, // Currently we cant render this field, because we need to implement image cell. (Currently it shows like [Object Object] in the cell)
  ],
  pageSize: 10,
};

export const contactBlock: Block = {
  slug: BLOCK_TYPES.CONTACT,
  labels: {
    singular: 'Секція контактів',
    plural: 'Секції контактів',
  },
  imageURL: '/blocks/contact.png',
  fields: [
    ...createContactBlockFields(),
    createGlobalReferenceField(contactsGlobalReferenceConfig),
    createCollectionReferenceField(socialsReferenceConfig),
  ],
};
