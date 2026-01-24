import { Media } from '@types';

export type ImageSize =
  | 'thumbnail'
  | 'card'
  | 'tablet'
  | 'desktop'
  | 'original';

/**
 * Get the URL for a specific image size from Payload Media object
 * Falls back to original if the requested size is not available
 */
export function getPayloadImageUrl(
  media: Media | number | string | undefined | null,
  size: ImageSize = 'original',
): string | null {
  if (!media) {
    return null;
  }

  if (typeof media === 'string') {
    return media;
  }

  if (typeof media === 'number') {
    return `/api/media/${media}`;
  }

  if (size !== 'original' && media.sizes?.[size]?.url) {
    return media.sizes[size].url;
  }

  if (size === 'desktop' && media.sizes?.tablet?.url) {
    return media.sizes.tablet.url;
  }
  if ((size === 'desktop' || size === 'tablet') && media.sizes?.card?.url) {
    return media.sizes.card.url;
  }
  if (
    (size === 'desktop' || size === 'tablet' || size === 'card') &&
    media.sizes?.thumbnail?.url
  ) {
    return media.sizes.thumbnail.url;
  }

  if (media.url) {
    return media.url;
  }

  // For local Payload media with filename, return relative path
  if (media.filename) {
    // Check if filename already starts with / or contains full URL
    if (media.filename.startsWith('/') || media.filename.startsWith('http')) {
      return media.filename;
    }
    // Otherwise prepend /
    return `/${media.filename}`;
  }

  // For media ID reference, use Payload API endpoint with relative path
  if (media.id) {
    return `/api/media/${media.id}`;
  }

  return null;
}

export function isExternalUrl(url: string | null): boolean {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
}
