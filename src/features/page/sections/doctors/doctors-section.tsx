'use client';

import { ScrollAnimatedContainer } from '@/shared/components/animations/scroll-animated-container';
import { useDoctors } from '@/features/page/hooks/use-doctors';
import { SectionProps } from '@/shared/types/page.types';
import { DoctorItemCard } from './doctor-card';
import { Markdown } from '@/shared/components/ui-kit/markdown';

type DoctorsSectionProps = SectionProps<'doctors'>;

export function DoctorsSection({}: DoctorsSectionProps) {
  const { data: doctors } = useDoctors();

  return (
    <section className="mt-6 max-sm:px-6">
      <div className="mb-12 space-y-6">
        {doctors?.map((doctor, index) => (
          <ScrollAnimatedContainer
            delay={index < 2 ? index * 0.1 : 0}
            key={doctor.id}
          >
            <DoctorItemCard {...doctor} />
          </ScrollAnimatedContainer>
        ))}
      </div>
    </section>
  );
}
