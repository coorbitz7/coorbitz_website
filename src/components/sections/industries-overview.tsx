import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { Button } from "@/components/ui/button";
import { industries } from "@/data/industries";

export function IndustriesOverview() {
  return (
    <section className="section-y bg-muted/30">
      <Container>
        <SectionHeading
          eyebrow="Who We Serve"
          title="Purpose-Built for Every Industry"
          description="Deep domain experience across 15 industries — we speak your business language, not just code."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry, index) => (
            <RevealOnScroll key={industry.id} delay={(index % 5) * 0.06}>
              <Link
                href={`/industries#${industry.id}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                  <industry.icon className="size-5" />
                </div>
                <span className="text-sm font-medium">{industry.title}</span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link href="/industries">
              Explore All Industries <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
