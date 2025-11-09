import { Services } from '@/shared/types/services.types';
import ServicesCard from './services-card';

export default function ServicesList({ services }: { services: Services[] }) {
  return (
    <div className="flex w-full flex-col gap-4 md:hidden">
      {services.map(service => (
        <ServicesCard key={service.id} service={service} />
      ))}
    </div>
  );
}
