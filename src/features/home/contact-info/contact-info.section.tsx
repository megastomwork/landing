'use client';

import { useContent } from '@/shared/hooks/use-content';
import { ContentTextHomePage } from '@/shared/types/content.types';
import ContactDetails from './ui/contact-details';
import ContactMap from './ui/contact-map';
import ContactSchedule from './ui/contact-schedule';

export default function ContactInfoSection() {
  const content = useContent<ContentTextHomePage>({
    context: 'homePage',
  });

  return (
    <section className="mx-auto flex max-w-[1150px] flex-col items-center bg-white px-4 pb-12">
      <div className="flex w-full flex-col items-center justify-between text-center md:items-start">
        <h2 className="relative mb-6 text-3xl font-bold md:text-6xl">
          {content?.data?.contactTitle}
          <span className="absolute bottom-[-6px] left-0 h-1 w-[70px] rounded-full bg-cyan-400" />
        </h2>
      </div>
      <div className="flex w-full flex-col gap-10 lg:flex-row">
        <ContactMap />
        <div className="flex w-[35%] flex-col items-center py-2 md:py-7">
          <ContactDetails />
          <ContactSchedule />
        </div>
      </div>
    </section>
  );
}
