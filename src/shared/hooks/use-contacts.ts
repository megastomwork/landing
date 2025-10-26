import client from '@/shared/lib/directus'
import { Contact } from '@/shared/types/contact.types'
import { readItems } from '@directus/sdk'
import { useQuery } from '@tanstack/react-query'

export const useContacts = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: () => client.request<Contact>(readItems('Contacts')),
  });
};
