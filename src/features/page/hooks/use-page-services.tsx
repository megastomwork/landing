import { useQuery } from '@tanstack/react-query'
import payloadAPI from '@/shared/lib/payload-rest'
import type { Service } from '@/shared/payload/payload-types'

interface UsePageServicesParams {
  selectedServices?: (number | Service)[] | null
  displayLimit?: number | null
}

export const usePageServices = ({ selectedServices, displayLimit }: UsePageServicesParams) => {
  return useQuery({
    queryKey: ['page-services', selectedServices, displayLimit],
    queryFn: async () => {
      // If specific services are selected
      if (selectedServices && selectedServices.length > 0) {
        const serviceIds = selectedServices
          .map((s) => (typeof s === 'number' ? s : s.id))
          .filter(Boolean)

        return payloadAPI.getCollection<Service>('services', {
          where: {
            id: {
              in: serviceIds,
            },
            status: {
              equals: 'published',
            },
          },
          limit: displayLimit || 100,
        })
      }

      // Otherwise get all published services
      return payloadAPI.getCollection<Service>('services', {
        where: {
          status: {
            equals: 'published',
          },
        },
        limit: displayLimit || 100,
      })
    },
  })
}
