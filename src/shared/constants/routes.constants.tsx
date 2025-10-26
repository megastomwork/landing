export const ROUTES = {
  HOME: '/home',
  SERVICES: '/home#services',
  FEEDBACKS: '/home#feedbacks',
  DOCTORS: '/doctors',
  PRICES: '/prices',
  ARTICLES: '/blog',
  ARTICLE_BY_ID: (id: string) => `/blog/${id}`,
};
