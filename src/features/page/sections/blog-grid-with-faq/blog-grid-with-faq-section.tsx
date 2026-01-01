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
import { usePageArticles } from '@/features/page/hooks/use-page-articles';
import { useQuestions } from '@/features/page/hooks/use-questions';
import { useCallback, useState } from 'react';

type BlogGridWithFaqSectionProps = SectionProps<'blog-grid-with-faq'>;

export function BlogGridWithFaqSection({
  blogTitle,
  buttonText,
  faqTitle,
}: BlogGridWithFaqSectionProps) {
  const [isShowingAll, setIsShowingAll] = useState(false);
  const articlesCount = 4;
  const finalButtonText = buttonText || 'Показати більше';

  const { data: articles } = usePageArticles({
    articlesCount: isShowingAll ? 100 : articlesCount,
  });

  const { data: questions } = useQuestions();

  const toggleShowAll = useCallback(() => {
    setIsShowingAll(state => !state);
  }, []);

  const totalArticles = articles?.length ?? 0;
  const showMoreLink = true;

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
              articles={articles ?? []}
              isShowingAll={isShowingAll}
              toggleShowAll={toggleShowAll}
              totalArticles={totalArticles}
              showMoreLink={showMoreLink}
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
  isShowingAll: boolean;
  toggleShowAll: () => void;
  totalArticles: number;
  showMoreLink: boolean;
  buttonText: string;
};

const ArticlesContent = ({
  articles,
  isShowingAll,
  toggleShowAll,
  totalArticles,
  showMoreLink,
  buttonText,
}: ArticlesContentProps) => {
  return (
    <>
      <motion.div
        layout
        layoutScroll
        className={cn(
          'min-h-[700px] grid-cols-[minmax(200px,356px)_minmax(200px,356px)] flex-col gap-x-4 gap-y-6 overflow-hidden max-lg:px-[28px] max-sm:flex sm:grid',
        )}
        initial={{ height: 0 }}
        animate={{ height: isShowingAll ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {articles?.map((article, index) => (
          <ScrollAnimatedContainer
            delay={index % 2 === 0 ? 0.1 : 0.2}
            key={article.id}
          >
            <ArticleItem article={article} />
          </ScrollAnimatedContainer>
        ))}
      </motion.div>
      {showMoreLink && totalArticles > 4 && (
        <div className="mt-8 mb-0 flex justify-center lg:mb-12">
          <Button variant="header" onClick={toggleShowAll}>
            {isShowingAll ? 'Приховати' : buttonText}
          </Button>
        </div>
      )}
    </>
  );
};
