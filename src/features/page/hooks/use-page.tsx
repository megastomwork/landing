import { useQuery } from '@tanstack/react-query'
import payloadAPI from '@/shared/lib/payload-rest'
import type { Page } from '@/shared/payload/payload-types'
import { isLivePreviewMode } from '@/shared/lib/payload-preview';
import { CONFIG } from '@/shared/constants/client-config.constants';
import { useLivePreview } from '@payloadcms/live-preview-react';

export const usePage = (path: string) => {
  const isLivePreview = isLivePreviewMode();

  const { data, ...rest } = useQuery({
    queryKey: ['page', path],
    queryFn: async () => {
      const pages = await payloadAPI.getCollection<Page>('pages', {
        "where[path][equals]": path,
        ...(!isLivePreview && { "where[status][equals]": "published" }),
        limit: 1,
      })

      return pages[0] || null
    },
  })

  console.log('CONFIG:', CONFIG);
  console.log('isLivePreview:', isLivePreview);
  console.log('data:', data);
  console.log('window.parent:', window.parent !== window ? 'Has parent (in iframe)' : 'No parent (not in iframe)');

  const { data: live, isLoading: isLiveLoading } = useLivePreview<Page>({
    initialData: data ?? {} as Page,
    serverURL: CONFIG.SERVER_URL,
    depth: 2,
  })

  console.log('live:', live)
  console.log('isLiveLoading:', isLiveLoading)

  // Use live data only if it has actual content (id field exists)
  const hasLiveData = live && 'id' in live && live.id
  const resultData = isLivePreview && hasLiveData ? live : data

  console.log('hasLiveData:', hasLiveData)
  console.log('result:', resultData)

  return {
    data: resultData,
    ...rest
  };
}
