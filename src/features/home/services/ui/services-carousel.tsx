import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPointCounters,
  CarouselPrevious,
} from '@/shared/components/ui-kit/carousel';
import { Services } from '@/shared/types/services.types';
import ServicesCard from './services-card';
import { useAdvancedCarousel } from '@/shared/hooks/use-advanced-carousel';

const START_INDEX = 0;

export default function ServicesCarousel({
  services,
}: {
  services: Services[];
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
                className={`flex items-center md:basis-1/2 lg:basis-1/3`}
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
