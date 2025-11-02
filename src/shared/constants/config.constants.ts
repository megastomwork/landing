export const CONFIG = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
  SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
} as const;

// Legacy Directus check (can be removed after migration)
// if (!CONFIG.BACKEND_URL) {
//   throw new Error('BACKEND_URL is not defined');
// }
