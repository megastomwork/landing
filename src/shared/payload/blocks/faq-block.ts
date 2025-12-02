import type { Block } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';
import { createCollectionReferenceField } from '@/features/payload-admin/fields/collection-reference-field';

export const faqBlock: Block = {
  slug: BLOCK_TYPES.FAQ,
  labels: {
    singular: 'Секція питань',
    plural: 'Секції питань',
  },
  imageURL: '/blocks/faq.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      defaultValue: 'Часті питання',
    },
    createCollectionReferenceField({
      collectionSlug: 'questions',
      title: 'Питання',
      description: 'Для редагування питань перейдіть до колекції Questions',
      showTable: true,
      columns: [
        { key: 'question', label: 'Питання' },
        { key: 'answer', label: 'Відповідь' },
      ],
      pageSize: 10,
    }),
  ],
};
