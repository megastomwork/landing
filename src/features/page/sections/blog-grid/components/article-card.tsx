import Link from 'next/link';
import { PayloadImage } from '@/shared/components/ui-kit/payload-image';
import type { Article, Media } from '@/shared/payload/payload-types';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const image =
    typeof article.image === 'number' ? null : (article.image as Media | null);

  return (
    <Link
      key={article.id}
      href={`/blog/${article.id}`}
      className="group overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
    >
      {image && (
        <div className="aspect-video overflow-hidden">
          <PayloadImage
            src={image.url}
            alt={article.title}
            width={400}
            height={250}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold">{article.title}</h3>
      </div>
    </Link>
  );
}
