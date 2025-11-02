'use client';

import { Button } from '@/shared/components/ui-kit/button';
import { ROUTES } from '@/shared/constants/routes.constants';
import { cn } from '@/shared/lib/css';
import { getPayloadImageUrl } from '@/shared/lib/payload-image';
import type { Article } from '@/shared/payload/payload-types';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleItemProps {
  article: Article;
  className?: string;
}

export const ArticleItem = ({ article, className }: ArticleItemProps) => {
  return (
    <div
      className={cn(
        'flex h-full w-full max-w-[356px] flex-col items-center rounded-[1.25rem] bg-[#CCF2F4] p-4',
        className,
      )}
    >
      <div>
        <Image
          src={getPayloadImageUrl(article.image)}
          width={3300}
          height={150}
          alt={article.title || 'Article image'}
          className="h-[200px] rounded-xl object-cover"
        />
      </div>
      <span className="mb-3 mt-2 line-clamp-2 text-center font-bold">
        {article.title}
      </span>
      <Button variant="white" asChild>
        <Link href={ROUTES.ARTICLE_BY_ID(String(article.id))}>Детальніше</Link>
      </Button>
    </div>
  );
};
