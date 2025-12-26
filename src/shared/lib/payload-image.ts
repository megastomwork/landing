import { Media } from '@types';

export function getPayloadImageUrl(
  media: Media | number | string | undefined | null,
): string | null {
  if (!media) {
    return null;
  }

  // If already a string URL, return as is
  if (typeof media === 'string') {
    return media;
  }

  // If media has a URL (external storage like S3), use it as is
  if (typeof media === 'object' && media.url) {
    return media.url;
  }

  // For local Payload media with filename, return relative path
  if (typeof media === 'object' && media.filename) {
    // Check if filename already starts with / or contains full URL
    if (media.filename.startsWith('/') || media.filename.startsWith('http')) {
      return media.filename;
    }
    // Otherwise prepend /
    return `/${media.filename}`;
  }

  // For media ID reference, use Payload API endpoint with relative path
  if (typeof media === 'object' && media.id) {
    return `/api/media/${media.id}`;
  }

  return null;
}

export function isExternalUrl(url: string | null): boolean {
  if (!url) return false;
  return url.startsWith('http://') || url.startsWith('https://');
}
