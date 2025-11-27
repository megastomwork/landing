import { SectionProps } from '@/shared/types/page.types';

type DescriptionSectionProps = SectionProps<'description'>;

export function DescriptionSection({ text, title }: DescriptionSectionProps) {
  return (
    <section className="bg-accent-60 py-10">
      {title && (
        <h2 className="mx-auto mb-6 max-w-4xl px-4 text-center text-2xl font-bold text-gray-900 sm:text-4xl">
          {title}
        </h2>
      )}
      <div className="mx-auto max-w-4xl px-4 text-center text-sm leading-relaxed text-gray-800 sm:text-xl">
        {text}
      </div>
    </section>
  );
}
