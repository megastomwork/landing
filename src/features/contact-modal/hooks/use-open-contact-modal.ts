'use client';

import { useRouter, usePathname } from 'next/navigation';

export function useOpenContactModal() {
  const router = useRouter();
  const pathname = usePathname();

  const openModal = () => {
    router.push(`${pathname}?modal=contact`, { scroll: false });
  };

  return openModal;
}
