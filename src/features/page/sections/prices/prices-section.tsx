'use client'

import { useServices } from '@/features/page/hooks/use-services'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui-kit/accordion'
import { Table, TableCell, TableRow } from '@/shared/components/ui-kit/table'
import { Underline } from '@/shared/components/ui-kit/underline'
import { usePrices } from '@/features/page/hooks/use-prices'
import { SectionProps } from '@/shared/types/page.types'

type PricesSectionProps = SectionProps<'prices'>

export function PricesSection({ title, description }: PricesSectionProps) {
  const { services } = useServices()
  const prices = usePrices()

  return (
    <section className="pt-10">
      <div className="bg-accent-80">
        <div className="mx-auto max-w-6xl space-y-2 px-2 py-6 text-center">
          <h1 className="text-3xl font-bold">
            <Underline underlineClassName="w-[120px] right-0 left-auto -bottom-1">
              {title || 'Prices'}
            </Underline>
          </h1>
          {description && <p>{description}</p>}
        </div>
      </div>

      {services?.length && (
        <Accordion
          type="multiple"
          className="mx-auto w-2/3 max-w-6xl px-2 py-10"
          defaultValue={[String(services[0].id)]}
        >
          {services?.map((service) => {
            if (prices.data?.[service.id] == undefined) {
              return null
            }

            return (
              <AccordionItem
                key={service.id}
                value={String(service.id)}
                className="pl-0"
              >
                <AccordionTrigger className="">
                  {service.title}
                </AccordionTrigger>
                <AccordionContent className="py-5">
                  <Table>
                    {prices.data?.[service.id]?.map((price) => (
                      <TableRow
                        key={price.id}
                        className="border-none hover:bg-transparent"
                      >
                        <TableCell className="pl-0">{price.title}</TableCell>
                        <TableCell>{price.price}</TableCell>
                      </TableRow>
                    ))}
                  </Table>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      )}
    </section>
  )
}
