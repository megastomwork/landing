import { PayloadImage } from '@/shared/components/ui-kit/directus-image';
import type { Media } from '@/shared/payload/payload-types';
import { SectionProps } from '@/shared/types/page.types';

type Intro1SectionProps = SectionProps<'intro-1'>;

export function Intro1Section({ image }: Intro1SectionProps) {
  const media = typeof image === 'number' ? null : image;

  if (!media) {
    return null;
  }

  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-4">
        <div className="w-full overflow-hidden rounded-[20px]">
          <PayloadImage
            src={media.url}
            alt={media.alt || 'Image'}
            width={1040}
            height={690}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
