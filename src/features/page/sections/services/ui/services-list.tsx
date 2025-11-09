import ServicesCard from './services-card';
import { Service } from '@/shared/payload/payload-types';

export default function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="flex w-full flex-col gap-4 md:hidden">
      {services.map(service => (
        <ServicesCard key={service.id} service={service} />
      ))}
    </div>
  );
}
