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

  if (!contacts.data?.address && !contacts.data?.addressOnMap?.coordinates) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center rounded-xl bg-gray-100 text-gray-500">
        Карта недоступна
      </div>
    );
  }

  const address = contacts.data.googleAddress;

  const searchQuery = `Megastom, ${address}`;
  const encodedSearchQuery = encodeURIComponent(searchQuery);

  const mapSrc = `https://www.google.com/maps?q=${encodedSearchQuery}&hl=uk&z=17&output=embed`;

  return (
    <div className="grow overflow-hidden rounded-xl shadow-md">
      <iframe
        src={mapSrc}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Розташування клініки Megastom"
      ></iframe>
    </div>
  );
}
