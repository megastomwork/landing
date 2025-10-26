'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { domAnimation } from 'framer-motion';
import { LazyMotion } from 'framer-motion';
import React, { Suspense } from 'react';
import { queryClient } from '@/shared/lib/query-client';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <Suspense fallback={null}>{children}</Suspense>
      </LazyMotion>
    </QueryClientProvider>
  );
}
