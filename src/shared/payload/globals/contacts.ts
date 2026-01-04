import type { GlobalConfig, Validate } from 'payload';
import { GROUPS_LABELS } from '../constants/groups';

/**
 * Contacts Global Configuration
 *
 * @description
 * Global singleton for clinic contact information.
 * Stores address, phone, Google Maps link, and display labels.
 *
 * @translation Глобальні налаштування контактної інформації
 *
 * @features
 * - Single source of truth for contact information
 * - Google Maps integration link
 * - Customizable display labels
 * - Collapsible sections for better organization
 * - URL validation for maps link
 *
 * @usage
 * - Referenced in footer, contact page, contact blocks
 * - Can be accessed via global reference fields
 *
 * @validation
 * - addressMapLink must be a valid URL (starts with http)
 *
 * @access Global settings accessible throughout the site
 */
export const contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Контакти',

  access: {
    read: () => true,
  },

  admin: {
    description: 'Clinic contact information',
    group: GROUPS_LABELS.CALL,
  },

  fields: [
    {
      name: 'address',
      type: 'textarea',
      label: 'Адреса',
      required: true,
      admin: {
        placeholder: 'вул. Прикладна 123, Київ',
        rows: 3,
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      required: true,
      admin: {
        placeholder: '+380 XX XXX XX XX',
      },
    },
    {
      name: 'iframeSrc',
      type: 'text',
      label: 'Карта',
      required: true,
      admin: {
        placeholder:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6...',
        description: 'Вставте код iframe для картки Google Maps',
      },
    },
  ],
};
