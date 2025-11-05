import { DirectusImage } from '@/shared/components/ui-kit/directus-image';
import { useContent } from '@/shared/hooks/use-content';
import { ContentTextHomePage } from '@/shared/types/content.types';
import Image from 'next/image';

export default function IntroSection() {
  const content = useContent<ContentTextHomePage>({
    context: 'homePage',
  });

  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-4">
        <div className="w-full overflow-hidden rounded-[20px]">
        </div>
      </div>
    </section>
  );
}
