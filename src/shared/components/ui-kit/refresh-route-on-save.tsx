'use client';
import { CONFIG } from '@/shared/constants/client-config.constants';
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter();

  return (
    <PayloadLivePreview
      refresh={() => {
        router.refresh();
      }}
      serverURL={CONFIG.SERVER_URL || ''}
    />
  );
};
