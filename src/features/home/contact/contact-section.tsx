'use client';

import ContactHeader from './ui/contact-header';
import ContactImage from './ui/contact-image';
import ContactPhone from './ui/contact-phone';
import ContactSocialLinks from './ui/contact-social-links';

export default function ContactSection() {
  return (
    <section className="bg-white px-4 py-4">
      <div className="mx-auto grid max-w-6xl items-center gap-4 md:grid-cols-2">
        <ContactImage />
        <div className="w-full text-center">
          <ContactHeader />
          <ContactPhone />
          <ContactSocialLinks />
        </div>
      </div>
    </section>
  );
}
