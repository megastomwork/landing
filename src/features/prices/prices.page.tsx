'use client';

import { useServices } from '@/features/home';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui-kit/accordion';
import { Table, TableCell, TableRow } from '@/shared/components/ui-kit/table';
import { Underline } from '@/shared/components/ui-kit/underline';
import { useContent } from '@/shared/hooks/use-content';
import { ContentTextPricesPage } from '@/shared/types/content.types';
import { usePrices } from './use-prices';

export function PricesPage() {
  const { services } = useServices();
  const prices = usePrices();
  const content = useContent<ContentTextPricesPage>({
    context: 'pricesPage',
  });

  return (
    <section className="pt-10">
      <div className="bg-accent-80">
        <div className="mx-auto max-w-6xl space-y-2 px-2 py-6 text-center">
          <h1 className="text-3xl font-bold">
            <Underline underlineClassName="w-[120px] right-0 left-auto -bottom-1">
              {content.data?.pageTitle}
            </Underline>
          </h1>
          <p>{content.data?.pageDescription}</p>
        </div>
      </div>

      {services?.length && (
        <Accordion
          type="multiple"
          className="mx-auto w-2/3 max-w-6xl px-2 py-10"
          defaultValue={[services[0].id]}
        >
          {services?.map(service => {
            console.log(prices.data?.[service.id]);
            if (prices.data?.[service.id] == undefined) {
              return null;
            }

            return (
              <AccordionItem
                key={service.id}
                value={service.id}
                className="pl-0"
              >
                <AccordionTrigger className="">
                  {service.Title}
                </AccordionTrigger>
                <AccordionContent className="py-5">
                  <Table>
                    {prices.data?.[service.id]?.map(price => (
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
            );
          })}
        </Accordion>
      )}
    </section>
  );
}
