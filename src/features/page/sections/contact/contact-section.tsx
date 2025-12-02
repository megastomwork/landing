'use client';

import { useContacts } from '@/shared/hooks/use-contacts';
import { useSocials } from '@/shared/hooks/use-socials';
import { Loader2, PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionProps } from '@/shared/types/page.types';

type PageContactSectionProps = SectionProps<'contact'>;

export function PageContactSection({
  title,
  description,
  image,
}: PageContactSectionProps) {
  const contacts = useContacts();
  const socials = useSocials();

  if (contacts.isLoading || socials.isLoading) {
    return (
      <section className="bg-white px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      </section>
    );
  }

  const imageData = typeof image === 'object' ? image : null;

  return (
    <section className="bg-white px-4 py-4">
      <div className="mx-auto grid max-w-6xl items-center gap-4 md:grid-cols-2">
        {imageData?.url && (
          <div className="overflow-hidden rounded-xl shadow-lg">
            <Image
              src={imageData.url}
              alt={imageData.alt || 'Contact image'}
              width={imageData.width || 400}
              height={imageData.height || 400}
              className="max-h-[700px] w-full object-cover"
            />
          </div>
        )}
        <div className="w-full text-center">
          {title && (
            <h2 className="mb-3 text-3xl leading-snug font-extrabold text-black md:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mb-6 text-base text-gray-700 md:text-2xl">
              {description}
            </p>
          )}

          {contacts.data?.phone && (
            <div className="mb-6">
              <p className="mb-2 text-center text-base text-gray-600 md:text-2xl">
                За номер телефона:
              </p>
              <a
                href={`tel:${contacts.data.phone}`}
                className="flex items-center justify-center gap-3 text-xl font-semibold text-black transition hover:text-cyan-600 md:text-2xl"
              >
                <PhoneIcon className="h-6 w-6" />
                {contacts.data.phone}
              </a>
            </div>
          )}

          {socials.data && socials.data.length > 0 && (
            <>
              <p className="mb-4 flex justify-center text-base text-gray-600 md:text-xl">
                Написати нам у соц. мережах:
              </p>
              <div className="flex justify-center">
                <div className="flex flex-col gap-4 text-xl font-bold text-black md:text-2xl">
                  {socials.data.map(item => {
                    const media =
                      typeof item.icon === 'object' ? item.icon : null;
                    if (!media?.url) return null;

                    return (
                      <Link
                        key={item.id}
                        href={item.link}
                        className="flex items-center gap-3 transition hover:text-cyan-600"
                        target="_blank"
                        rel="noopener noreferrer"
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
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
