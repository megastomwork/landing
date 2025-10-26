import { Card } from '@/shared/components/ui-kit/card';
import { Services } from '@/shared/types/services.types';
import { cn } from '@/shared/lib/css';
import { DirectusImage } from '@/shared/components/ui-kit/directus-image';

export default function ServicesCard({ service }: { service: Services }) {
  return (
    <Card
      className={cn(
        'flex h-full min-h-[280px] flex-col items-center overflow-hidden rounded-2xl border-none bg-cyan-100 p-6 shadow-none transition-all duration-150 ease-in-out',
      )}
    >
      <div className="mb-4 rounded-2xl bg-white p-2">
        <DirectusImage
          src={service.IconImage}
          alt={service.Title}
          width={65}
          height={65}
        />
      </div>
      <h3 className="mb-2 text-center text-xl font-bold">{service.Title}</h3>
      <p className={cn('text-center text-base')}>{service.Description}</p>
    </Card>
  );
}
