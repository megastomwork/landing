import { Underline } from '@/shared/components/ui-kit/underline';

interface FeedbackSectionHeaderProps {
  title?: string | null;
}

export default function FeedbackSectionHeader({
  title,
}: FeedbackSectionHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center md:items-start">
      <h2 className="relative mb-6 text-3xl font-bold md:text-6xl">
        <Underline variant="accent">{title}</Underline>
      </h2>
    </div>
  );
}
