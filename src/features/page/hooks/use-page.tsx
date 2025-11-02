import { useQuery } from '@tanstack/react-query'
import payloadAPI from '@/shared/lib/payload-rest'
import type { Page } from '@/shared/payload/payload-types'

export const usePage = (path: string) => {
  return useQuery({
    queryKey: ['page', path],
    queryFn: async () => {
      const pages = await payloadAPI.getCollection<Page>('pages', {
        where: {
          path: {
            equals: path,
          },
          status: {
            equals: 'published',
          },
        },
        limit: 1,
      })

      return pages[0] || null
    },
  })
}
