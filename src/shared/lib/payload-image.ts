import { CONFIG } from '@/shared/constants/config.constants'

type PayloadMedia = {
  id: string
  filename?: string
  url?: string
} | string

/**
 * Отримує URL зображення з Payload CMS
 * @param media - Об'єкт media або ID
 * @returns URL зображення
 */
export function getPayloadImageUrl(media: PayloadMedia | undefined | null): string {
  if (!media) {
    return '/placeholder.png' // fallback
  }

  // Якщо це об'єкт з url
  if (typeof media === 'object' && media.url) {
    return media.url
  }

  // Якщо це об'єкт з filename
  if (typeof media === 'object' && media.filename) {
    return `${CONFIG.SERVER_URL}/${media.filename}`
  }

  // Якщо це просто ID
  if (typeof media === 'object' && media.id) {
    return `${CONFIG.SERVER_URL}/api/media/${media.id}`
  }

  // Якщо це просто string (ID або filename)
  if (typeof media === 'string') {
    // Якщо виглядає як filename
    if (media.includes('.')) {
      return `${CONFIG.SERVER_URL}/${media}`
    }
    // Інакше це ID
    return `${CONFIG.SERVER_URL}/api/media/${media}`
  }

  return '/placeholder.png'
}
