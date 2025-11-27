'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPointCounters,
  CarouselPrevious,
} from '@/shared/components/ui-kit/carousel';

import { useAdvancedCarousel } from '@/shared/hooks/use-advanced-carousel';
import { SectionProps } from '@/shared/types/page.types';
import autoHeight from 'embla-carousel-auto-height';
import { FeedbackCard } from './ui/feedback-card';
import FeedbackSectionHeader from './ui/feedback-section-header';
import { useFeedbacks } from './hooks/use-feedbacks';

type FeedbacksSectionProps = SectionProps<'feedbacks'>;

export function PageFeedbacksSection({ title }: FeedbacksSectionProps) {
  const { feedbacks, isFeedbacksLoading } = useFeedbacks();
  const { setApi, activeIndex } = useAdvancedCarousel();

  if (isFeedbacksLoading || !feedbacks?.length) return null;

  return (
    <section
      id="feedbacks"
      className="flex w-full flex-col items-center px-4 py-10"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <FeedbackSectionHeader title={title} />

        <Carousel
          className="h-auto w-full max-w-6xl ease-in-out"
          setApi={setApi}
          plugins={[autoHeight()]}
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselPointCounters
            activeIndex={activeIndex}
            total={feedbacks.length}
            className="mb-3"
          />

          <div className="relative w-full md:px-16">
            <CarouselContent className="-ml-4 h-auto items-center transition-[height]">
              {feedbacks.map((f, index) => (
                <CarouselItem
                  key={index}
                  className="flex h-auto w-full flex-col items-center gap-4"
                >
                  <FeedbackCard feedbacks={f} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute top-1/2 right-0 left-0 z-10 hidden h-full -translate-y-1/2 items-center justify-between md:flex">
              <CarouselPrevious className="border-black" />
              <CarouselNext className="border-black" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
