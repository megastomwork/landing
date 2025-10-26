import { CarouselApi } from '@/shared/components/ui-kit/carousel';
import { useEffect, useState } from 'react';

export const useCarouselProgress = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(0);

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

    onScroll(api);
    api.on('scroll', onScroll);
    api.on('reInit', onScroll);

    return () => {
      api.off('scroll', onScroll);
      api.off('reInit', onScroll);
    };
  }, [api]);

  return { api, setApi, progress };
};
