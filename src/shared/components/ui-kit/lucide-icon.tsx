'use client'

import * as Icons from 'lucide-react'
import { LucideProps } from 'lucide-react'

interface LucideIconProps extends Omit<LucideProps, 'ref'> {
  name: string
}

export function LucideIcon({ name, ...props }: LucideIconProps) {
  const IconComponent = Icons[name as keyof typeof Icons] as React.ComponentType<LucideProps>

  if (!IconComponent) {
    // Fallback to a default icon or return null
    return null
  }

  return <IconComponent {...props} />
}
