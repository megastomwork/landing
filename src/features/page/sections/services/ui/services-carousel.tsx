import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPointCounters,
  CarouselPrevious,
} from '@/shared/components/ui-kit/carousel';
import ServicesCard from './services-card';
import { useAdvancedCarousel } from '@/shared/hooks/use-advanced-carousel';
import { Service } from '@/shared/payload/payload-types';

const START_INDEX = 0;

export default function ServicesCarousel({
  services,
}: {
  services: Service[];
}) {
  const { setApi, activeIndex } = useAdvancedCarousel(START_INDEX);

  return (
    <Carousel
      opts={{
        loop: true,
        align: 'start',
      }}
      setApi={setApi}
      className="w-full flex-col items-center justify-stretch *:w-full"
    >
      <CarouselPointCounters
        activeIndex={activeIndex}
        total={services.length}
        className="mb-3"
      />

      <div className="relative w-full md:flex md:px-16">
        <CarouselContent className="w-full">
          {services.map(service => {
            return (
              <CarouselItem
                key={service.id}
                className={`flex items-center md:basis-1/2 lg:basis-1/3 max-md:justify-center`}
              >
                <ServicesCard service={service} />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="absolute left-0 top-1/2 flex h-full w-full -translate-y-1/2 items-center justify-between p-0 max-md:hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </div>
    </Carousel>
  );
}
