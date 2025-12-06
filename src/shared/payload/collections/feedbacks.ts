import { GROUPS_LABELS } from '@/shared/payload/constants/groups';
import { StarRatingField } from '@/features/payload-admin';
import type { CollectionConfig } from 'payload';

/**
 * Feedbacks Collection
 *
 * @description
 * Collection for customer reviews and testimonials with star ratings.
 * Includes custom star rating field component for better UX.
 *
 * @translation Колекція відгуків пацієнтів
 *
 * @features
 * - Customer testimonials with star ratings (1-5)
 * - Custom star rating field UI component
 * - Content length validation (min 10 chars)
 * - Draft/Published status workflow
 * - Client name privacy options (full name or initials)
 *
 * @validation
 * - Stars: required, 1-5 range
 * - Content: required, minimum 10 characters
 *
 * @access Public read access for all published feedbacks
 */
export const Feedbacks: CollectionConfig = {
  slug: 'feedbacks',
  labels: {
    singular: 'Відгук',
    plural: 'Відгуки',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'clientName',
    group: GROUPS_LABELS.REPUTATION,
    description: 'Відгуки та testimonials пацієнтів',
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      label: "Ім'я пацієнта",
      required: true,
      admin: {
        description: "Повне ім'я або ініціали пацієнта",
        placeholder: 'Наприклад: Іван Петренко або І.П.',
      },
    },
    {
      name: 'stars',
      type: 'number',
      label: 'Оцінка',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Оберіть кількість зірок від 1 до 5',
        components: {
          Field: {
            path: '@/features/payload-admin/components/star-rating-field#StarRatingField',
          },
        },
      },
      validate: (value: number) => {
        if (typeof value === 'number' && (value < 1 || value > 5)) {
          return 'Оцінка має бути від 1 до 5 зірок';
        }
        return true;
      },
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Відгук',
      required: true,
      admin: {
        description: 'Текст відгуку пацієнта про лікування',
        placeholder: 'Введіть відгук пацієнта...',
        rows: 5,
      },
      validate: (value: string) => {
        if (typeof value === 'string' && value.length < 10) {
          return 'Відгук повинен містити щонайменше 10 символів';
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
      admin: {
        position: 'sidebar',
        description: 'Тільки опубліковані відгуки відображаються на сайті',
      },
    },
  ],
};
