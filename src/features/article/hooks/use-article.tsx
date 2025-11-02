import { payloadAPI } from '@/shared/lib/payload-rest';
import { useQuery } from '@tanstack/react-query';
import { Article } from '@types';

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
