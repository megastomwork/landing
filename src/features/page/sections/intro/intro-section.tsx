import { PayloadImage } from '@/shared/components/ui-kit/directus-image'
import type { Media } from '@/shared/payload/payload-types'
import { SectionProps } from '@/shared/types/page.types'

type IntroSectionProps = SectionProps<'intro'>

export function IntroSection({ image, alt }: IntroSectionProps) {
  const media = typeof image === 'number' ? null : image

  if (!media) {
    return null
  }

  return (
    <section>
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-4">
        <div className="w-full overflow-hidden rounded-[20px]">
          <PayloadImage
            src={media.url}
            alt={alt || 'Image'}
            width={1040}
            height={690}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
