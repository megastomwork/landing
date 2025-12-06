import type { Block } from 'payload';
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types';
import { createCollectionReferenceField } from '@/features/payload-admin/fields/collection-reference-field';

/**
 * Blog Grid with FAQ block
 * Combines blog grid (2/3 width) and FAQ (1/3 width) in a single section
 */
export const blogGridWithFaqBlock: Block = {
  slug: BLOCK_TYPES.BLOG_GRID_WITH_FAQ,
  labels: {
    singular: 'Blog Grid з FAQ',
    plural: 'Blog Grid з FAQ',
  },
  imageURL: '/blocks/blog-grid-with-faq.png',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Blog Grid',
          description: 'Налаштування секції блогу (2/3 ширини)',
          fields: [
            {
              name: 'blogTitle',
              type: 'text',
              label: 'Заголовок',
              defaultValue: 'Наш блог',
            },
            {
              name: 'buttonText',
              type: 'text',
              label: 'Текст кнопки',
              defaultValue: 'Більше статей',
            },
            createCollectionReferenceField({
              collectionSlug: 'articles',
              title: 'Статті',
              description:
                'Для редагування статей перейдіть до колекції Articles',
              showTable: true,
              columns: [
                { key: 'title', label: 'Назва статті' },
                { key: 'status', label: 'Статус' },
              ],
              pageSize: 5,
            }),
          ],
        },
        {
          label: 'FAQ',
          description: 'Налаштування секції FAQ (1/3 ширини)',
          fields: [
            {
              name: 'faqTitle',
              type: 'text',
              label: 'Заголовок',
              defaultValue: 'Часті питання',
            },
            createCollectionReferenceField({
              collectionSlug: 'questions',
              title: 'Питання',
              description:
                'Оберіть питання для відображення або залиште порожнім щоб показати всі',
              showTable: true,
              columns: [
                { key: 'question', label: 'Питання' },
                { key: 'answer', label: 'Відповідь' },
              ],
              pageSize: 10,
            }),
          ],
        },
      ],
    },
  ],
};
