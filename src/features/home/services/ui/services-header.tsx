import { ContentTextHomePage } from '@/shared/types/content.types';
import { useContent } from '@/shared/hooks/use-content';
import { Markdown } from '@/shared/components/ui-kit/markdown';

export default function ServicesHeader() {
  const texts = useContent<ContentTextHomePage>({ context: 'homePage' });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center text-center md:items-start">
        <h2 className="relative mb-6 text-3xl font-bold md:text-6xl">
          {texts.data?.servicesTitle}
          <span className="absolute bottom-[-6px] left-0 h-1 w-[70px] rounded-full bg-cyan-400" />
        </h2>
      </div>

      <ul className="mb-8 space-y-2 text-base text-gray-700 md:text-xl [&_li]:flex [&_li]:items-start [&_li]:gap-2">
        <Markdown markdown={texts.data?.servicesDescription ?? ''} />
      </ul>
    </div>
  );
}
