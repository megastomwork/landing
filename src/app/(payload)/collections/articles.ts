import { CONFIG } from '@/shared/constants/client-config.constants'
import { LIVE_PREVIEW_FLAG } from '@/shared/constants/payload.constants'
import { GROUPS_LABELS } from '@/shared/payload/constants/groups'
import type { CollectionConfig } from 'payload'

/**
 * Articles Collection
 *
 * @description
 * Collection for blog articles/posts with rich text content.
 * Supports live preview and trash functionality.
 *
 * @translation Колекція статей блогу
 *
 * @features
 * - Live preview for draft articles
 * - Trash/restore functionality
 * - Rich text editor for content
 * - Cover image support
 * - Draft/Published status workflow
 *
 * @access Public read access for all articles
 */
export const Articles: CollectionConfig = {
  slug: 'articles',
  label: 'Статті',
  trash: true,
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: GROUPS_LABELS.PAGES,
    description: 'Статті та публікації блогу',
    livePreview: {
      url: ({ data }) => `/blog/${data.id}?${LIVE_PREVIEW_FLAG}=true`,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
      admin: {
        description: 'Заголовок статті, який відображається на сторінці та в списку статей',
        placeholder: 'Наприклад: Як правильно доглядати за зубами',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Обкладинка',
      required: true,
      admin: {
        description: 'Головне зображення статті (рекомендовано 1200x630px)',
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
      admin: {
        position: 'sidebar',
        description: 'Тільки опубліковані статті відображаються на сайті',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Контент',
      required: true,
      admin: {
        description: 'Основний текст статті з можливістю форматування',
      },
    },
  ],
}
