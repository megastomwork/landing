'use client'

import { ScrollAnimatedContainer } from '@/shared/components/animations/scroll-animated-container'
import { FadeLoadingContainer } from '@/shared/components/animations/fade-loading-container'
import { useDoctors } from '@/features/page/hooks/use-doctors'
import { DoctorItemCard } from './doctor-card'

interface DoctorsSectionProps {
  title?: string | null
  description?: string | null
}

export function DoctorsSection({ title, description }: DoctorsSectionProps) {
  const { data: doctors, isLoading } = useDoctors()

  return (
    <section className="mt-6 max-sm:px-6">
      {title && (
        <ScrollAnimatedContainer delay={0}>
          <h2 className="mb-4 text-center">{title}</h2>
        </ScrollAnimatedContainer>
      )}

      {description && (
        <ScrollAnimatedContainer delay={0.05}>
          <div className="mx-auto mb-12 max-w-[840px] text-center text-[14px] leading-[24px] sm:text-base lg:text-xl">
            <p>{description}</p>
          </div>
        </ScrollAnimatedContainer>
      )}

      <FadeLoadingContainer isLoading={isLoading}>
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
      </FadeLoadingContainer>
    </section>
  )
}
