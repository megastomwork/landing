'use client';

import { DirectusImage } from '@/shared/components/ui-kit/directus-image';
import { useSocials } from '@/shared/hooks/use-socials';
import { PhoneIcon } from 'lucide-react';
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
        {socials.data?.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="flex items-center gap-5 duration-150 hover:opacity-50"
          >
            <DirectusImage
              src={item.icon}
              width={32}
              height={32}
              alt="title"
              className="h-8 w-8 object-contain"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
