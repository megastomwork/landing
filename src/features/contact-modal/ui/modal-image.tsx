import { DirectusImage } from '@/shared/components/ui-kit/directus-image';
import { useContent } from '@/shared/hooks/use-content';
import { ContentTextCallToActionSection } from '@/shared/types/content.types';

export const ModalImage = () => {
  const content = useContent<ContentTextCallToActionSection>({
    context: 'CallToActionSection',
  });

  return (
    <div className="hidden flex-shrink-0 overflow-hidden rounded-xl md:block md:w-[336px]">
      <DirectusImage
        src={content.data?.image}
        alt="Стоматологічне обладнання"
        width={237}
        height={400}
        className="h-[500px] w-full object-cover"
      />
    </div>
  );
};
