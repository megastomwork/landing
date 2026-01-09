'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="inline-block">
      <Image
        src="/logo.svg"
        alt="Логотип"
        width={201}
        height={88.38}
        priority
      />
    </Link>
  );
}
