import type { GlobalConfig, Validate } from 'payload';
import { GROUPS_LABELS } from '../constants/groups';
import {
  createCollectionReferenceField,
  createGlobalReferenceField,
} from '@/features/payload-admin';

/**
 * Scroll-Triggered Modal Global Configuration
 *
 * @description
 * Global singleton for configuring scroll-triggered contact modal.
 * Modal appears after user scrolls down and then back up.
 * **IMPORTANT: Modal works ONLY on the homepage (path: "/")**
 *
 * @translation Глобальні налаштування модального вікна зі скролом
 *
 * @features
 * - Content customization (title, description, image)
 * - Scroll trigger configuration (down + up sequence)
 * - Enable/disable toggle
 * - Tab-based organization (Content + Settings)
 * - Displays once per page load (resets on page refresh)
 *
 * @tabs
 * 1. Контент - Modal content (title, description, image)
 * 2. Налаштування - Scroll triggers and enable/disable
 *
 * @triggers
 * Sequential triggers:
 * 1. User scrolls down (scrollDownTrigger % from top)
 * 2. User scrolls back up (scrollUpTrigger % from top)
 * 3. Modal appears
 *
 * @defaults
 * - scrollDownTrigger: 90% (near bottom)
 * - scrollUpTrigger: 10% (near top)
 * - isEnabled: false (disabled by default)
 *
 * @usage
 * - Integrated in contact-modal feature
 * - Works ONLY on homepage ("/")
 * - Shows once per page load
 *
 * @access Global settings accessible throughout the site
 */
export const scrollModal: GlobalConfig = {
  slug: 'scrollModal',
  label: 'Модальне вікно',

  access: {
    read: () => true,
  },

  admin: {
    description:
      'Налаштування модального вікна, що з\'являється при скролі. УВАГА: Модалка працює лише на головній сторінці (шлях "/")',
    group: GROUPS_LABELS.PAGES,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        // Tab 1: Content
        {
          label: 'Контент',
          description: 'Контент модального вікна',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Зображення',
              admin: {
                description:
                  'Зображення для модального вікна (рекомендовано 400x400px)',
              },
            },
            {
              name: 'title',
              type: 'text',
              label: 'Заголовок',
              required: true,
              defaultValue: 'Залишились питання?',
              admin: {
                placeholder: 'Залишились питання?',
                description: 'Основний заголовок модального вікна',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Опис',
              required: true,
              defaultValue: "Зв'яжіться з нами зручним для вас способом",
              admin: {
                rows: 3,
                placeholder: "Зв'яжіться з нами зручним для вас способом",
                description: 'Опис під заголовком',
              },
            },
            {
              type: 'collapsible',
              label: 'Контактна інформація (посилання)',
              admin: {
                initCollapsed: true,
                description:
                  'Контакти та соціальні мережі відображаються з глобальних налаштувань',
              },
              fields: [
                createGlobalReferenceField({
                  globalSlug: 'contacts',
                  title: 'Контакти',
                  fields: ['address', 'phone'],
                  fieldLabels: {
                    address: 'Адреса',
                    phone: 'Телефон',
                  },
                }),
                createCollectionReferenceField({
                  collectionSlug: 'socials',
                  title: 'Соціальні мережі',
                  description: 'Відображаються в модальному вікні',
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
                  pageSize: 5,
                }),
              ],
            },
          ],
        },

        // Tab 2: Settings
        {
          label: 'Налаштування',
          description: 'Налаштування тригерів скролу та видимості',
          fields: [
            {
              name: 'isEnabled',
              type: 'checkbox',
              label: 'Увімкнути модальне вікно',
              defaultValue: false,
              admin: {
                description:
                  'Чи показувати модальне вікно на головній сторінці ("/"). Модалка показується один раз за завантаження сторінки.',
              },
            },
            {
              type: 'collapsible',
              label: 'Тригери скролу',
              admin: {
                initCollapsed: false,
                description: 'Налаштування послідовних тригерів скролу',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'scrollDownTrigger',
                      type: 'number',
                      label: 'Тригер скролу вниз (%)',
                      required: true,
                      defaultValue: 90,
                      min: 0,
                      max: 100,
                      admin: {
                        description:
                          'Відсоток прокрутки від верху сторінки (0-100%). Користувач спочатку повинен проскролити до цього значення.',
                        placeholder: '90',
                        width: '50%',
                      },
                    },
                    {
                      name: 'scrollUpTrigger',
                      type: 'number',
                      label: 'Тригер скролу вгору (%)',
                      required: true,
                      defaultValue: 10,
                      min: 0,
                      max: 100,
                      admin: {
                        description:
                          'Відсоток прокрутки від верху сторінки (0-100%). Після досягнення першого тригера, користувач повинен проскролити до цього значення.',
                        placeholder: '10',
                        width: '50%',
                      },
                    },
                  ],
                },
                {
                  type: 'ui',
                  name: 'scrollTriggersHelp',
                  admin: {
                    components: {
                      Field: {
                        path: '@/features/payload-admin/components/scroll-triggers-help#ScrollTriggersHelp',
                      },
                    },
                  },
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Додаткова інформація',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  type: 'ui',
                  name: 'additionalInfo',
                  admin: {
                    components: {
                      Field: {
                        path: '@/features/payload-admin/components/scroll-modal-info#ScrollModalInfo',
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
