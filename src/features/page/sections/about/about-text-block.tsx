import { Button } from '@/shared/components/ui-kit/button'
import AboutStats from './about-stats'
import { useOpenContactModal } from '@/features/contact-modal/hooks/use-open-contact-modal'

interface Stat {
  value: string
  label: string
  id?: string
}

interface AboutTextBlockProps {
  title: string
  description: string
  stats?: Stat[]
}

export default function AboutTextBlock({ title, description, stats }: AboutTextBlockProps) {
  const openModal = useOpenContactModal()

  return (
    <section className="bg-white px-4 py-4 md:py-12">
      <div className="mx-auto max-w-xl text-left md:text-left">
        <div className="flex flex-col items-center text-center md:items-start">
          <h2 className="relative mb-4 text-3xl font-bold md:text-6xl">
            {title}
          </h2>
        </div>

        <p className="mb-8 text-base leading-relaxed text-gray-700 sm:text-xl">
          {description}
        </p>

        <AboutStats stats={stats} />

        <div className="flex justify-center">
          <Button variant="header" size="default" onClick={openModal}>
            <p className="font-sans text-base font-bold">Зв'язатись з нами</p>
          </Button>
        </div>
      </div>
    </section>
  )
}
