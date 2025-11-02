'use client';

import { ScrollAnimatedContainer } from '@/shared/components/animations/scroll-animated-container';
import { FadeLoadingContainer } from '@/shared/components/animations/fade-loading-container';
import { DoctorItemCard } from './ui/doctor-card';
import { useDoctors } from './hooks/use-doctors';
import { useContent } from '@/shared/hooks/use-content';
import { ContentTextDoctorsPage } from '@/shared/types/content.types';
import { Markdown } from '@/shared/components/ui-kit/markdown';

export function DoctorsPage() {
  const doctors = useDoctors();
  const content = useContent<ContentTextDoctorsPage>({
    context: 'doctorsPage',
  });

  return (
    <div className="mt-6 max-sm:px-6">
      <ScrollAnimatedContainer delay={0}>
        <h2 className="mb-4 text-center">{content?.data?.pageTitle}</h2>
      </ScrollAnimatedContainer>
      <ScrollAnimatedContainer delay={0.05}>
        <div className="mx-auto mb-12 max-w-[840px] text-center text-[14px] leading-[24px] sm:text-base lg:text-xl">
          <Markdown markdown={content?.data?.pageDescription ?? ''} />
        </div>
      </ScrollAnimatedContainer>
      <FadeLoadingContainer isLoading={doctors.isLoading}>
        <div className="mb-12 space-y-6">
          {doctors.data?.map((d, index) => (
            <ScrollAnimatedContainer
              delay={index < 2 ? index * 0.1 : 0}
              key={d.id}
            >
              <DoctorItemCard {...d} />
            </ScrollAnimatedContainer>
          ))}
        </div>
      </FadeLoadingContainer>
    </div>
  );
}
