'use client';

import { ScrollAnimatedContainer } from '@/shared/components/animations/scroll-animated-container';
import { useDoctors } from '@/features/page/hooks/use-doctors';
import { SectionProps } from '@/shared/types/page.types';
import { DoctorCardList } from './doctor-card-list';
import { DoctorCardGrid } from './doctor-card-grid';
import { cn } from '@/shared/lib/css';

type DoctorsSectionProps = SectionProps<'doctors'>;

export function DoctorsSection({ style = 'list' }: DoctorsSectionProps) {
  const { data: doctors } = useDoctors();

  const isList = style === 'list';
  const isGrid = style === 'grid';

  const DoctorCard = isGrid ? DoctorCardGrid : DoctorCardList;

  return (
    <section
      className={cn('mt-6 max-sm:px-6', isGrid && 'mx-auto w-full max-w-6xl')}
    >
      <div
        className={cn(
          'mb-12',
          isList && 'space-y-6',
          isGrid && 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {doctors?.map((doctor, index) => (
          <ScrollAnimatedContainer
            delay={index < 2 ? index * 0.1 : 0}
            key={doctor.id}
          >
            <DoctorCard {...doctor} />
          </ScrollAnimatedContainer>
        ))}
      </div>
    </section>
  );
}
