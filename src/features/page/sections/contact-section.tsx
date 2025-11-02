'use client'

import ContactSection from '@/features/home/contact/contact-section'

interface ContactSectionProps {
  showImage?: boolean | null
}

export function PageContactSection({ showImage }: ContactSectionProps) {
  // Use existing ContactSection component
  // If image visibility control is needed, the component can be extended
  return <ContactSection />
}
