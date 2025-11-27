import { Media } from '@/shared/payload/payload-types';

export type Social = {
  id: number;
  title: string;
  link: string;
  icon: number | Media;
  updatedAt: string;
  createdAt: string;
};
