'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui-kit/accordion';
import { useQuestions } from '@/features/page/hooks/use-questions';
import { SectionProps } from '@/shared/types/page.types';

type FaqSectionProps = SectionProps<'faq'>;

export function FaqSection({ title }: FaqSectionProps) {
  const { data: questions } = useQuestions();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {title && <h2 className="mb-2 w-full text-center">{title}</h2>}

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
    </section>
  );
}
