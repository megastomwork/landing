'use client';

import { useQuestions } from '@/features/blog/hooks/use-questions';
import { FadeLoadingContainer } from '@/shared/components/animations/fade-loading-container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui-kit/accordion';
import { useContent } from '@/shared/hooks/use-content';
import { ContentTextBlogPage } from '@/shared/types/content.types';

export function BlogQuestions() {
  const { data: questions, isLoading } = useQuestions();
  const content = useContent<ContentTextBlogPage>({
    context: 'BlogPage',
  });

  return (
    <>
      <h2 className="mb-2 w-full text-center">{content?.data?.faqTitle}</h2>
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
    </>
  );
}
