'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Modal from './contact-modal';

export function ClientModalHandler() {
  const searchParams = useSearchParams();
  const isContactModal = searchParams.get('modal') === 'contact';
  const pathname = usePathname();
  const router = useRouter();

  const closeModal = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <AnimatePresence>
      {isContactModal && <Modal onClose={closeModal} />}
    </AnimatePresence>
  );
}
