import type { Media } from '@/shared/payload/payload-types';
import { DoctorItemCard } from './doctor-card';

type DoctorCardListProps = {
  photo: number | Media;
  name: string;
  position: string;
  experience: string;
};

export const DoctorCardList = (props: DoctorCardListProps) => {
  return <DoctorItemCard {...props} variant="list" />;
};
