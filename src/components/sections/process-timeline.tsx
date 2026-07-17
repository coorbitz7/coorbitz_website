import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { processSteps } from "@/data/tech-stack";

export function ProcessTimeline() {
  return (
    <section className="section-y bg-muted/30">
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="Our Process"
          description="A proven, transparent delivery process from first conversation to long-term partnership."
        />

        <div className="relative mt-16 grid gap-8 lg:grid-cols-5">
          <div
            className="absolute top-6 left-0 hidden h-px w-full bg-gradient-to-r from-primary/40 via-secondary/40 to-transparent lg:block"
            aria-hidden
          />
          {processSteps.map((step, index) => (
            <RevealOnScroll key={step.step} delay={index * 0.1} className="relative">
              <div className="flex size-12 items-center justify-center rounded-full bg-gradient-brand text-lg font-bold text-white">
                {step.step}
              </div>
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{step.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
