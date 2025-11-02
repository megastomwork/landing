import { CONFIG } from '@/shared/constants/config.constants'
import { Media } from '@types'

export function getPayloadImageUrl(media: Media | number | undefined | null): string {
  if (!media) {
    return '/placeholder.png' // fallback
  }

  if (typeof media === 'object' && media.url) {
    return media.url
  }

  if (typeof media === 'object' && media.filename) {
    return `${CONFIG.SERVER_URL}/${media.filename}`
  }

  if (typeof media === 'object' && media.id) {
    return `${CONFIG.SERVER_URL}/api/media/${media.id}`
  }

  return '/placeholder.png'
}
