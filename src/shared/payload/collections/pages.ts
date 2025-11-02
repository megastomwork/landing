import type { CollectionConfig } from 'payload'
import { CONFIG } from '@/shared/constants/config.constants'
import { LIVE_PREVIEW_FLAG } from '@/shared/constants/payload.constants'
import {
  introBlock,
  aboutBlock,
  servicesBlock,
  blogArticlesBlock,
  feedbacksBlock,
  contactBlock,
  descriptionBlock,
  paragraphBlock,
  doctorsBlock,
  blogHeroBlock,
  faqBlock,
  pricesBlock,
  contactInfoBlock,
} from '@/shared/payload/page-blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => `${CONFIG.SERVER_URL}/${data.path}?${LIVE_PREVIEW_FLAG}=true`,
    }
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
        // Content Tab
        {
          label: 'Контент',
          fields: [
            {
              name: 'sections',
              type: 'blocks',
              label: 'Секції',
              blocks: [
                introBlock,
                aboutBlock,
                servicesBlock,
                blogArticlesBlock,
                feedbacksBlock,
                contactBlock,
                descriptionBlock,
                paragraphBlock,
                doctorsBlock,
                blogHeroBlock,
                faqBlock,
                pricesBlock,
                contactInfoBlock,
              ],
            },
          ],
        },
        // SEO Tab
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
            },
            {
              name: 'metaKeywords',
              type: 'text',
              label: 'Meta Keywords',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'OG Image (для соц. мереж)',
            },
          ],
        },
        // Settings Tab
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
                description: 'Наприклад: /blog або /about. Обов\'язково починається з /',
              },
              validate: (value: string | null | undefined) => {
                if (!value) return true
                if (!value.startsWith('/')) {
                  return 'Шлях повинен починатись з /'
                }
                if (value.includes(' ')) {
                  return 'Шлях не може містити пробіли'
                }
                return true
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
}
