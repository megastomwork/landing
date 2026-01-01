'use client';

import { PageContent } from '@/features/page/components/page-content';
import { usePage, useTriggerModalOnScroll } from '@/features/page';
import { notFound } from 'next/navigation';
import { use, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import payloadAPI from '@/shared/lib/payload-rest';
import type { Doctor, Question, Service } from '@/shared/payload/payload-types';
import type { Contact } from '@/shared/types/contact.types';
import type { Social } from '@/shared/types/socials.types';

type PageProps = {
  params: Promise<{
    segments?: string[];
  }>;
};

export default function Page({ params }: PageProps) {
  const { segments } = use(params);
  const path = segments ? `/${segments.join('/')}` : '/';

  useTriggerModalOnScroll({
    isEnabled: path === '/',
  });

  const { data: page, isLoading } = usePage(path);

  if (isLoading) {
    return null;
  }

  if (!page) {
    return notFound();
  }

  return <PageContent page={page} />;
}
