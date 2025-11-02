import type { GlobalConfig } from 'payload'

export const Content: GlobalConfig = {
  slug: 'content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navigationMenu',
      type: 'group',
      fields: [
        { name: 'home', type: 'text', required: true },
        { name: 'doctors', type: 'text', required: true },
        { name: 'services', type: 'text', required: true },
        { name: 'feedbacks', type: 'text', required: true },
        { name: 'blog', type: 'text', required: true },
        { name: 'prices', type: 'text', required: true },
      ],
    },
    {
      name: 'homePage',
      type: 'group',
      fields: [
        { name: 'welcomeImage', type: 'upload', relationTo: 'media' },
        { name: 'welcomeDescription', type: 'textarea', required: true },
        { name: 'aboutImage', type: 'upload', relationTo: 'media' },
        { name: 'aboutTitle', type: 'text', required: true },
        { name: 'aboutDescription', type: 'textarea', required: true },
        { name: 'missionTitle', type: 'text', required: true },
        { name: 'missionDescription', type: 'textarea', required: true },
        { name: 'servicesTitle', type: 'text', required: true },
        { name: 'servicesDescription', type: 'textarea', required: true },
        { name: 'ctaTitle', type: 'text', required: true },
        { name: 'ctaDescription', type: 'textarea', required: true },
        { name: 'feedbacksTitle', type: 'text', required: true },
        { name: 'blogTitle', type: 'text', required: true },
        { name: 'blogButton', type: 'text', required: true },
        { name: 'contactTitle', type: 'text', required: true },
      ],
    },
    {
      name: 'doctorsPage',
      type: 'group',
      fields: [
        { name: 'pageTitle', type: 'text', required: true },
        { name: 'pageDescription', type: 'textarea', required: true },
      ],
    },
    {
      name: 'blogPage',
      type: 'group',
      fields: [
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
        { name: 'pageTitle', type: 'text', required: true },
        { name: 'pageDescription', type: 'textarea', required: true },
        { name: 'articlesTitle', type: 'text', required: true },
        { name: 'faqTitle', type: 'text', required: true },
      ],
    },
    {
      name: 'callToActionSection',
      type: 'group',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'pricesPage',
      type: 'group',
      fields: [
        { name: 'pageTitle', type: 'text', required: true },
        { name: 'pageDescription', type: 'textarea', required: true },
      ],
    },
  ],
}
