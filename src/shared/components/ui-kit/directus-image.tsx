import { CONFIG } from '@/shared/constants/config.constants';
import Image, { ImageProps } from 'next/image';
import { Skeleton } from '@/shared/components/ui-kit/skeleton';

type DirectusImageProps = Omit<ImageProps, 'src'> & {
  src?: string;
};

export function DirectusImage({ src, alt, ...props }: DirectusImageProps) {
  if (!src) {
    return <Skeleton className="h-full w-full rounded-xl" />;
  }

  return (
    <Image src={`${CONFIG.BACKEND_URL}/assets/${src}`} alt={alt} {...props} />
  );
}
