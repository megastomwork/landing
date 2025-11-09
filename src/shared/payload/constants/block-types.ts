export const BLOCK_TYPES = {
  INTRO: 'intro',
  ABOUT: 'about',
  SERVICES: 'services',
  BLOG_ARTICLES: 'blogArticles',
  FEEDBACKS: 'feedbacks',
  CONTACT: 'contact',
  DESCRIPTION: 'description',
  PARAGRAPH: 'paragraph',
  DOCTORS: 'doctors',
  BLOG_HERO: 'blogHero',
  FAQ: 'faq',
  PRICES: 'prices',
  CONTACT_INFO: 'contactInfo',
} as const;

export type BlockType = (typeof BLOCK_TYPES)[keyof typeof BLOCK_TYPES];
