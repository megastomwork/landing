'use client'
import { CONFIG } from '@/shared/constants/client-config.constants'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter()

  console.log(CONFIG.SERVER_URL);
  console.log('w:', window?.location?.origin);

  return (
    <PayloadLivePreview
      refresh={() => {
        console.log('test', CONFIG.SERVER_URL);
        console.log('w2:', window?.location?.origin);
        router.refresh();
      }}
      serverURL={CONFIG.SERVER_URL}
    />
  )
}
