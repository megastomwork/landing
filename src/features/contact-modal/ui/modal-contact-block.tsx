import { CONFIG } from '@/shared/constants/client-config.constants';
import { useContacts } from '@/shared/hooks/use-contacts';
import { useSocials } from '@/shared/hooks/use-socials';
import { Loader2, PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const ModalContactBlock = () => {
  const socials = useSocials();
  const contacts = useContacts();

  if (contacts.isLoading || socials.isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <>
      <div className="mt-6">
        <p className="mb-1 text-sm text-gray-600 md:text-base">
          За номер телефона:
        </p>
        <a
          href={`tel:${contacts.data?.phone}`}
          className="flex items-center gap-2 text-2xl font-medium text-black hover:text-cyan-600"
        >
          <PhoneIcon className="h-5 w-5" />
          {contacts.data?.phone}
        </a>
      </div>

      <p className="mb-2 mt-6 text-sm text-gray-600 md:text-base">
        Написати нам у соц. мережах:
      </p>

      <div className="mx-auto flex flex-col gap-3 text-black">
        {socials.data?.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xl font-medium hover:text-cyan-600 md:text-2xl"
          >
            <Image
              src={`${CONFIG.BACKEND_URL}/assets/${item.icon}`}
              width={32}
              height={32}
              alt="title"
              className="h-8 w-8 object-contain"
            />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </>
  );
};
