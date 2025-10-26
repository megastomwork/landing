import { Button } from '@/shared/components/ui-kit/button';
import { ROUTES } from '@/shared/constants/routes.constants';
import Link from 'next/link';

type ErrorPageProps = {
  statusCode: number;
  message: string;
  buttonText?: string;
  buttonLink?: string;
};

export function ErrorPage({
  statusCode,
  message,
  buttonText = 'На головну',
  buttonLink = ROUTES.HOME,
}: ErrorPageProps) {
  return (
    <section className="mt-20 flex h-screen w-screen justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">{statusCode}</h1>
        <p className="text-lg">{message}</p>
        <Button variant="secondary" size="sm" asChild>
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
}
