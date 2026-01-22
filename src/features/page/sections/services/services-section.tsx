'use client';

import type { Service } from '@/shared/payload/payload-types';
import { usePageServices } from '@/features/page/hooks/use-page-services';
import ServicesCarousel from './ui/services-carousel';
import { Markdown } from '@/shared/components/ui-kit/markdown';
import { Underline } from '@/shared/components/ui-kit/underline';

interface ServicesSectionProps {
  title?: string | null;
  description?: string | null;
  services?: (number | Service)[] | null;
  displayLimit?: number | null;
}

export function ServicesSection({
  title,
  description,
  services: selectedServices,
  displayLimit,
}: ServicesSectionProps) {
  const { data: services, isLoading } = usePageServices({
    selectedServices,
    displayLimit,
  });

  if (isLoading) {
    return null;
  }

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section
      id="services"
      className="mx-auto flex max-w-6xl flex-col items-start px-4 py-4"
    >
      <div className="mb-8 w-full">
        {title && (
          <h2 className="relative mb-6 font-bold">
            <Underline variant="accent">{title}</Underline>
          </h2>
        )}
        {description && (
          <div className="text-gray-600">
            <Markdown markdown={description} />
          </div>
        )}
      </div>

      <ServicesCarousel services={services} />
    </section>
  );
}
