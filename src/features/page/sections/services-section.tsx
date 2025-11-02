'use client'

import type { Service } from '@/shared/payload/payload-types'
import type { Services } from '@/shared/types/services.types'
import { usePageServices } from '@/features/page/hooks/use-page-services'
import ServicesCarousel from '@/features/home/services/ui/services-carousel'

// Adapter to convert Payload Service to Services type
function adaptService(service: Service): Services {
  return {
    id: String(service.id),
    status: service.status || 'draft',
    Icon: service.Icon || '',
    IconImage: typeof service.IconImage === 'object' && service.IconImage?.url
      ? service.IconImage.url
      : '',
    Title: service.Title,
    Description: service.Description,
  }
}

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

  // Adapt services for the component
  const adaptedServices = services.map(adaptService)

  return (
    <section
      id="services"
      className="mx-auto flex max-w-6xl flex-col items-start px-4 py-4"
    >
      <div className="mb-8">
        {title && <h2 className="mb-4 text-3xl font-bold">{title}</h2>}
        {description && <p className="text-gray-600">{description}</p>}
      </div>

      <ServicesCarousel services={adaptedServices} />
    </section>
  )
}
