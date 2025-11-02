'use client'

import { FadeLoadingContainer } from '@/shared/components/animations/fade-loading-container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui-kit/accordion'
import { useQuestions } from '@/features/page/hooks/use-questions'

interface FaqSectionProps {
  title?: string | null
}

export function FaqSection({ title }: FaqSectionProps) {
  const { data: questions, isLoading } = useQuestions()

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {title && <h2 className="mb-2 w-full text-center">{title}</h2>}

      <FadeLoadingContainer isLoading={isLoading}>
        <Accordion type="multiple">
          {questions?.map((question, index) => (
            <AccordionItem
              key={index}
              value={'item-' + index}
              className="max-w-full"
            >
              <AccordionTrigger>{question.question}</AccordionTrigger>
              <AccordionContent className="max-w-full">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeLoadingContainer>
    </section>
  )
}
