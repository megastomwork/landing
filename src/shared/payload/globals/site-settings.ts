import type { GlobalConfig, Validate } from 'payload'

export const siteSettings: GlobalConfig = {
  slug: 'siteSettings',
  label: 'Налаштування сайту',

  admin: {
    description: 'Глобальні налаштування хедера, футера та навігації',
    group: 'Налаштування',
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        // Tab 1: Navigation
        {
          label: 'Навігація',
          description: 'Логотип та меню сайту',
          fields: [
            // Logo fields
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

            // Menu items array
            {
              type: 'collapsible',
              label: 'Навігаційне меню',
              admin: {
                initCollapsed: false,
              },
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
          ],
        },

        // Tab 2: Contact button
        {
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
            {
              type: 'collapsible',
              label: 'Блок контактів',
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'showContactsInFooter',
                  type: 'checkbox',
                  label: 'Показувати блок контактів',
                  defaultValue: true,
                  admin: {
                    description: 'Адреса та телефон з Global "Contacts"',
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Години роботи',
              admin: {
                initCollapsed: false,
              },
              fields: [
                {
                  name: 'showWorkingHours',
                  type: 'checkbox',
                  label: 'Показувати години роботи',
                  defaultValue: true,
                  admin: {
                    description: 'Дані з Global "Working Hours"',
                  },
                },
                {
                  name: 'workingHoursTitle',
                  type: 'text',
                  label: 'Заголовок',
                  defaultValue: 'Часи роботи',
                  admin: {
                    condition: (data, siblingData) => siblingData?.showWorkingHours === true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
