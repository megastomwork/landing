'use client'

import { notFound, useParams } from 'next/navigation'
import { usePage } from '@/features/page/hooks/use-page'
import {
  IntroSection,
  PageAboutSection,
  ServicesSection,
  BlogArticlesSection,
  PageFeedbacksSection,
  PageContactSection,
  DescriptionSection,
  DoctorsSection,
  BlogHeroSection,
  FaqSection,
  PricesSection,
  ContactInfoSection,
} from '@/features/page/sections'

export default function Page() {
  const params = useParams()
  const segments = params.segments as string[] | undefined

  // Build path from segments
  const path = segments ? `/${segments.join('/')}` : '/'

  const { data: page, isLoading, error } = usePage(path)

  // Show 404 if page not found or is draft
  if (!isLoading && (!page || page.status === 'draft')) {
    notFound()
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Error loading page</p>
      </div>
    )
  }

  if (!page) {
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Render page sections */}
      {page.sections?.map((section, index) => {
        const key = section.id || index

        switch (section.blockType) {
          case 'intro':
            return <IntroSection key={key} {...section} />

          case 'about':
            return <PageAboutSection key={key} {...section} />

          case 'services':
            return <ServicesSection key={key} {...section} />

          case 'blogArticles':
            return <BlogArticlesSection key={key} {...section} />

          case 'feedbacks':
            return <PageFeedbacksSection key={key} {...section} />

          case 'contact':
            return <PageContactSection key={key} {...section} />

          case 'description':
            return <DescriptionSection key={key} {...section} />

          case 'doctors':
            return <DoctorsSection key={key} {...section} />

          case 'blogHero':
            return <BlogHeroSection key={key} {...section} />

          case 'faq':
            return <FaqSection key={key} {...section} />

          case 'prices':
            return <PricesSection key={key} {...section} />

          case 'contactInfo':
            return <ContactInfoSection key={key} {...section} />

          default:
            return null
        }
      })}
    </div>
  )
}
