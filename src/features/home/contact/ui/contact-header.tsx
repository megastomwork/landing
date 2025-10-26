import { useContent } from '@/shared/hooks/use-content';
import { ContentTextCallToActionSection } from '@/shared/types/content.types';

export default function ContactHeader() {
  const content = useContent<ContentTextCallToActionSection>({
    context: 'CallToActionSection',
  });

  return (
    <>
      <h2 className="mb-3 text-3xl font-extrabold leading-snug text-black md:text-5xl">
        {content?.data?.title}
      </h2>
      <p className="mb-6 text-base text-gray-700 md:text-2xl">
        {content?.data?.description}
      </p>
    </>
  );
}
