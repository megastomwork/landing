// Layout tabs include:
// Header
// Footer
// Menu

import { DescriptionSection } from '@/features/page'
import { createCollectionReferenceField, createGlobalReferenceField } from '@/features/payload-admin'
import type { GlobalConfig, Validate } from 'payload'

export const siteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Layout',

  admin: {
    description: 'Глобальні налаштування хедера, футера та навігації',
    group: 'Налаштування',
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
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
              },
              label: "Кнопка зв'язку",
              description: 'Налаштування кнопки контакту',
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
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'showInHeader',
                      type: 'checkbox',
                      label: 'Показувати в хедері (desktop)',
                      defaultValue: true,
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'showInMobileMenu',
                      type: 'checkbox',
                      label: 'Показувати в мобільному меню',
                      defaultValue: false,
                      admin: {
                        width: '50%',
                        description: 'Додатково до соц. мереж',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },

        // Tab 2: Main menu
        {
          label: 'Навігаційне меню',
          description: 'Меню відображається в хедері та футері',
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
                      validate: (value: any) => {
                        if (typeof value === 'string' && !value.startsWith('/')) {
                          return 'Шлях має починатися з /'
                        }
                        return true
                      },
                    },
                  ],
                },
              ],
            },
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
            ...createGlobalReferenceField({
              globalSlug: 'contacts',
              title: 'Години роботи',
              fields: ['address', 'phone']
            }),
            ...createCollectionReferenceField({
              collectionSlug: 'working-hours',
              columns: [
                {
                  key: 'days',
                  label: 'День неділі'
                },
                {
                  key: 'days',
                  label: 'День неділі'
                }
              ],
              title: 'Години роботи',
              pageSize: 10
            })
          ],
        },
      ],
    },
  ],
}
