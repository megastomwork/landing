import { ArticlePage } from "@/features/article";
import { getPayload } from 'payload'
import config from '@payload-config'
import { LIVE_PREVIEW_FLAG } from '@/shared/constants/payload.constants'

type PageProps = {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params
  const resolvedSearchParams = await searchParams

  const isPreviewMode = LIVE_PREVIEW_FLAG in resolvedSearchParams

  const payload = await getPayload({ config })
  const articles = await payload.find({
    collection: 'articles',
    where: {
      id: { equals: id }
    },
    limit: 1,
    draft: isPreviewMode,
    trash: isPreviewMode,
  })

  const article = articles.docs?.[0]

  return <ArticlePage article={article} />
}
