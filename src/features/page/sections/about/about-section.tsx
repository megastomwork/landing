'use client'

import AboutImageBlock from './about-image-block'
import AboutTextBlock from './about-text-block'
import type { Media } from '@/shared/payload/payload-types'

interface Stat {
  value: string
  label: string
  id?: string
}

interface AboutSectionProps {
  title: string
  description: string
  image: (number | null) | Media
  stats?: Stat[]
}

export function AboutSection({ title, description, image, stats }: AboutSectionProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-2 px-4 py-5 md:grid-cols-2">
        <AboutImageBlock image={image} />
        <AboutTextBlock title={title} description={description} stats={stats} />
      </div>
    </section>
  )
}
