import { ROUTES } from '@/shared/constants/routes.constants';
import { useContent } from '@/shared/hooks/use-content';
import { ContentTextHomePage } from '@/shared/types/content.types';
import Link from 'next/link';

export default function BlogMoreLink() {
  const content = useContent<ContentTextHomePage>({
    context: 'HomePage',
  });

  return (
    <div className="mt-8 flex w-full justify-center">
      <Link
        href={ROUTES.ARTICLES}
        className="inline-block rounded-full bg-[#CCF2F4] px-6 py-3 font-bold text-black transition-colors duration-300 hover:bg-[#80E1FF]"
      >
        {content?.data?.blogButton}
      </Link>
    </div>
  );
}
