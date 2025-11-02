import payloadAPI from '@/shared/lib/payload-rest'
import { Contact } from '@/shared/types/contact.types'
import { useQuery } from '@tanstack/react-query'

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: () => payloadAPI.getGlobal<Contact>('contacts'),
  });
};
