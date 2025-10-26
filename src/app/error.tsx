'use client';

import { ErrorPage } from '@/features/error-pages';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);
  reset?.();

  return <ErrorPage statusCode={500} message="Сталася помилка" />;
}
