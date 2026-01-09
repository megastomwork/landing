'use client';

import { ScrollAnimatedContainer } from '@/shared/components/animations/scroll-animated-container';
import { ArticleItem } from '@/shared/components/ui-kit/article';
import { Button } from '@/shared/components/ui-kit/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui-kit/accordion';
import { cn } from '@/shared/lib/css';
import type { Article } from '@/shared/payload/payload-types';
import { motion } from 'framer-motion';
import { SectionProps } from '@/shared/types/page.types';
import { useInfinitePageArticles } from '@/features/page/hooks/use-infinite-page-articles';
import { useQuestions } from '@/features/page/hooks/use-questions';
import { Loader2 } from 'lucide-react';

type BlogGridWithFaqSectionProps = SectionProps<'blog-grid-with-faq'>;

export function BlogGridWithFaqSection({
  blogTitle,
  buttonText,
  faqTitle,
}: BlogGridWithFaqSectionProps) {
  const finalButtonText = buttonText || 'Показати більше';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfinitePageArticles();

  const { data: questions } = useQuestions();

  const articles = data?.pages.flatMap(page => page.docs) ?? [];

  return (
    <div className="mx-auto mt-[1.25rem] max-w-[1040px]">
      <ScrollAnimatedContainer
        delay={0.2}
        className="flex w-full gap-4 max-lg:flex-col"
      >
        <>
          {/* Blog Articles - 2/3 width */}
          <div className="mx-auto lg:w-2/3">
            <h2 className="mb-4 w-full text-center max-lg:hidden">
              {blogTitle}
            </h2>

            <ArticlesContent
              articles={articles}
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              buttonText={finalButtonText}
            />
          </div>

          {/* FAQ Questions - 1/3 width */}
          <div className="max-lg:mx-7 max-lg:mb-6 lg:w-1/3">
            <h2 className="mb-2 w-full text-center">{faqTitle}</h2>
            <Accordion type="multiple">
              {questions?.map((question, index) => (
                <AccordionItem
                  key={question.id}
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
          </div>
        </>
      </ScrollAnimatedContainer>
    </div>
  );
}

type ArticlesContentProps = {
  articles: Article[];
  isLoading: boolean;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  buttonText: string;
};

const ArticlesContent = ({
  articles,
  isLoading,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  buttonText,
}: ArticlesContentProps) => {
  if (isLoading) {
    return (
      <div className="flex min-h-[700px] items-center justify-center">
        <p className="text-gray-500">Завантаження статей...</p>
      </div>
    );
  }

  return (
    <div className="mb-6 lg:mb-12">
      <div
        className={cn(
          'min-h-[700px] grid-cols-[minmax(200px,356px)_minmax(200px,356px)] flex-col gap-x-4 gap-y-6 max-lg:px-[28px] max-sm:flex sm:grid',
        )}
      >
        {articles.map((article, index) => (
          <ScrollAnimatedContainer
            delay={index % 2 === 0 ? 0.1 : 0.2}
            key={article.id}
          >
            <ArticleItem article={article} />
          </ScrollAnimatedContainer>
        ))}
      </div>
      {hasNextPage && (
        <div className="mt-8 mb-0 flex justify-center">
          <Button
            variant="header"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <Loader2 className="animate-spin" />
            ) : (
              buttonText
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
