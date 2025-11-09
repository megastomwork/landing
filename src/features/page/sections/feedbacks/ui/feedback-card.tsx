import { Card, CardContent } from '@/shared/components/ui-kit/card';
import { Feedbacks } from '@/shared/types/feedbacks.types';
import { Star } from 'lucide-react';

export const FeedbackCard = ({ feedbacks }: { feedbacks: Feedbacks }) => {
  return (
    <Card className="w-full rounded-2xl border-none bg-cyan-100 px-6 py-6 shadow-none">
      <CardContent className="flex flex-col items-center pb-0 text-center">
        <div className="mb-2 flex justify-center text-cyan-400">
          {Array.from({ length: feedbacks.Stars }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-cyan-400" />
          ))}
        </div>
        <p className="mb-2 text-xl font-bold">{feedbacks.ClientName}</p>
        <p className="whitespace-pre-wrap text-base text-gray-800">
          {feedbacks.Content}
        </p>
      </CardContent>
    </Card>
  );
};
