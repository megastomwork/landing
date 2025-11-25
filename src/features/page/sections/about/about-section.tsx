'use client'

import AboutImageBlock from './about-image-block'
import AboutTextBlock from './about-text-block'
import MissionBlock from './mission-block'
import { SectionProps } from '@/shared/types/page.types'

type AboutSectionProps = SectionProps<'about'>

export function AboutSection({ title, description, image, stats }: AboutSectionProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-2 px-4 py-5 md:grid-cols-2">
        <AboutImageBlock image={image} />
        <AboutTextBlock title={title} description={description} stats={stats} />
      </div>
      <MissionBlock />
    </section>
  )
}
