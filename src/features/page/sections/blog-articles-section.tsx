'use client'

import type { Article } from '@/shared/payload/payload-types'
import { usePageArticles } from '@/features/page/hooks/use-page-articles'
import Link from 'next/link'
import { PayloadImage } from '@/shared/components/ui-kit/directus-image'

interface BlogArticlesSectionProps {
  title?: string | null
  articlesCount?: number | null
  showMoreLink?: boolean | null
}

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
        {articles.map((article) => {
          const image = typeof article.image === 'number' ? null : article.image

          return (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="group overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
            >
              {image && (
                <div className="aspect-video overflow-hidden">
                  <PayloadImage
                    src={image}
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
          )
        })}
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
