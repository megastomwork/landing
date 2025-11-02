import { PayloadImage } from '@/shared/components/ui-kit/directus-image'
import type { Media } from '@/shared/payload/payload-types'

interface AboutImageBlockProps {
  image: (number | null) | Media
}

export default function AboutImageBlock({ image }: AboutImageBlockProps) {
  const media = typeof image === 'number' ? null : image

  if (!media) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-xl shadow-lg">
      <PayloadImage
        src={media}
        alt="Команда Megastom"
        width={600}
        height={400}
        className="h-auto w-full object-cover"
      />
    </div>
  )
}
