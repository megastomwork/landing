import payloadAPI from '@/shared/lib/payload-rest';
import { useQuery } from '@tanstack/react-query';
import { Contact } from '../payload/payload-types';

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: () => payloadAPI.getGlobal<Contact>('contacts'),
  });
};
