import { useContacts } from '@/shared/hooks/use-contacts';
import { Loader2 } from 'lucide-react';

export default function ContactMap() {
  const contacts = useContacts();

  if (contacts.isLoading) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-xl bg-gray-100">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!contacts.data?.iframeSrc) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-xl bg-gray-100 text-gray-500">
        Карта недоступна
      </div>
    );
  }

  const address = 'Megastom, ' + contacts.data.address;
  const encodedAddress = encodeURIComponent(address);

  const mapSrc = `https://www.google.com/maps?q=${encodedAddress}&hl=uk&z=17&output=embed`;

  return (
    <div className="grow overflow-hidden rounded-xl shadow-md">
      <iframe
        src={contacts.data.iframeSrc}
        width="100%"
        height="350"
        loading="lazy"
        allowFullScreen={true}
        title="Розташування клініки Megastom"
      ></iframe>
    </div>
  );
}
