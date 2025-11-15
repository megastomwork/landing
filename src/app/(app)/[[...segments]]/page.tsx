'use client'

import { PageContent } from '@/features/page/components/page-content'
import { usePage } from '@/features/page/hooks/use-page'
import { notFound } from 'next/navigation'
import { use } from 'react'

type PageProps = {
  params: Promise<{
    segments?: string[]
  }>
}

export default function Page({ params }: PageProps) {
  const { segments } = use(params)
  const path = segments ? `/${segments.join('/')}` : '/'

  const { data: page, isLoading } = usePage(path)

  if (isLoading) {
    return null
  }

  if (!page) {
    return notFound()
  }

  return <PageContent page={page} />
}
