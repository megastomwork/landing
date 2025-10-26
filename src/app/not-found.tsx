import { ErrorPage } from '@/features/error-pages';

export default function NotFound() {
  return <ErrorPage statusCode={404} message="Сторінка не знайдена" />;
}
