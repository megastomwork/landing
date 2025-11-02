'use client'

import AboutSection from '@/features/home/about/about-section'

interface AboutSectionProps {
  showDefaultContent?: boolean | null
}

export function PageAboutSection({ showDefaultContent }: AboutSectionProps) {
  if (!showDefaultContent) {
    return null
  }

  return <AboutSection />
}
