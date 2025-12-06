import { GROUPS_LABELS } from '@/shared/payload/constants/groups';
import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Послуги',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: GROUPS_LABELS.CLINIC,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва послуги',
      required: true,
      admin: {
        description: 'Коротка назва послуги, яка відображатиметься на сайті',
        placeholder: 'Наприклад: Відбілювання зубів, Імплантація',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Опис',
      required: true,
      admin: {
        description: 'Детальний опис послуги для відвідувачів',
        placeholder: 'Опишіть що включає ця послуга, її переваги...',
        rows: 4,
      },
      validate: (value: string | undefined | null) => {
        if (typeof value === 'string' && value.length < 10) {
          return 'Опис повинен містити щонайменше 10 символів';
        }
        return true;
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Іконка',
      required: true,
      admin: {
        description:
          'Завантажте іконку для послуги (рекомендовано SVG або PNG)',
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
        description: 'Тільки опубліковані послуги відображаються на сайті',
      },
    },
  ],
};
