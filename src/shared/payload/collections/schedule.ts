import { GROUPS_LABELS } from '@/shared/payload/constants/groups'
import type { CollectionConfig } from 'payload'

/**
 * Schedule Collection
 *
 * @description
 * Collection for clinic working hours schedule.
 * Allows defining different hours for different days/periods.
 *
 * @translation Колекція графіку роботи клініки
 *
 * @features
 * - Flexible schedule entries (can add multiple records)
 * - Day-specific working hours
 * - Support for different schedules (weekdays, weekends, holidays)
 * - Displayed in footer and contact sections
 *
 * @examples
 * - days: "Понеділок - П'ятниця", hours: "9:00 - 18:00"
 * - days: "Субота", hours: "10:00 - 14:00"
 * - days: "Неділя", hours: "Вихідний"
 *
 * @access Public read access for schedule information
 */
export const Schedule: CollectionConfig = {
  slug: 'schedule',
  label: 'Години роботи',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'days',
    group: GROUPS_LABELS.CALL,
    description: 'Графік роботи клініки',
  },
  fields: [
    {
      name: 'days',
      type: 'text',
      label: 'Дні',
      required: true,
      admin: {
        description: 'День тижня або період (наприклад, Понеділок-П\'ятниця, Субота)',
        placeholder: 'Наприклад: Понеділок - П\'ятниця',
      },
    },
    {
      name: 'hours',
      type: 'text',
      label: 'Години',
      required: true,
      admin: {
        description: 'Години роботи для вказаних днів',
        placeholder: 'Наприклад: 9:00 - 18:00',
      },
    },
  ],
}
