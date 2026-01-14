'use client';

import { ErrorPage } from '@/features/error-pages';
import { LexicalContent } from '@/shared/components/lexical-content/lexical-content';
import { getPayloadImageUrl } from '@/shared/lib/payload-image';
import { ROUTES } from '@/shared/constants/routes.constants';
import Image from 'next/image';
import styles from './markdown.module.css';
import { RefreshRouteOnSave } from '@ui/refresh-route-on-save';
import type { Article } from '@types';

type ArticlePageProps = {
  article?: Article | null;
};

export function ArticlePage({ article }: ArticlePageProps) {
  if (article == null) {
    return (
      <ErrorPage
        statusCode={404}
        message="Стаття не знайдена"
        buttonText="До всіх статей"
        buttonLink={ROUTES.ARTICLES}
      />
    );
  }

  return (
    <>
      <RefreshRouteOnSave />
      <div className="max-w-container animate-fade-in max-lg:px-container mx-auto mt-5 max-w-[1160px] px-5">
        <Image
          src={getPayloadImageUrl(article?.image) || ''}
          alt={article?.title || 'Article image'}
          width={512}
          height={512}
          className="mb-3 h-[515px] w-full rounded-[20px] object-cover max-md:max-h-[400px] md:float-left md:mr-6 md:max-w-[50%]"
        />
        <div className={styles.markdown}>
          {article && (
            <LexicalContent
              content={
                article.content as unknown as Parameters<
                  typeof LexicalContent
                >[0]['content']
              }
            />
          )}
        </div>

        {/* TODO: add recommended articles */}
        {/* <ArticleSimilarArticles articles={article.recommendedArticles} /> */}
      </div>
    </>
  );
}
