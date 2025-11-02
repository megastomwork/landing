import { Button } from '@/shared/components/ui-kit/button';
import { useOpenContactModal } from '@/features/contact-modal/hooks/use-open-contact-modal';
import { getPayloadImageUrl } from '@/shared/lib/payload-image';
import Image from 'next/image';
import type { Media } from '@/shared/payload/payload-types';

type DoctorItemProps = {
  photo: number | Media;
  name: string;
  position: string;
  experience: string;
};

export const DoctorItemCard = ({
  photo,
  name,
  position,
  experience,
}: DoctorItemProps) => {
  const openModal = useOpenContactModal();

  return (
    <div className="mx-auto flex items-center gap-4 max-lg:flex-col lg:w-[950px]">
      <div className="h-[422px] w-full max-w-[330px] flex-none">
        <Image
          className="h-[422px] w-[330px] rounded-[20px] object-cover"
          src={getPayloadImageUrl(photo)}
          alt={name || 'doctor'}
          width={330}
          height={422}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="max-lg:flex max-lg:flex-col max-lg:items-center max-lg:text-center">
        <h3 className="text-[32px] font-bold">{name}</h3>
        <p className="mt-2 text-xl font-bold">{position}</p>
        <p className="mt-4 text-xl">
          <span className="font-bold">Досвід роботи: </span>
          {experience}
        </p>
        <Button className="mt-4 w-full max-w-[350px]" onClick={openModal}>
          Записатися на прийом
        </Button>
      </div>
    </div>
  );
};
