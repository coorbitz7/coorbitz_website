import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { faqJsonLd } from "@/lib/seo";
import { faqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <section id="faq" className="section-y scroll-mt-24 border-b bg-card">
      <JsonLd data={faqJsonLd(faqs)} />
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            index="08"
            eyebrow="Questions"
            title="Things people ask before they hire us."
            description="Short answers. If yours isn't here, ask — we'd rather answer it than have you guess."
          />
        </div>
        <RevealOnScroll delay={0.1} className="lg:col-span-8">
          <Accordion type="single" collapsible className="w-full border-t">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="py-5 text-left font-heading text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
