import { GROUPS_LABELS } from '@/shared/payload/constants/groups';
import type { CollectionConfig } from 'payload';

/**
 * Media Collection
 *
 * @description
 * Collection for uploaded files (images, documents, etc.).
 * Serves as a media library for all other collections.
 *
 * @translation Колекція медіа-файлів (бібліотека зображень та документів)
 *
 * @features
 * - Centralized media library
 * - File upload support for images, PDFs, etc.
 * - Alt text for accessibility and SEO
 * - Automatic file storage via S3 or local filesystem
 * - Referenced by other collections (articles, doctors, services, etc.)
 *
 * @validation
 * - Alt text recommended for all images (for accessibility)
 *
 * @access Public read access for all media files
 */
export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Файл',
    plural: 'Медіа',
  },
  admin: {
    group: GROUPS_LABELS.SETTINGS,
    description: 'Бібліотека зображень та файлів',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt текст',
      admin: {
        description:
          'Опис зображення для доступності та SEO (рекомендовано для всіх зображень)',
        placeholder: 'Наприклад: Фото стоматологічного кабінету',
      },
    },
  ],
  upload: {
    // Generate optimized image sizes on upload
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: undefined, // Maintain aspect ratio
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1200,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1440,
        height: undefined,
        position: 'centre',
      },
    ],
    filesRequiredOnCreate: false,
    mimeTypes: ['image/*'],
  },
};
