import { GROUPS_LABELS } from '@/shared/payload/constants/groups';
import type { CollectionConfig } from 'payload';

/**
 * Users Collection
 *
 * @description
 * Collection for CMS admin users with authentication.
 * Manages access to the Payload CMS admin panel.
 *
 * @translation Колекція користувачів адмін-панелі
 *
 * @features
 * - Built-in Payload authentication (email + password)
 * - Admin panel access control
 * - User roles and permissions
 * - Secure password hashing
 * - Optional user name field
 *
 * @auth
 * - Email-based authentication enabled
 * - Password field automatically added by Payload
 * - Login/logout functionality
 *
 * @access Controlled by Payload's built-in auth system
 */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Користувач',
    plural: 'Користувачі',
  },
  admin: {
    useAsTitle: 'email',
    group: GROUPS_LABELS.SETTINGS,
    description: 'Користувачі адмін-панелі',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: "Ім'я",
      admin: {
        description: "Ім'я користувача (опціонально)",
        placeholder: 'Наприклад: Іван Петренко',
      },
    },
  ],
};
