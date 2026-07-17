import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServiceSection({ service, index }: { service: Service; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <section
      id={service.id}
      className={cn("scroll-mt-24 border-b py-16 sm:py-20", index % 2 === 0 && "bg-muted/30")}
    >
      <Container>
        <div className={cn("grid gap-10 lg:grid-cols-2 lg:items-start", reversed && "lg:[&>*:first-child]:order-2")}>
          <RevealOnScroll>
            <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg">
              <service.icon className="size-7" />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">{service.title}</h2>
            <p className="mt-4 text-muted-foreground">{service.overview}</p>

            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Technologies</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="rounded-full font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">Industries Served</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {service.industriesServed.map((industry) => (
                  <Badge key={industry} variant="outline" className="rounded-full font-normal">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>

            <Button asChild size="lg" className="mt-8 rounded-full px-8">
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`}>
                Get Started with {service.title} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-semibold">
                <Sparkles className="size-4 text-primary" /> Key Features
              </h3>
              <ul className="mt-4 space-y-2.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-semibold">
                <Sparkles className="size-4 text-secondary" /> Benefits
              </h3>
              <ul className="mt-4 space-y-2.5">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-secondary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
