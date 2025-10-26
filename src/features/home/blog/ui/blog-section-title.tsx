import { useContent } from '@/shared/hooks/use-content';
import { ContentTextHomePage } from '@/shared/types/content.types';

export default function BlogSectionTitle() {
  const content = useContent<ContentTextHomePage>({
    context: 'HomePage',
  });

  return (
    <h2 className="relative mb-6 text-6xl font-bold">
      {content?.data?.blogTitle}
      <span className="absolute bottom-0 left-0 mt-1 h-1 w-[100px] rounded-md bg-cyan-400" />
    </h2>
  );
}
