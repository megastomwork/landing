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

  const { data: live } = useLivePreview<Page>({
    initialData: data ?? {} as Page,
    serverURL: CONFIG.SERVER_URL,
    depth: 2,
  })

  console.log('live:', live)
  console.log('result:', isLivePreview && live ? live : data)

  return {
    data: isLivePreview && live ? live : data,
    ...rest
  };
}
