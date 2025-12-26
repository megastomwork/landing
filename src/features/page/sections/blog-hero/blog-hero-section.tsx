import { Underline } from '@/shared/components/ui-kit/underline';
import { cn } from '@/shared/lib/css';
import { PayloadImage } from '@/shared/components/ui-kit/payload-image';
import { SectionProps } from '@/shared/types/page.types';

type BlogHeroSectionProps = SectionProps<'blog-hero'>;

export function BlogHeroSection({
  backgroundImage,
  title,
  description,
  showOverlay,
}: BlogHeroSectionProps) {
  const media = typeof backgroundImage === 'number' ? null : backgroundImage;

  return (
    <section className="w-full max-lg:px-7">
      <div
        className={cn(
          'relative mx-auto mb-6 flex min-h-[410px] w-full max-w-[1040px] flex-col items-center justify-center overflow-hidden rounded-[20px] lg:mb-12 lg:min-h-[512px]',
        )}
      >
        {media && (
          <div className="absolute inset-0">
            <PayloadImage
              src={media.url}
              alt={title || 'Blog hero'}
              fill
              className="object-cover"
            />
            {/* Overlay removed as per user feedback */}
            {showOverlay && <div className="absolute inset-0 bg-white/30" />}
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="mb-2 text-[24px] leading-[120%] font-semibold sm:text-[64px] lg:mb-6">
            <Underline underlineClassName="w-[40%]">
              {title || 'Blog'}
            </Underline>
          </h1>

          {description && (
            <p className="max-w-[237px] text-center text-sm leading-6 sm:max-w-[500px] sm:text-xl lg:max-w-[713px]">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
