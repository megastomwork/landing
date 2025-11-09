import { Card } from '@/shared/components/ui-kit/card';
import { PayloadImage } from '@/shared/components/ui-kit/directus-image';
import { cn } from '@/shared/lib/css';
import { getPayloadImageUrl } from '@/shared/lib/payload-image';
import { Service } from '@/shared/payload/payload-types';

export default function ServicesCard({ service }: { service: Service }) {
  return (
    <Card
      className={cn(
        'flex h-full min-h-[280px] flex-col items-center overflow-hidden rounded-2xl border-none bg-cyan-100 p-6 shadow-none transition-all duration-150 ease-in-out',
      )}
    >
      <div className="mb-4 rounded-2xl bg-white p-2">
        <PayloadImage
          src={getPayloadImageUrl(service.iconImage)}
          alt={service.title}
          width={65}
          height={65}
        />
      </div>
      <h3 className="mb-2 text-center text-xl font-bold">{service.title}</h3>
      <p className={cn('text-center text-base')}>{service.description}</p>
    </Card>
  );
}
