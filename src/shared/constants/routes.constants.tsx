export const ROUTES = {
  HOME: '/',
  SERVICES: '/home#services',
  FEEDBACKS: '/home#feedbacks',
  DOCTORS: '/doctors',
  PRICES: '/prices',
  ARTICLES: '/blog',
  ARTICLE_BY_ID: (id: string) => `/blog/${id}`,
};
