'use client'

import { notFound, useParams } from 'next/navigation'
import { usePage } from '@/features/page/hooks/use-page'
import {
  IntroSection,
  AboutSection,
  ServicesSection,
  BlogArticlesSection,
  PageFeedbacksSection,
  PageContactSection,
  DescriptionSection,
  ParagraphSection,
  DoctorsSection,
  BlogHeroSection,
  FaqSection,
  PricesSection,
  ContactInfoSection,
} from '@/features/page/sections'

const SECTION_COMPONENTS = {
  intro: IntroSection,
  about: AboutSection,
  services: ServicesSection,
  blogArticles: BlogArticlesSection,
  feedbacks: PageFeedbacksSection,
  contact: PageContactSection,
  description: DescriptionSection,
  paragraph: ParagraphSection,
  doctors: DoctorsSection,
  blogHero: BlogHeroSection,
  faq: FaqSection,
  prices: PricesSection,
  contactInfo: ContactInfoSection,
} as const

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
      {page.sections?.map((section, index) => {
        const key = section.id || index
        const SectionComponent = SECTION_COMPONENTS[section.blockType as keyof typeof SECTION_COMPONENTS]

        if (!SectionComponent) {
          return null
        }

        return <SectionComponent key={key} {...section} />
      })}
    </div>
  )
}
