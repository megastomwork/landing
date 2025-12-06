import type { CollectionConfig } from 'payload';
import { LIVE_PREVIEW_FLAG } from '@/shared/constants/payload.constants';
import { GROUPS_LABELS } from '@/shared/payload/constants/groups';
import {
  intro1Block,
  intro2Block,
  aboutBlock,
  servicesBlock,
  blogGridBlock,
  blogRowBlock,
  feedbacksBlock,
  contactBlock,
  descriptionBlock,
  paragraphBlock,
  doctorsBlock,
  blogHeroBlock,
  faqBlock,
  pricesBlock,
  contactInfoBlock,
  blogGridWithFaqBlock,
} from '@/shared/payload/blocks';

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Сторінка',
    plural: 'Сторінки',
  },
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
    group: GROUPS_LABELS.PAGES,
    description: 'Сторінки сайту з динамічними секціями',
    livePreview: {
      url: ({ data }) =>
        `${data.path === '/' ? '' : data.path}?${LIVE_PREVIEW_FLAG}=true`,
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва сторінки',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Контент',
          fields: [
            {
              name: 'sections',
              type: 'blocks',
              label: 'Секції',
              blocks: [
                intro1Block,
                intro2Block,
                aboutBlock,
                servicesBlock,
                blogGridBlock,
                blogRowBlock,
                feedbacksBlock,
                contactBlock,
                descriptionBlock,
                paragraphBlock,
                doctorsBlock,
                blogHeroBlock,
                faqBlock,
                pricesBlock,
                contactInfoBlock,
                blogGridWithFaqBlock,
              ],
            },
          ],
        },
        {
          label: 'Налаштування',
          fields: [
            {
              name: 'path',
              type: 'text',
              label: 'Шлях сторінки',
              required: true,
              unique: true,
              admin: {
                description:
                  "Наприклад: /blog або /about. Обов'язково починається з /",
              },
              validate: (value: string | null | undefined) => {
                if (!value) return true;
                if (!value.startsWith('/')) {
                  return 'Шлях повинен починатись з /';
                }
                if (value.includes(' ')) {
                  return 'Шлях не може містити пробіли';
                }
                return true;
              },
            },
            {
              name: 'status',
              type: 'select',
              label: 'Статус',
              options: [
                { label: 'Чернетка', value: 'draft' },
                { label: 'Опубліковано', value: 'published' },
              ],
              defaultValue: 'draft',
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
