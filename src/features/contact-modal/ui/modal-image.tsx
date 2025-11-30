import { useScrollModalSettings } from '../hooks/use-scroll-modal-settings';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

export const ModalImage = () => {
  const { data: settings, isLoading } = useScrollModalSettings();

  if (isLoading) {
    return (
      <div className="hidden flex-shrink-0 items-center justify-center overflow-hidden rounded-xl md:flex md:w-[336px]">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  const image = typeof settings?.image === 'object' ? settings?.image : null;

  if (!image?.url) {
    return null;
  }

  return (
    <div className="hidden flex-shrink-0 overflow-hidden rounded-xl md:block md:w-[336px]">
      <Image
        src={image.url}
        alt={image.alt || 'Modal image'}
        width={336}
        height={500}
        className="h-[500px] w-full object-cover"
      />
    </div>
  );
};
