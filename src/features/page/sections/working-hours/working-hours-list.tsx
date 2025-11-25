import { cn } from '@/shared/lib/css'
import { Fragment } from 'react'
import { useWorkingHours } from '@/features/page/hooks/use-working-hours'

type WorkingHoursListProps = {
  size?: 'normal' | 'small'
}

export function WorkingHoursList({ size }: WorkingHoursListProps) {
  const schedule = useWorkingHours()

  return (
    <div
      className={cn(
        'grid grid-cols-[auto_1fr] gap-x-5',
        size === 'normal' || (size === undefined && 'gap-y-3'),
        size === 'small' && 'gap-y-1.5 text-sm',
      )}
    >
      {schedule.data?.map((item) => (
        <Fragment key={item.id}>
          <p
            className={cn(
              'text-xl font-semibold',
              size === 'small' && 'text-base',
            )}
          >
            {item.days}
          </p>
          <p className={cn('text-xl', size === 'small' && 'text-base')}>
            {item.hours}
          </p>
        </Fragment>
      ))}
    </div>
  )
}
