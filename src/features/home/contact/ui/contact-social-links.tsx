import { Skeleton } from '@/shared/components/ui-kit/skeleton';
import { useSocials } from '@/shared/hooks/use-socials';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactSocialLinks() {
  const socials = useSocials();

  if (socials.isLoading) {
    return <Skeleton className="h-4 w-full" />;
  }

  return (
    <>
      <p className="mb-4 flex justify-center text-base text-gray-600 md:text-xl">
        Написати нам у соц. мережах:
      </p>
      <div className="flex justify-center">
        <div className="flex flex-col gap-4 text-xl font-bold text-black md:text-2xl">
          {socials.data?.map(item => {
            const media = typeof item.icon === 'object' ? item.icon : null;
            if (!media?.url) return null;

            return (
              <Link
                key={item.id}
                href={item.link}
                className="flex items-center gap-3 transition hover:text-cyan-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={media.url}
                  width={32}
                  height={32}
                  alt={item.title}
                  className="h-8 w-8 object-contain"
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
