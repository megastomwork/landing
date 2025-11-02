import { CONFIG } from '@/shared/constants/client-config.constants';
import Image, { ImageProps } from 'next/image';
import { Skeleton } from '@/shared/components/ui-kit/skeleton';

type DirectusImageProps = Omit<ImageProps, 'src'> & {
  src?: string | { url?: string | null };
};

export function DirectusImage({ src, alt, ...props }: DirectusImageProps) {
  console.log(src)
  if (!src) {
    return <Skeleton className="h-full w-full rounded-xl" />;
  }

  // Handle Payload media object format
  const imageSrc = typeof src === 'object' && src.url
    ? src.url
    : typeof src === 'string'
    ? src
    : '';

  if (!imageSrc) {
    return <Skeleton className="h-full w-full rounded-xl" />;
  }

  // If it's already a full URL, use it as is
  const imageUrl = imageSrc.startsWith('http')
    ? imageSrc
    : `${CONFIG.SERVER_URL}${imageSrc}`;

  return (
    <Image src={imageUrl} alt={alt} {...props} />
  );
}

// Alias for backward compatibility
export { DirectusImage as PayloadImage };
