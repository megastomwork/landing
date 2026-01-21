'use client';

import { useContacts } from '@/shared/hooks/use-contacts';
import { useSocials } from '@/shared/hooks/use-socials';
import { Loader2, PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionProps } from '@/shared/types/page.types';
import { FormatedTextWithUnderline } from '../contact-info/ui/formated-address-with-underline';

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
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-[50px]">
        {imageData?.url && (
          <div className="h-[588px] w-[424px] shrink-0 overflow-hidden rounded-[20px]">
            <Image
              src={imageData.url}
              alt={imageData.alt || 'Contact image'}
              width={imageData.width || 1000}
              height={imageData.height || 1000}
              className="h-[635px] w-full object-cover object-center"
            />
          </div>
        )}
        <div className="flex w-[516px] flex-col items-center gap-4">
          {title && (
            <div className="flex flex-col gap-6">
              <h2 className="text-center text-[48px] leading-[150%] font-semibold text-[#060606]">
                <FormatedTextWithUnderline>{title}</FormatedTextWithUnderline>
              </h2>
              {description && (
                <p className="text-center text-[20px] leading-[24px] text-[#060606]">
                  {description}
                </p>
              )}
            </div>
          )}

          {contacts.data?.phone && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-center text-[20px] leading-[24px] text-[#060606]">
                За номер телефона:
              </p>
              <a
                href={`tel:${contacts.data.phone}`}
                className="flex items-center gap-3 text-[24px] leading-[150%] font-medium text-[#060606] transition hover:text-cyan-600"
              >
                <PhoneIcon className="h-9 w-9" strokeWidth={2} />
                {contacts.data.phone}
              </a>
            </div>
          )}

          {socials.data && socials.data.length > 0 && (
            <div className="flex flex-col items-center gap-[15px]">
              <p className="text-center text-[20px] leading-[24px] text-[#060606]">
                Написати нам у соц. мережах:
              </p>
              <div className="flex flex-col items-start gap-[9px]">
                {socials.data.map(item => {
                  const media =
                    typeof item.icon === 'object' ? item.icon : null;
                  if (!media?.url) return null;

                  return (
                    <Link
                      key={item.id}
                      href={item.link}
                      className="flex items-center gap-[10px] text-[24px] leading-[150%] font-medium text-[#060606] transition hover:text-cyan-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex h-[42px] w-[42px] items-center justify-center rounded-[9px] bg-white">
                        <Image
                          src={media.url}
                          width={42}
                          height={42}
                          alt={item.title}
                          className="h-[42px] w-[42px] object-contain"
                        />
                      </span>
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
