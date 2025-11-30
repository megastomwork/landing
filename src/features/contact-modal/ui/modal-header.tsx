import { Underline } from '@/shared/components/ui-kit/underline';
import { useScrollModalSettings } from '../hooks/use-scroll-modal-settings';
import { Loader2 } from 'lucide-react';

export default function ModalHeader() {
  const { data: settings, isLoading } = useScrollModalSettings();

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  return (
    <>
      <h2 className="text-3xl font-extrabold leading-snug text-black md:text-4xl">
        <Underline>{settings?.title}</Underline>
      </h2>
      <p className="mt-4 text-sm text-gray-700 md:text-base">
        {settings?.description}
      </p>
    </>
  );
}
