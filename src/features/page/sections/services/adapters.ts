import type { Service } from '@/shared/payload/payload-types'
import type { Services } from '@/shared/types/services.types'

/**
 * Adapter to convert Payload Service to Services type
 */
export function adaptService(service: Service): Services {
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
