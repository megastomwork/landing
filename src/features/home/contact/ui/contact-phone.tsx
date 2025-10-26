import { useContacts } from '@/shared/hooks/use-contacts';
import { Loader2, PhoneIcon } from 'lucide-react';

export default function ContactPhone() {
  const contacts = useContacts();

  if (contacts.isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <div className="mb-6">
      <p className="mb-2 text-center text-base text-gray-600 md:text-2xl">
        За номер телефона:
      </p>
      <a
        href={`tel:${contacts.data?.phone}`}
        className="flex items-center justify-center gap-3 text-xl font-semibold text-black transition hover:text-cyan-600 md:text-2xl"
      >
        <PhoneIcon className="h-6 w-6" />
        {contacts.data?.phone}
      </a>
    </div>
  );
}
