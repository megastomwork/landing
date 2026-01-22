import type { Media } from '@/shared/payload/payload-types';
import { DoctorItemCard } from './doctor-card';

type DoctorCardGridProps = {
  photo: number | Media;
  name: string;
  position: string;
  experience: string;
};

export const DoctorCardGrid = (props: DoctorCardGridProps) => {
  return <DoctorItemCard {...props} variant="grid" />;
};
