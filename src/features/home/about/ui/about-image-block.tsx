import { DirectusImage } from '@/shared/components/ui-kit/directus-image';
import { useContent } from '@/shared/hooks/use-content';
import { ContentTextHomePage } from '@/shared/types/content.types';

export default function AboutImageBlock() {
  const content = useContent<ContentTextHomePage>({
    context: 'HomePage',
  });

  return (
    <div className="overflow-hidden rounded-xl shadow-lg">
      <DirectusImage
        src={content.data?.aboutImage}
        alt="Команда Megastom"
        width={600}
        height={400}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}
