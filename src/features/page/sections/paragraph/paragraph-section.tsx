import { SectionProps } from '@/shared/types/page.types';

type ParagraphSectionProps = SectionProps<'paragraph'>;

export function ParagraphSection({ title, content }: ParagraphSectionProps) {
  return (
    <section className="bg-accent-60 py-10">
      <div className="mx-auto max-w-4xl px-4 text-center">
        {title && (
          <h2 className="mt-0 mb-6 text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h2>
        )}
        <p className="text-sm text-gray-800 sm:text-xl">{content}</p>
      </div>
    </section>
  );
}
