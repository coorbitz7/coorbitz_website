import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { industries } from "@/data/industries";

export function IndustriesOverview() {
  return (
    <section className="section-y border-b bg-card">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            index="04"
            eyebrow="Industries"
            title="Where we tend to help."
            description="We don't claim expertise in every sector. These are the kinds of businesses whose problems we've actually worked on, and what that work usually looks like."
          />
          <RevealOnScroll delay={0.1}>
            <Link
              href="/industries"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Industries in detail <ArrowRight className="size-4" aria-hidden />
            </Link>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.1} className="lg:col-span-8">
          <ol className="divide-y border-y">
            {industries.map((industry, index) => (
              <li key={industry.id} className="grid gap-3 py-6 sm:grid-cols-12 sm:gap-6">
                <span className="font-mono text-xs text-muted-foreground sm:col-span-1 sm:pt-1.5">0{index + 1}</span>
                <div className="sm:col-span-4">
                  <Link
                    href={`/industries#${industry.id}`}
                    className="inline-flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight transition-colors hover:text-primary"
                  >
                    <industry.icon className="size-4 shrink-0 text-brand-sky" aria-hidden />
                    {industry.title}
                  </Link>
                </div>
                <div className="sm:col-span-7">
                  <p className="text-sm leading-relaxed text-muted-foreground">{industry.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`Where we help in ${industry.title}`}>
                    {industry.examples.map((example) => (
                      <li key={example} className="rounded-md border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
