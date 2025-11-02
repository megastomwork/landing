'use client';

import { Skeleton } from '@/shared/components/ui-kit/skeleton';
import { CONFIG } from '@/shared/constants/client-config.constants';
import { useContacts } from '@/shared/hooks/use-contacts';
import { useSocials } from '@/shared/hooks/use-socials';
import { PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function FooterSocials() {
  const socials = useSocials();
  const contacts = useContacts();

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
        {socials.isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          socials.data?.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="flex items-center gap-2 duration-150 hover:opacity-50"
              target="_blank"
            >
              <Image
                src={`${CONFIG.BACKEND_URL}/assets/${item.icon}`}
                width={32}
                height={32}
                alt="title"
                className="h-8 w-8 object-contain"
              />
              <span className="max-sm:hidden">{item.title}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
