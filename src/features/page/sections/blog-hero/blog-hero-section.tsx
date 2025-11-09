import { Underline } from '@/shared/components/ui-kit/underline'
import { cn } from '@/shared/lib/css'
import { PayloadImage } from '@/shared/components/ui-kit/directus-image'
import { SectionProps } from '@/shared/types/page.types'

type BlogHeroSectionProps = SectionProps<'blogHero'>

export function BlogHeroSection({
  backgroundImage,
  title,
  description,
}: BlogHeroSectionProps) {
  const media = typeof backgroundImage === 'number' ? null : backgroundImage

  return (
    <section className="w-full max-lg:px-7">
      <div
        className={cn(
          'mb-6 flex min-h-[410px] w-full max-w-[1040px] flex-col items-center justify-center overflow-hidden rounded-[20px] bg-cover bg-center lg:mb-12 lg:min-h-[512px]',
        )}
      >
        {media && (
          <div className="absolute inset-0 -z-10">
            <PayloadImage
              src={media.url}
              alt={title || 'Blog hero'}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="mb-2 text-[24px] font-semibold leading-[120%] sm:text-[64px] lg:mb-6">
          <Underline underlineClassName="w-[40%]">{title || 'Blog'}</Underline>
        </h1>

        {description && (
          <p className="max-w-[237px] text-center text-sm leading-6 sm:max-w-[500px] sm:text-xl lg:max-w-[713px]">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
