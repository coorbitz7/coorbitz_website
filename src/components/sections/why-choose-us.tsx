import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { whyChooseUs } from "@/data/tech-stack";

export function WhyChooseUs() {
  return (
    <section className="section-y">
      <Container>
        <SectionHeading
          eyebrow="Why Coorbitz"
          title="A Technology Partner, Not Just a Vendor"
          description="Here's what clients consistently point to when asked why they chose — and stayed with — Coorbitz."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, index) => (
            <RevealOnScroll key={item.title} delay={(index % 3) * 0.08}>
              <div className="flex h-full gap-4 rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
