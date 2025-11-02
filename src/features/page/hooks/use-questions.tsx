import payloadAPI from '@/shared/lib/payload-rest';
import { Question } from '@/shared/types/question.types';
import { useQuery } from '@tanstack/react-query';

export const useQuestions = () => {
  return useQuery({
    queryKey: ['questions'],
    queryFn: () => payloadAPI.getCollection<Question>('questions'),
  });
};
