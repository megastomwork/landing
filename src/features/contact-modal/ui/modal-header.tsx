import { Underline } from '@/shared/components/ui-kit/underline';
import { useContent } from '@/shared/hooks/use-content';
import { ContentTextCallToActionSection } from '@/shared/types/content.types';

export default function ModalHeader() {
  const content = useContent<ContentTextCallToActionSection>({
    context: 'callToActionSection',
  });

  return (
    <>
      <h2 className="text-3xl font-extrabold leading-snug text-black md:text-4xl">
        <Underline>{content.data?.title}</Underline>
      </h2>
      <p className="mt-4 text-sm text-gray-700 md:text-base">
        {content.data?.description}
      </p>
    </>
  );
}
