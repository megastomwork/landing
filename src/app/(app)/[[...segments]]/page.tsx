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
import type { Page } from '@/shared/payload/payload-types'
import { BLOCK_TYPES } from '@/shared/payload/constants/block-types'
import { ScrollAnimatedContainer } from '@/shared/components/animations/scroll-animated-container'
import { RefreshRouteOnSave } from '@/shared/components/ui-kit/refresh-route-on-save'

type PageSection = NonNullable<Page['sections']>[number]

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

  const renderSection = (section: PageSection, index: number) => {
    const key = section.id || index

    switch (section.blockType) {
      case BLOCK_TYPES.INTRO:
        return <IntroSection key={key} {...section} />
      case BLOCK_TYPES.ABOUT:
        return <AboutSection key={key} {...section} />
      case BLOCK_TYPES.SERVICES:
        return <ServicesSection key={key} {...section} />
      case BLOCK_TYPES.BLOG_ARTICLES:
        return <BlogArticlesSection key={key} {...section} />
      case BLOCK_TYPES.FEEDBACKS:
        return <PageFeedbacksSection key={key} {...section} />
      case BLOCK_TYPES.CONTACT:
        return <PageContactSection key={key} {...section} />
      case BLOCK_TYPES.DESCRIPTION:
        return <DescriptionSection key={key} {...section} />
      case BLOCK_TYPES.PARAGRAPH:
        return <ParagraphSection key={key} {...section} />
      case BLOCK_TYPES.DOCTORS:
        return <DoctorsSection key={key} {...section} />
      case BLOCK_TYPES.BLOG_HERO:
        return <BlogHeroSection key={key} {...section} />
      case BLOCK_TYPES.FAQ:
        return <FaqSection key={key} {...section} />
      case BLOCK_TYPES.PRICES:
        return <PricesSection key={key} {...section} />
      case BLOCK_TYPES.CONTACT_INFO:
        return <ContactInfoSection key={key} {...section} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      <RefreshRouteOnSave />
      {page.sections?.map((section, index) => <ScrollAnimatedContainer key={index}>{renderSection(section, index)}</ScrollAnimatedContainer>)}
    </div>
  )
}
