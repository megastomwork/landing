'use client';

import { useArticle } from '@/features/article';
import { ErrorPage } from '@/features/error-pages';
import { FadeLoadingContainer } from '@/shared/components/animations/fade-loading-container';
import { LexicalContent } from '@/shared/components/ui-kit/lexical-content';
import { getPayloadImageUrl } from '@/shared/lib/payload-image';
import { ROUTES } from '@/shared/constants/routes.constants';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import styles from './markdown.module.scss';
import { RefreshRouteOnSave } from '@/shared/components/payload/refresh-route-on-save';

export function ArticlePage() {
  const params = useParams<{ id: string }>();
  const { article, isArticleLoading } = useArticle({ id: params.id });

  if (!isArticleLoading && article == null) {
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
    <FadeLoadingContainer isLoading={isArticleLoading}>
      <RefreshRouteOnSave />
      <div className="mx-auto mt-[20px] max-w-container animate-fade-in max-lg:px-container">
        <Image
          src={getPayloadImageUrl(article?.image)}
          alt={article?.title || 'Article image'}
          width={512}
          height={512}
          className="mb-3 h-[515px] w-full rounded-[20px] object-cover max-md:max-h-[400px] md:float-left md:mr-6 md:max-w-[50%]"
        />
        <div className={styles.markdown}>
          {article && <LexicalContent content={article.content as unknown as Parameters<typeof LexicalContent>[0]['content']} />}
        </div>

        {/* TODO: add recommended articles */}
        {/* <ArticleSimilarArticles articles={article.recommendedArticles} /> */}
      </div>
    </FadeLoadingContainer>
  );
}
