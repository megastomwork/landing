'use client';

import ContactDetails from './ui/contact-details';
import ContactMap from './ui/contact-map';
import ContactSchedule from './ui/contact-schedule';
import { SectionProps } from '@/shared/types/page.types';
import { Underline } from '@ui/underline';

type ContactInfoSectionProps = SectionProps<'contact-info'>;

export function ContactInfoSection({ title }: ContactInfoSectionProps) {
  const showMap = true;
  return (
    <section className="mx-auto flex max-w-[1150px] flex-col items-center bg-white px-4 pb-12">
      <div className="flex w-full flex-col items-center justify-between text-center md:items-start">
        <h2 className="relative mb-6 text-3xl font-bold md:text-6xl">
          <Underline variant="accent">{title || 'Контакти'}</Underline>
        </h2>
      </div>

      <div className="flex w-full flex-col gap-10 lg:flex-row">
        {showMap && <ContactMap />}
        <div className="flex w-[30%] flex-col items-center py-2 md:py-7">
          <ContactDetails />
          <ContactSchedule />
        </div>
      </div>
    </section>
  );
}
