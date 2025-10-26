import { CarouselApi } from '@/shared/components/ui-kit/carousel';
import { useEffect, useState } from 'react';

export const useAdvancedCarousel = (initialActiveIndex = 0) => {
  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onScroll = (emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      const scrollProgress = emblaApi.scrollProgress();
      const p = (scrollProgress - Math.floor(scrollProgress)) * 100;
      setProgress(p);
    };

    const onSelect = (emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      const slideCount = emblaApi.scrollSnapList().length;
      if (slideCount === 0) return;

      setActiveIndex(emblaApi.selectedScrollSnap() % slideCount);
    };

    api.on('scroll', onScroll);
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    api.on('reInit', onScroll);

    // Workaround for startIndex with loop: true
    api.scrollTo(initialActiveIndex, true);
    onSelect(api);

    return () => {
      api.off('scroll', onScroll);
      api.off('select', onSelect);
      api.off('reInit', onSelect);
      api.off('reInit', onScroll);
    };
  }, [api, initialActiveIndex]);

  return { setApi, progress, activeIndex };
};
