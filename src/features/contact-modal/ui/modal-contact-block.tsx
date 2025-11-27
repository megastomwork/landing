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

      <p className="mt-6 mb-2 text-sm text-gray-600 md:text-base">
        Написати нам у соц. мережах:
      </p>

      <div className="mx-auto flex flex-col gap-3 text-black">
        {socials.data?.map(item => {
          const media = typeof item.icon === 'object' ? item.icon : null;
          if (!media?.url) return null;

          return (
            <Link
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xl font-medium hover:text-cyan-600 md:text-2xl"
            >
              <Image
                src={media.url}
                width={32}
                height={32}
                alt={item.title}
                className="h-8 w-8 object-contain"
              />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};
