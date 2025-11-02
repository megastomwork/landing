import type { CollectionConfig } from 'payload'
import { createGlobalReferenceField } from '../fields/global-reference-field'
import { createCollectionReferenceField } from '../fields/collection-reference-field'
import { CONFIG } from '@/shared/constants/config.constants'
import { LIVE_PREVIEW_FLAG } from '@/shared/constants/payload.constants'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => `${CONFIG.SERVER_URL}/${data.path}?${LIVE_PREVIEW_FLAG}=true`,
    }
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва сторінки',
    },
    {
      type: 'tabs',
      tabs: [
        // Content Tab
        {
          label: 'Контент',
          fields: [
            {
              name: 'sections',
              type: 'blocks',
              label: 'Секції',
              blocks: [
                // Hero/Intro Section
                {
                  slug: 'intro',
                  labels: {
                    singular: 'Вступна секція',
                    plural: 'Вступні секції',
                  },
                  imageURL: '/blocks/intro.png',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Зображення',
                      required: true,
                    },
                    {
                      name: 'alt',
                      type: 'text',
                      label: 'Alt текст',
                      defaultValue: 'Зображення',
                    },
                  ],
                },
                // About Section
                {
                  slug: 'about',
                  labels: {
                    singular: 'Секція "Про нас"',
                    plural: 'Секції "Про нас"',
                  },
                  imageURL: '/blocks/about-us.png',
                  fields: [
                    {
                      name: 'showDefaultContent',
                      type: 'checkbox',
                      label: 'Показати стандартний контент',
                      defaultValue: true,
                    },
                  ],
                },
                // Services Section
                {
                  slug: 'services',
                  labels: {
                    singular: 'Секція послуг',
                    plural: 'Секції послуг',
                  },
                  imageURL: '/blocks/services.png',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Заголовок',
                      defaultValue: 'Наші послуги',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Опис',
                    },
                    createCollectionReferenceField({
                      collectionSlug: 'services',
                      title: 'Послуги',
                      description: 'Оберіть конкретні послуги для відображення або залиште порожнім щоб показати всі опубліковані.',
                    }),
                    {
                      name: 'selectedServices',
                      type: 'relationship',
                      relationTo: 'services',
                      hasMany: true,
                      label: 'Обрані послуги',
                      admin: {
                        description: 'Якщо не обрано - показуються всі опубліковані послуги',
                      },
                    },
                    {
                      name: 'displayLimit',
                      type: 'number',
                      label: 'Кількість послуг для відображення',
                      admin: {
                        description: 'Залиште порожнім щоб показати всі',
                      },
                      min: 1,
                    },
                  ],
                },
                // Blog Articles Section
                {
                  slug: 'blogArticles',
                  labels: {
                    singular: 'Секція статей блогу',
                    plural: 'Секції статей блогу',
                  },
                  imageURL: '/blocks/blog-articles.png',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Заголовок',
                      defaultValue: 'Наш блог',
                    },
                    {
                      name: 'articlesCount',
                      type: 'number',
                      label: 'Кількість статей',
                      defaultValue: 3,
                      min: 1,
                      max: 12,
                    },
                    {
                      name: 'showMoreLink',
                      type: 'checkbox',
                      label: 'Показати посилання "Більше"',
                      defaultValue: true,
                    },
                  ],
                },
                // Feedbacks Section
                {
                  slug: 'feedbacks',
                  labels: {
                    singular: 'Секція відгуків',
                    plural: 'Секції відгуків',
                  },
                  imageURL: '/blocks/feedbacks.png',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Заголовок',
                      defaultValue: 'Відгуки наших клієнтів',
                    },
                  ],
                },
                // Contact Section
                {
                  slug: 'contact',
                  labels: {
                    singular: 'Секція контактів',
                    plural: 'Секції контактів',
                  },
                  imageURL: '/blocks/contact.png',
                  fields: [
                    createGlobalReferenceField({
                      globalSlug: 'contacts',
                      title: 'Контактна інформація',
                      fields: ['phone', 'email', 'address'],
                      fieldLabels: {
                        phone: 'Телефон',
                        email: 'Email',
                        address: 'Адреса',
                      },
                    }),
                    createGlobalReferenceField({
                      globalSlug: 'workingHours',
                      title: 'Робочі години',
                      fields: ['schedule'],
                      fieldLabels: {
                        schedule: 'Розклад',
                      },
                    }),
                    {
                      name: 'showImage',
                      type: 'checkbox',
                      label: 'Показати зображення',
                      defaultValue: true,
                    },
                  ],
                },
                // Description Section
                {
                  slug: 'description',
                  labels: {
                    singular: 'Текстова секція',
                    plural: 'Текстові секції',
                  },
                  imageURL: '/blocks/description.png',
                  fields: [
                    {
                      name: 'text',
                      type: 'textarea',
                      label: 'Текст',
                      required: true,
                    },
                  ],
                },
                // Doctors Section
                {
                  slug: 'doctors',
                  labels: {
                    singular: 'Секція лікарів',
                    plural: 'Секції лікарів',
                  },
                  imageURL: '/blocks/doctors.png',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Заголовок',
                      defaultValue: 'Наші лікарі',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Опис',
                    },
                  ],
                },
                // Blog Hero Section
                {
                  slug: 'blogHero',
                  labels: {
                    singular: 'Герой секція блогу',
                    plural: 'Герой секції блогу',
                  },
                  imageURL: '/blocks/blog-hero.png',
                  fields: [
                    {
                      name: 'backgroundImage',
                      type: 'upload',
                      relationTo: 'media',
                      label: 'Фонове зображення',
                    },
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Заголовок',
                      defaultValue: 'Блог',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Опис',
                    },
                  ],
                },
                // FAQ Section
                {
                  slug: 'faq',
                  labels: {
                    singular: 'Секція питань',
                    plural: 'Секції питань',
                  },
                  imageURL: '/blocks/faq.png',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Заголовок',
                      defaultValue: 'Часті питання',
                    },
                  ],
                },
                // Prices Section
                {
                  slug: 'prices',
                  labels: {
                    singular: 'Секція цін',
                    plural: 'Секції цін',
                  },
                  imageURL: '/blocks/prices.png',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Заголовок',
                      defaultValue: 'Ціни',
                    },
                    {
                      name: 'description',
                      type: 'textarea',
                      label: 'Опис',
                    },
                  ],
                },
                // Contact Info Section (with map)
                {
                  slug: 'contactInfo',
                  labels: {
                    singular: 'Розширена контактна секція',
                    plural: 'Розширені контактні секції',
                  },
                  imageURL: '/blocks/contact-info.png',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Заголовок',
                      defaultValue: 'Контактна інформація',
                    },
                    {
                      name: 'showMap',
                      type: 'checkbox',
                      label: 'Показати карту',
                      defaultValue: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        // SEO Tab
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
            },
            {
              name: 'metaKeywords',
              type: 'text',
              label: 'Meta Keywords',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'OG Image (для соц. мереж)',
            },
          ],
        },
        // Settings Tab
        {
          label: 'Налаштування',
          fields: [
            {
              name: 'path',
              type: 'text',
              label: 'Шлях сторінки',
              required: true,
              unique: true,
              admin: {
                description: 'Наприклад: /blog або /about. Обов\'язково починається з /',
              },
              validate: (value: string) => {
                if (!value.startsWith('/')) {
                  return 'Шлях повинен починатись з /'
                }
                if (value.includes(' ')) {
                  return 'Шлях не може містити пробіли'
                }
                return true
              },
            },
            {
              name: 'status',
              type: 'select',
              label: 'Статус',
              options: [
                { label: 'Чернетка', value: 'draft' },
                { label: 'Опубліковано', value: 'published' },
              ],
              defaultValue: 'draft',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
