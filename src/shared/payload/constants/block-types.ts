/**
 * Page block type slugs (identifiers)
 *
 * ⚠️ WARNING: DO NOT CHANGE THESE VALUES!
 * These slugs are stored in the database and changing them will break existing content.
 * You can safely refactor constant names, file names, and component names,
 * but the slug values must remain unchanged.
 *
 * Format: kebab-case
 * Structure: {purpose}-{domain} or {purpose}
 * Examples: blog-grid, hero-intro, contact-form
 */
export const BLOCK_TYPES = {
  INTRO_1: 'intro-1',
  INTRO_2: 'intro-2',
  ABOUT: 'about',
  SERVICES: 'services',
  BLOG_GRID: 'blog-grid',
  BLOG_ROW: 'blog-row',
  FEEDBACKS: 'feedbacks',
  CONTACT: 'contact',
  DESCRIPTION: 'description',
  PARAGRAPH: 'paragraph',
  DOCTORS: 'doctors',
  BLOG_HERO: 'blog-hero',
  FAQ: 'faq',
  PRICES: 'prices',
  CONTACT_INFO: 'contact-info',
  WORKING_HOURS: 'working-hours',
  BLOG_GRID_WITH_FAQ: 'blog-grid-with-faq',
} as const;

export type BlockType = (typeof BLOCK_TYPES)[keyof typeof BLOCK_TYPES];
