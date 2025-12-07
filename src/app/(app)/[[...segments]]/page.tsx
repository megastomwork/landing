'use client';

import { PageContent } from '@/features/page/components/page-content';
import { usePage } from '@/features/page/hooks/use-page';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import payloadAPI from '@/shared/lib/payload-rest';
import type { Doctor, Question, Service } from '@/shared/payload/payload-types';
import type { Contact } from '@/shared/types/contact.types';
import type { Social } from '@/shared/types/socials.types';
import { GlobalPageLoader } from '@/shared/components/loaders';

type PageProps = {
  params: Promise<{
    segments?: string[];
  }>;
};

export default function Page({ params }: PageProps) {
  const { segments } = use(params);
  const path = segments ? `/${segments.join('/')}` : '/';
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const queryClient = useQueryClient();

  // Prefetch all data in parallel
  useEffect(() => {
    const prefetchAll = async () => {
      try {
        await Promise.all([
          // Page data
          queryClient.prefetchQuery({
            queryKey: ['page', path],
            queryFn: async () => {
              const pages = await payloadAPI.getCollection('pages', {
                'where[path][equals]': path,
                'where[status][equals]': 'published',
                limit: 1,
              });
              return pages[0] || null;
            },
          }),
          // Services
          queryClient.prefetchQuery({
            queryKey: ['services'],
            queryFn: () =>
              payloadAPI.getCollection<Service>('services', {
                where: {
                  status: {
                    equals: 'published',
                  },
                },
              }),
          }),
          // Doctors
          queryClient.prefetchQuery({
            queryKey: ['doctors'],
            queryFn: () =>
              payloadAPI.getCollection<Doctor>('doctors', {
                where: {
                  status: {
                    equals: 'published',
                  },
                },
              }),
          }),
          // Questions
          queryClient.prefetchQuery({
            queryKey: ['questions'],
            queryFn: () => payloadAPI.getCollection<Question>('questions'),
          }),
          // Contacts
          queryClient.prefetchQuery({
            queryKey: ['contacts'],
            queryFn: () => payloadAPI.getGlobal<Contact>('contacts'),
          }),
          // Socials
          queryClient.prefetchQuery({
            queryKey: ['socials'],
            queryFn: () => payloadAPI.getCollection<Social>('socials'),
          }),
        ]);
      } catch (error) {
        console.error('Error prefetching data:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    prefetchAll();
  }, [path, queryClient]);

  const { data: page } = usePage(path);

  if (isInitialLoading) {
    return <GlobalPageLoader />;
  }

  if (!page) {
    return notFound();
  }

  return <PageContent page={page} />;
}
