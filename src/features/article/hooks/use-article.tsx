import { CONFIG } from '@/shared/constants/config.constants';
import { payloadAPI } from '@/shared/lib/payload-rest';
import { isLivePreviewMode } from '@/shared/lib/payload-preview';
import { useLivePreview } from '@payloadcms/live-preview-react';
import { useQuery } from '@tanstack/react-query';
import type { Article } from '@types';

type UseArticleOptions = {
  id?: string | null;
};

export const useArticle = ({ id }: UseArticleOptions) => {
  const isLivePreview = isLivePreviewMode();

  const { data, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => payloadAPI.getItem<Article>('articles', id!),
    enabled: !!id,
  });

  const { data: live } = useLivePreview<Article>({
    initialData: (data || {}) as Article,
    serverURL: CONFIG.SERVER_URL,
    depth: 2,
  })

  return {
    article: isLivePreview ? live : data,
    isArticleLoading: isLoading,
  };
}
