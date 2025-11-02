'use client'

import FeedbacksSection from '@/features/home/feedbacks/feedbacks-section'

interface FeedbacksSectionProps {
  title?: string | null
}

export function PageFeedbacksSection({ title }: FeedbacksSectionProps) {
  // Use existing FeedbacksSection component
  // If title customization is needed, the component can be extended
  return <FeedbacksSection />
}
