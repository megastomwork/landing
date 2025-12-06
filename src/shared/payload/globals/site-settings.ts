import { DescriptionSection } from '@/features/page';
import {
  createCollectionReferenceField,
  createGlobalReferenceField,
} from '@/features/payload-admin';
import type { GlobalConfig, Validate } from 'payload';
import { GROUPS_LABELS } from '../constants/groups';

/**
 * Site Settings Global Configuration
 *
 * @description
 * Global singleton for site-wide layout settings (header, footer, menu).
 * Organized in tabs for better UX.
 *
 * @translation Глобальні налаштування макету сайту
 *
 * @features
 * - Menu configuration (navigation items for header and footer)
 * - Header settings (logo, contact button, visibility)
 * - Footer settings (menu title, contacts, working hours)
 * - Tab-based organization for clarity
 * - Validation for menu paths (must start with /)
 *
 * @tabs
 * 1. Menu - Navigation menu items (used in header and footer)
 * 2. Header - Header configuration (logo, contact button, visibility)
 * 3. Footer - Footer configuration (menu title, contacts, schedule)
 *
 * @validation
 * - Menu paths must start with /
 * - Maximum 10 menu items
 *
 * @usage
 * - Referenced in layout components (Header, Footer)
 * - Single source of truth for navigation
 *
 * @access Global settings accessible throughout the site
 */
export const siteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Layout',

  admin: {
    description: 'Глобальні налаштування хедера, футера та навігації',
    group: GROUPS_LABELS.SETTINGS,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        // Tab 1: Main menu
        {
          label: 'Меню',
          description: 'Навігаційне меню відображається в хедері та футері',
          fields: [
            {
              name: 'menuItems',
              type: 'array',
              label: 'Пункти меню',
              minRows: 1,
              maxRows: 10,
              admin: {
                description: 'Використовується в хедері та футері',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Назва',
                      required: true,
                      admin: {
                        placeholder: 'Головна',
                      },
                    },
                    {
                      name: 'path',
                      type: 'text',
                      label: 'Шлях',
                      required: true,
                      admin: {
                        placeholder: '/',
                      },
                      validate: ((value: unknown) => {
                        if (
                          typeof value === 'string' &&
                          !value.startsWith('/')
                        ) {
                          return 'Шлях має починатися з /';
                        }
                        return true;
                      }) as Validate,
                    },
                  ],
                },
              ],
            },
          ],
        },

        // Tab 2: Header
        {
          label: 'Хедер',
          description: 'Логотип та меню сайту',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'logo',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Логотип',
                  required: true,
                  admin: {
                    description: 'SVG або PNG (рекомендовано SVG для чіткості)',
                  },
                },
              ],
            },

            {
              type: 'collapsible',
              admin: {
                initCollapsed: false,
                description: 'Налаштування кнопки контакту',
              },
              label: "Кнопка зв'язку",
              fields: [
                {
                  name: 'contactButtonText',
                  type: 'text',
                  label: 'Текст кнопки',
                  defaultValue: "Зв'язатись з нами",
                  required: true,
                  admin: {
                    description: 'Відображається в хедері та мобільному меню',
                  },
                },
              ],
            },

            createGlobalReferenceField({
              // TODO: add description about display place (mobile header)
              globalSlug: 'contacts',
              title: 'Контакти',
              fields: ['address', 'phone'],
            }),

            createCollectionReferenceField({
              collectionSlug: 'socials',
              title: 'Соціальні мережі',
              description: 'Відображаються в мобільній версії херера',
              showTable: true,
              columns: [
                {
                  key: 'title',
                  label: 'Назва',
                },
                {
                  key: 'link',
                  label: 'Посилання',
                },
              ],
              pageSize: 10,
            }),
          ],
        },

        // Tab 3: Footer
        {
          label: 'Футер',
          description: 'Налаштування футера',
          fields: [
            {
              name: 'footerMenuTitle',
              type: 'text',
              label: 'Заголовок меню',
              defaultValue: 'Меню:',
              admin: {
                description: 'Текст над пунктами меню у футері',
              },
            },
            createGlobalReferenceField({
              globalSlug: 'contacts',
              title: 'Контакти',
              fields: ['address', 'phone'],
            }),
            createCollectionReferenceField({
              collectionSlug: 'schedule',
              title: 'Години роботи',
              description: 'Графік роботи клініки',
              showTable: true,
              columns: [
                {
                  key: 'days',
                  label: 'Дні',
                },
                {
                  key: 'hours',
                  label: 'Години',
                },
              ],
              pageSize: 10,
            }),
          ],
        },
      ],
    },
  ],
};
