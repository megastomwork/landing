'use client'

import { usePageArticles } from '@/features/page/hooks/use-page-articles'
import { ArticleItem } from '@/shared/components/ui-kit/article'
import { ROUTES } from '@/shared/constants/routes.constants'
import { SectionProps } from '@/shared/types/page.types'
import Link from 'next/link'

type BlogArticlesSectionProps = SectionProps<'blogArticles'>

export function BlogArticlesSection({
  title,
  articlesCount = 3,
  showMoreLink = true,
  buttonText = 'Більше статей',
}: BlogArticlesSectionProps) {
  const { data: articles, isLoading } = usePageArticles({ articlesCount })

  if (isLoading || !articles || articles.length === 0) {
    return null
  }

  return (
    <section className="mx-auto hidden w-full max-w-6xl flex-col items-start px-4 py-4 sm:block">
      {title && (
        <h2 className="relative mb-6 text-6xl font-bold">
          {title}
          <span className="absolute bottom-0 left-0 mt-1 h-1 w-[100px] rounded-md bg-cyan-400" />
        </h2>
      )}

      <div className="grid w-full grid-cols-1 items-stretch justify-stretch gap-4 sm:grid-cols-2 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleItem
            key={article.id}
            article={article}
            className="min-w-[280px] max-w-[356px] rounded-2xl bg-cyan-100 p-4"
          />
        ))}
      </div>

      {showMoreLink && (
        <div className="mt-8 flex w-full justify-center">
          <Link
            href={ROUTES.ARTICLES}
            className="inline-block rounded-full bg-[#CCF2F4] px-6 py-3 font-bold text-black transition-colors duration-300 hover:bg-[#80E1FF]"
          >
            {buttonText}
          </Link>
        </div>
      )}
    </section>
  )
}
