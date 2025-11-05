import { CONFIG } from '@/shared/constants/client-config.constants';
import Image, { ImageProps } from 'next/image';
import { Skeleton } from '@/shared/components/ui-kit/skeleton';

type DirectusImageProps = Omit<ImageProps, 'src'> & {
  src?: string | null;
};

export function DirectusImage({ src, alt, ...props }: DirectusImageProps) {
  if (!src) {
    return <Skeleton className="h-full w-full rounded-xl" />;
  }

  const imageUrl = src.startsWith('http')
    ? src 
    : `${CONFIG.SERVER_URL}${src}`;

  return (
    <Image src={imageUrl} alt={alt} {...props} />
  );
}

// Alias for backward compatibility
export { DirectusImage as PayloadImage };
