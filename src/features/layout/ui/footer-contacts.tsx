'use client';

import { WorkingHoursList } from '@/features/working-hours';
import { useContacts } from '@/shared/hooks/use-contacts';
import { clearAddressSyntax } from '@/shared/utils/addrutils/address';
import { Loader2, PhoneIcon } from 'lucide-react';

export const FooterContacts = () => {
  const contacts = useContacts();

  if (contacts.isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="flex w-[250px] flex-col items-center gap-2">
      <a
        href="https://maps.app.goo.gl/6e3fJX2cnjjCzGnh9"
        target="_blank"
        className="text-center font-bold"
      >
        {clearAddressSyntax(contacts.data?.address)}
      </a>
      <a href={`tel:${contacts.data?.phone}`} className="flex gap-2">
        <PhoneIcon />
        {contacts.data?.phone}
      </a>
      <div>
        <div className="mb-2 text-center font-bold">Часи роботи</div>
        <WorkingHoursList size="small" />
      </div>
    </div>
  );
};
