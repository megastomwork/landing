'use client';

import { Button } from '@/shared/components/ui-kit/button';
import { useOpenContactModal } from '@/features/contact-modal/hooks/use-open-contact-modal';

export default function ButtonHeader() {
  const openModal = useOpenContactModal();
  return (
    <div>
      <Button variant="header" size="default" onClick={openModal}>
        <p className="font-sans text-base font-bold">Зв’язатись з нами</p>
      </Button>
    </div>
  );
}
