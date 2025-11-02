import { useQuery } from '@tanstack/react-query';
import payloadAPI from '@/shared/lib/payload-rest';
import { Schedule } from '@/shared/types/schedule.types';

export const useWorkingHours = () => {
  return useQuery({
    queryKey: ['working-hours'],
    queryFn: () => payloadAPI.getCollection<Schedule>('schedule'),
  });
};
