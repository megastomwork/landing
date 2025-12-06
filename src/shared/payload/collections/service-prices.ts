import { GROUPS_LABELS } from '@/shared/payload/constants/groups';
import type { CollectionConfig } from 'payload';

/**
 * Service Prices Collection
 *
 * @description
 * Collection for individual service pricing entries.
 * Each price entry is linked to a service from the Services collection.
 *
 * @translation Колекція цін на послуги
 *
 * @features
 * - Detailed pricing for specific procedures
 * - Relationship to Services collection
 * - Flexible price format (text field for "від 1000 грн", "за домовленістю", etc.)
 * - Multiple price entries per service (different procedures)
 *
 * @examples
 * - title: "Консультація", price: "500 грн", serviceId: "Стоматологія"
 * - title: "Установка імпланту", price: "від 8000 грн", serviceId: "Імплантація"
 * - title: "Професійна чистка", price: "800 грн", serviceId: "Гігієна"
 *
 * @access Public read access for all prices
 */
export const ServicePrices: CollectionConfig = {
  slug: 'service-prices',
  labels: {
    singular: 'Ціна',
    plural: 'Ціни на послуги',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: GROUPS_LABELS.CLINIC,
    description: 'Детальний прайс-лист послуг',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва процедури',
      required: true,
      admin: {
        description: 'Конкретна процедура або вид послуги',
        placeholder: 'Наприклад: Консультація лікаря, Установка пломби',
      },
    },
    {
      name: 'price',
      type: 'text',
      label: 'Ціна',
      required: true,
      admin: {
        description: 'Вартість процедури (можна вказати діапазон або текст)',
        placeholder: 'Наприклад: 500 грн, від 1000 грн, за домовленістю',
      },
    },
    {
      name: 'serviceId',
      type: 'relationship',
      relationTo: 'services',
      label: 'Послуга',
      required: true,
      admin: {
        description: 'Оберіть послугу, до якої відноситься ця ціна',
      },
    },
  ],
};
