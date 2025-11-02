import { ArticleItem } from '@/shared/components/ui-kit/article';
import type { Article } from '@/shared/payload/payload-types';

type Props = {
  articles: Article[];
};

export default function BlogArticleList({ articles }: Props) {
  return (
    <div className="grid w-full grid-cols-1 items-stretch justify-stretch gap-4 sm:grid-cols-2 md:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleItem
          key={index}
          article={article}
          className="min-w-[280px] max-w-[356px] rounded-2xl bg-cyan-100 p-4"
        />
      ))}
    </div>
  );
}
