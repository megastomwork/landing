interface FeedbackSectionHeaderProps {
  title?: string | null;
}

export default function FeedbackSectionHeader({ title }: FeedbackSectionHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center md:items-start">
      <h2 className="relative mb-6 text-3xl font-bold md:text-6xl">
        {title}
        <span className="absolute bottom-[-6px] left-0 h-1 w-[70px] rounded-full bg-cyan-400" />
      </h2>
    </div>
  );
}
