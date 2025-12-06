import type { Block } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';
import { createGlobalReferenceField } from '@/features/payload-admin/fields/global-reference-field';
import { createCollectionReferenceField } from '@/features/payload-admin/fields/collection-reference-field';

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
    createGlobalReferenceField({
      globalSlug: 'contacts',
      title: 'Контакти',
      description:
        'Контактна інформація відображається з глобальних налаштувань',
      fields: ['address', 'phone', 'addressMapLink'],
      fieldLabels: {
        address: 'Адреса',
        phone: 'Телефон',
        addressMapLink: 'Посилання на карту',
      },
    }),
    createCollectionReferenceField({
      collectionSlug: 'schedule',
      title: 'Години роботи',
      description: 'Графік роботи клініки',
      showTable: true,
      columns: [
        { key: 'days', label: 'Дні' },
        { key: 'hours', label: 'Години' },
      ],
      pageSize: 10,
    }),
  ],
};
