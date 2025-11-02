'use client';

import type { Article } from '@/shared/payload/payload-types';
import { ArticleItem } from '@/shared/components/ui-kit/article';

type ArticleRowProps = {
  articles: Article[];
};

export function ArticleRow({ articles }: ArticleRowProps) {
  return (
    <div className="mb-12">
      <h3 className="text-center">Схожі статті</h3>
      <div className="mt-4 flex gap-4 max-md:flex-wrap max-md:justify-center">
        {articles.slice(0, 3).map((a, i) => (
          <ArticleItem
            key={i}
            article={a}
            className="max-md:w-[45%] max-sm:w-full"
          />
        ))}
      </div>
    </div>
  );
}
