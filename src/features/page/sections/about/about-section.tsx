'use client'

import AboutImageBlock from './about-image-block'
import AboutTextBlock from './about-text-block'

interface AboutSectionProps {
  showDefaultContent?: boolean | null
}

export function AboutSection({ showDefaultContent }: AboutSectionProps) {
  if (!showDefaultContent) {
    return null
  }

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-2 px-4 py-5 md:grid-cols-2">
        <AboutImageBlock />
        <AboutTextBlock />
      </div>
    </section>
  )
}
