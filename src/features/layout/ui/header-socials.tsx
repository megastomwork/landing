'use client';

import { useSocials } from '@/shared/hooks/use-socials';
import { Media } from '@/shared/payload/payload-types';
import { PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const HeaderSocials = () => {
  const socials = useSocials();

  return (
    <div className="mx-auto mb-4 w-max">
      <a
        href="tel:+38(098)-101-61-61"
        className="mb-4 flex items-center justify-center gap-1 text-sm"
      >
        <PhoneIcon />
        +38(098)-101-61-61
      </a>
      <div className="mx-auto flex w-max gap-3 sm:flex-col">
        {socials.data?.map(item => {
          const media = typeof item.icon === 'object' ? item.icon : null;
          if (!media?.url) return null;

          return (
            <Link
              key={item.id}
              href={item.link}
              className="flex items-center gap-5 duration-150 hover:opacity-50"
            >
              <Image
                src={media.url}
                width={32}
                height={32}
                alt={item.title}
                className="h-8 w-8 object-contain"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
