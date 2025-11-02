'use client';

import { FadeLoadingContainer } from '@/shared/components/animations/fade-loading-container';
import { ScrollAnimatedContainer } from '@/shared/components/animations/scroll-animated-container';
import { ArticleItem } from '@/shared/components/ui-kit/article';
import { Button } from '@/shared/components/ui-kit/button';
import { useContent } from '@/shared/hooks/use-content';
import { cn } from '@/shared/lib/css';
import type { Article } from '@/shared/payload/payload-types';
import { ContentTextBlogPage } from '@/shared/types/content.types';
import { motion } from 'framer-motion';
import { useArticles } from '../hooks/use-articles';

export function BlogArticles() {
  const {
    data: articles,
    isLoading,
    totalArticles,
    isShowingAll,
    toggleShowAll,
  } = useArticles();
  const content = useContent<ContentTextBlogPage>({
    context: 'blogPage',
  });

  return (
    <>
      <h2 className="mb-4 w-full text-center max-lg:hidden">
        {content?.data?.articlesTitle}
      </h2>

      <FadeLoadingContainer isLoading={isLoading}>
        <Content
          articles={articles ?? []}
          isShowingAll={isShowingAll}
          toggleShowAll={toggleShowAll}
          totalArticles={totalArticles}
        />
      </FadeLoadingContainer>
    </>
  );
}

type ContentProps = {
  articles: Article[];
  isShowingAll: boolean;
  toggleShowAll: () => void;
  totalArticles: number;
};

const Content = ({
  articles,
  isShowingAll,
  toggleShowAll,
  totalArticles,
}: ContentProps) => {
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
      {totalArticles > 4 && (
        <div className="mb-0 mt-8 flex justify-center lg:mb-12">
          <Button variant="header" onClick={toggleShowAll}>
            {isShowingAll ? 'Приховати' : 'Показати більше'}
          </Button>
        </div>
      )}
    </>
  );
};
