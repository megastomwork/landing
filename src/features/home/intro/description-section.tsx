import { useContent } from '@/shared/hooks/use-content';
import { ContentTextHomePage } from '@/shared/types/content.types';

export default function DescriptionSection() {
  const texts = useContent<ContentTextHomePage>({ context: 'homePage' });

  return (
    <section className="bg-accent-60 py-10">
      <div className="mx-auto max-w-4xl px-4 text-center text-sm leading-relaxed text-gray-800 sm:text-xl">
        {texts.data?.welcomeDescription}
      </div>
    </section>
  );
}
