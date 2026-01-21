'use client';

import { useContacts } from '@/shared/hooks/use-contacts';
import { useSocials } from '@/shared/hooks/use-socials';
import { PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function FooterSocials() {
  const socials = useSocials();
  const contacts = useContacts();

  if (socials.isLoading || contacts.isLoading) {
    return null;
  }

  return (
    <div>
      <p className="mb-3 font-bold">Зв’язатись з нами:</p>
      <a
        href={`tel:${contacts.data?.phone}`}
        className="mb-4 flex gap-2 sm:hidden"
      >
        <PhoneIcon />
        {contacts.data?.phone}
      </a>
      <div className="flex gap-1.5 sm:flex-col">
        {socials.data?.map(item => {
          const media = typeof item.icon === 'object' ? item.icon : null;
          if (!media?.url) return null;

          return (
            <Link
              key={item.id}
              href={item.link}
              className="flex items-center gap-2 duration-150 hover:opacity-50"
              target="_blank"
            >
              <Image
                src={media.url}
                width={32}
                height={32}
                alt={item.title}
                className="h-8 w-8 object-contain"
              />
              <span className="max-sm:hidden">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
