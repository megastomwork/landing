'use client'

import type { Service } from '@/shared/payload/payload-types'
import { usePageServices } from '@/features/page/hooks/use-page-services'
import ServicesCarousel from '@/features/home/services/ui/services-carousel'
import { Markdown } from '@/shared/components/ui-kit/markdown'
import { adaptService } from './adapters'

interface ServicesSectionProps {
  title?: string | null
  description?: string | null
  selectedServices?: (number | Service)[] | null
  displayLimit?: number | null
}

export function ServicesSection({
  title,
  description,
  selectedServices,
  displayLimit,
}: ServicesSectionProps) {
  const { data: services, isLoading } = usePageServices({
    selectedServices,
    displayLimit,
  })

  if (isLoading) {
    return (
      <section className="mx-auto flex max-w-6xl flex-col items-start px-4 py-4">
        <p>Loading services...</p>
      </section>
    )
  }

  if (!services || services.length === 0) {
    return null
  }

  const adaptedServices = services.map(adaptService)

  return (
    <section
      id="services"
      className="mx-auto flex max-w-6xl flex-col items-start px-4 py-4"
    >
      <div className="mb-8">
        {title &&  <h2 className="relative mb-6 text-3xl font-bold md:text-6xl">
          {title}
          <span className="absolute bottom-[-6px] left-0 h-1 w-[70px] rounded-full bg-cyan-400" />
        </h2>}
        {description && (
          <div className="text-gray-600">
            <Markdown markdown={description} />
          </div>
        )}
      </div>

      <ServicesCarousel services={adaptedServices} />
    </section>
  )
}
