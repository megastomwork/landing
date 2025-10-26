'use client';

import { useServices } from './hooks/use-services';
import ServicesCarousel from './ui/services-carousel';
import ServicesHeader from './ui/services-header';

export default function ServicesSection() {
  const { services, isServicesLoading } = useServices();

  return (
    <section
      id="services"
      className="mx-auto flex max-w-6xl flex-col items-start px-4 py-4"
    >
      <ServicesHeader />

      {isServicesLoading || !services?.length ? (
        <p>Завантаження...</p>
      ) : (
        <ServicesCarousel services={services} />
      )}
    </section>
  );
}
