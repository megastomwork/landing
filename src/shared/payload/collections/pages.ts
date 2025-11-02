import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
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
                    {
                      name: 'showImage',
                      type: 'checkbox',
                      label: 'Показати зображення',
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
