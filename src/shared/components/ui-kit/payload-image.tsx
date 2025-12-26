import Image, { ImageProps } from 'next/image';
import { Skeleton } from '@/shared/components/ui-kit/skeleton';
import { getPayloadImageUrl, isExternalUrl } from '@/shared/lib/payload-image';
import type { Media } from '@/shared/payload/payload-types';

type PayloadImageProps = Omit<ImageProps, 'src'> & {
  src?: string | Media | number | null;
};

export function PayloadImage({ src, alt, ...props }: PayloadImageProps) {
  const imageUrl = getPayloadImageUrl(src);

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

  return <Image src={imageUrl} alt={alt} {...props} />;
}

// Alias for backward compatibility
export { PayloadImage as DirectusImage };
