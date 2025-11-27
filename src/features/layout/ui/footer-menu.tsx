'use client';

import Link from 'next/link';
import { useMainMenu } from '../hooks/use-menu';

export const FooterMenu = () => {
  const { data: menu, isLoading } = useMainMenu();

  return (
    <div>
      <p className="mb-3 text-base font-bold">Меню:</p>
      <div className="flex flex-col gap-2">
        {menu?.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="text-base leading-5 hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
