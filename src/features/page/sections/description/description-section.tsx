interface DescriptionSectionProps {
  text: string
}

export function DescriptionSection({ text }: DescriptionSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4">
      <p className="text-lg text-gray-700">{text}</p>
    </section>
  )
}
