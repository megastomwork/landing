import Image, { ImageProps } from 'next/image';
import { Skeleton } from '@/shared/components/ui-kit/skeleton';
import {
  getPayloadImageUrl,
  isExternalUrl,
  type ImageSize,
} from '@/shared/lib/payload-image';
import type { Media } from '@/shared/payload/payload-types';

type PayloadImageProps = Omit<ImageProps, 'src'> & {
  src?: string | Media | number | null;
  /**
   * Preferred image size to use.
   * - 'thumbnail': 400px width - for small previews
   * - 'card': 768px width - for cards and medium displays
   * - 'tablet': 1200px width - for tablet/medium-large displays
   * - 'desktop': 1920px width - for large/hero images
   * - 'original': full resolution (use sparingly)
   *
   * Falls back to next available size if preferred is not available.
   */
  imageSize?: ImageSize;
};

export function PayloadImage({
  src,
  alt,
  imageSize = 'desktop',
  ...props
}: PayloadImageProps) {
  const imageUrl = getPayloadImageUrl(src, imageSize);

  if (!imageUrl) {
    return <Skeleton className="h-full w-full rounded-xl" />;
  }

  if (isExternalUrl(imageUrl)) {
    return (
      <Image
        src={imageUrl}
        loader={() => imageUrl}
        alt={alt}
        unoptimized
        {...props}
      />
    );
  }

  return <Image src={imageUrl} alt={alt} unoptimized {...props} />;
}

// Alias for backward compatibility
export { PayloadImage as DirectusImage };
