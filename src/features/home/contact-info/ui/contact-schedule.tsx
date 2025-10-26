import { WorkingHoursList } from '@/features/working-hours';

export default function ContactSchedule() {
  return (
    <>
      <p className="py-2 text-center text-2xl font-semibold">Часи роботи</p>
      <WorkingHoursList />
    </>
  );
}
