import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export function ServicesOverview() {
  return (
    <section className="section-y">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="From Custom Software to AI Agents"
          description="From custom software to autonomous AI agents — everything you need to build, automate, and scale under one roof."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 9).map((service, index) => (
            <RevealOnScroll key={service.id} delay={(index % 3) * 0.08}>
              <Link
                href={`/services#${service.id}`}
                className="group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-brand text-white transition-transform group-hover:scale-110">
                  <service.icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {service.shortDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Learn more{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link href="/services">
              View All 14 Services <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
