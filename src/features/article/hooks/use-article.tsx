import { CONFIG } from '@/shared/constants/client-config.constants';
import { payloadAPI } from '@/shared/lib/payload-rest';
import { isLivePreviewMode } from '@/shared/lib/payload-preview';
import { useLivePreview } from '@payloadcms/live-preview-react';
import { useQuery } from '@tanstack/react-query';
import type { Article } from '@types';

type UseArticleOptions = {
  id?: string | null;
};

export const useArticle = ({ id }: UseArticleOptions) => {

  const { data, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => payloadAPI.getItem<Article>('articles', id!),
    enabled: !!id,
  });

  return {
    article: data,
    isArticleLoading: isLoading,
  };
}
