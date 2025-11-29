import { GROUPS_LABELS } from '@/shared/payload/constants/groups'
import type { CollectionConfig } from 'payload'

/**
 * Doctors Collection
 *
 * @description
 * Collection for clinic staff members (doctors, dentists, managers).
 * Each doctor has a profile with photo, position, and experience.
 *
 * @translation Колекція лікарів та персоналу клініки
 *
 * @features
 * - Staff profiles with photos
 * - Position and experience information
 * - Draft/Published status workflow
 * - Display on dedicated doctors page
 *
 * @access Public read access for all published doctors
 */
export const Doctors: CollectionConfig = {
  slug: 'doctors',
  label: 'Лікарі',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    group: GROUPS_LABELS.CLINIC,
    description: 'Профілі лікарів та персоналу клініки',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Імʼя',
      required: true,
      admin: {
        description: "Повне ім'я лікаря або співробітника",
        placeholder: 'Наприклад: Іван Петренко',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      label: 'Фото',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Професійне фото лікаря (рекомендовано квадратний формат, мінімум 400x400px)',
      },
    },
    {
      name: 'position',
      type: 'text',
      label: 'Посада',
      required: true,
      admin: {
        description: 'Спеціалізація або посада в клініці',
        placeholder: 'Наприклад: Стоматолог-терапевт, Головний лікар, Менеджер',
      },
    },
    {
      name: 'experience',
      type: 'text',
      label: 'Досвід роботи',
      required: true,
      admin: {
        description: 'Скільки років працює лікар',
        placeholder: 'Наприклад: Понад 10 років, 5+ років досвіду',
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
        description: 'Тільки опубліковані профілі відображаються на сайті',
      },
    },
  ],
}
