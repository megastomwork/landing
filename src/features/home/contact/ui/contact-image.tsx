import { DirectusImage } from '@/shared/components/ui-kit/directus-image';
import { useContent } from '@/shared/hooks/use-content';
import { ContentTextCallToActionSection } from '@/shared/types/content.types';

export default function ContactImage() {
  const content = useContent<ContentTextCallToActionSection>({
    context: 'CallToActionSection',
  });

  return (
    <div className="overflow-hidden rounded-xl shadow-lg">
      <DirectusImage
        src={content.data?.image}
        alt="Стоматологічне обладнання"
        width={400}
        height={400}
        className="max-h-[700px] w-full object-cover"
      />
    </div>
  );
}
