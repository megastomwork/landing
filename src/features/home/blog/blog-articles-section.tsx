'use client';

import { useArticles } from '@/features/blog/hooks/use-articles';
import BlogArticleList from './ui/blog-article-list';
import BlogMoreLink from './ui/blog-more-link';
import BlogSectionTitle from './ui/blog-section-title';

export default function BlogArticlesSection() {
  const articles = useArticles();
  const visibleArticles = articles.data?.slice(0, 3);

  return (
    <section className="mx-auto hidden w-full max-w-6xl flex-col items-start px-4 py-4 sm:block">
      <BlogSectionTitle />
      <BlogArticleList articles={visibleArticles ?? []} />
      <BlogMoreLink />
    </section>
  );
}
