'use client'

import { usePageArticles } from '@/features/page/hooks/use-page-articles'
import { SectionProps } from '@/shared/types/page.types'
import Link from 'next/link'
import { ArticleCard } from './components/article-card'

type BlogArticlesSectionProps = SectionProps<'blogArticles'>

export function BlogArticlesSection({
  title,
  articlesCount,
  showMoreLink,
}: BlogArticlesSectionProps) {
  const { data: articles, isLoading } = usePageArticles({ articlesCount })

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-8">
        <p>Loading articles...</p>
      </section>
    )
  }

  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {title && <h2 className="mb-8 text-3xl font-bold">{title}</h2>}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {showMoreLink && (
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
          >
            More articles
          </Link>
        </div>
      )}
    </section>
  )
}
