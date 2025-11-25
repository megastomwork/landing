'use client'

import { SectionProps } from '@/shared/types/page.types'
import { WorkingHoursList } from './working-hours-list'

type WorkingHoursSectionProps = SectionProps<'working-hours'>

export function WorkingHoursSection({ title }: WorkingHoursSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {title && <h2 className="mb-6 text-center text-3xl font-bold">{title}</h2>}
      <div className="mx-auto max-w-2xl">
        <WorkingHoursList />
      </div>
    </section>
  )
}
