import { useContacts } from '@/shared/hooks/use-contacts';
import { Loader2, PhoneIcon } from 'lucide-react';
import { FormatedTextWithUnderline } from './formated-address-with-underline';

export default function ContactDetails() {
  const contacts = useContacts();

  if (contacts.isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="flex-1 py-2 text-xl text-black">
      <div className="flex flex-col items-center text-center">
        <h2 className="relative mt-0 text-xl leading-[150%] font-bold">
          <FormatedTextWithUnderline>
            {contacts.data?.address || ''}
          </FormatedTextWithUnderline>
        </h2>
      </div>

      <div className="flex items-center justify-center gap-2 text-center">
        <PhoneIcon className="size-6" />
        <a href={`tel:${contacts.data?.phone}`} className="hover:text-cyan-600">
          {contacts.data?.phone}
        </a>
      </div>
    </div>
  );
}
