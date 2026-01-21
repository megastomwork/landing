'use client';

import { ROUTES } from '@/shared/constants/routes.constants';
import { SectionProps } from '@/shared/types/page.types';
import { getPayloadImageUrl } from '@/shared/lib/payload-image';
import type { Article } from '@/shared/payload/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import { ArticleItem } from '@/shared/components/ui-kit/article';
import { Button } from '@/shared/components/ui-kit/button';

type BlogRowSectionProps = SectionProps<'blog-row'>;

export function BlogRowSection({
  title,
  articles,
  buttonText = 'Більше статей',
  buttonLink,
}: BlogRowSectionProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const articlesList = articles
    .map(item => (typeof item === 'number' ? null : item))
    .filter((item): item is Article => item !== null);

  if (articlesList.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8">
      {title && (
        <h2 className="relative mb-8 font-bold">
          <span className="relative">
            {title}
            <span className="absolute bottom-0 left-0 mt-1 h-1 w-[100px] rounded-md bg-cyan-400" />
          </span>
        </h2>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {articlesList.map(article => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>

      {buttonLink && (
        <div className="mt-8 flex w-full justify-center">
          <Button asChild>
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
