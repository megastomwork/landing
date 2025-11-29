import { GROUPS_LABELS } from '@/shared/payload/constants/groups'
import type { CollectionConfig, Validate } from 'payload'

/**
 * Socials Collection
 *
 * @description
 * Collection for social media links and profiles.
 * Each entry includes platform name, link, and custom icon.
 *
 * @translation Колекція соціальних мереж
 *
 * @features
 * - Social media links with custom icons
 * - Support for any social platform (Instagram, Facebook, Telegram, etc.)
 * - Displayed in header, footer, and contact sections
 * - URL validation for links
 *
 * @examples
 * - title: "Instagram", link: "https://instagram.com/clinic", icon: instagram.svg
 * - title: "Facebook", link: "https://facebook.com/clinic", icon: facebook.svg
 * - title: "Telegram", link: "https://t.me/clinic", icon: telegram.svg
 *
 * @validation
 * - Link must be a valid URL starting with http:// or https://
 *
 * @access Public read access for all social links
 */
export const Socials: CollectionConfig = {
  slug: 'socials',
  label: 'Соціальні мережі',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: GROUPS_LABELS.CALL,
    description: 'Посилання на соціальні мережі клініки',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Назва платформи',
      required: true,
      admin: {
        description: 'Назва соціальної мережі або месенджера',
        placeholder: 'Наприклад: Instagram, Facebook, Telegram',
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Посилання',
      required: true,
      admin: {
        description: 'Повне посилання на профіль у соціальній мережі',
        placeholder: 'Наприклад: https://instagram.com/your_clinic',
      },
      validate: ((value: unknown) => {
        if (typeof value === 'string' && !value.startsWith('http://') && !value.startsWith('https://')) {
          return 'Посилання повинно починатися з http:// або https://'
        }
        return true
      }) as Validate,
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Іконка',
      required: true,
      admin: {
        description: 'Іконка соціальної мережі (рекомендовано SVG, 24x24px або більше)',
      },
    },
  ],
}
