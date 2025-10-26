export const CONFIG = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL as string,
} as const;

if (!CONFIG.BACKEND_URL) {
  throw new Error('BACKEND_URL is not defined');
}
