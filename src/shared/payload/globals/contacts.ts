import type { GlobalConfig, Validate } from 'payload'
import { GROUPS_LABELS } from '../constants/groups'

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

  admin: {
    description: 'Clinic contact information',
    group: GROUPS_LABELS.CALL,
  },

  fields: [
    {
      type: 'collapsible',
      label: 'Основна інформація',
      admin: {
        initCollapsed: false,
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
          name: 'addressMapLink',
          type: 'text',
          label: 'Посилання на Google Maps',
          required: true,
          admin: {
            placeholder: 'https://maps.app.goo.gl/...',
          },
          validate: ((value, { siblingData }) => {
            if (typeof value === 'string' && !value.startsWith('http')) {
              return 'Must be a full URL (starts with http)'
            }
            return true
          }) as Validate,
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
      ],
    },
    {
      type: 'collapsible',
      label: 'Налаштування відображення',
      fields: [
        {
          name: 'addressLabel',
          type: 'text',
          label: 'Підпис адреси',
          defaultValue: 'Наша адреса',
        },
        {
          name: 'phoneLabel',
          type: 'text',
          label: 'Підпис телефону',
          defaultValue: 'Телефон',
        },
      ],
    },
  ],
}
