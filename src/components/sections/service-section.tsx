import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ServiceSchematic } from "@/components/shared/service-schematic";
import { Button } from "@/components/ui/button";
import type { Service } from "@/data/services";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";

export function ServiceSection({ service, index }: { service: Service; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <section
      id={service.id}
      className={cn("scroll-mt-32 border-b py-16 sm:py-20", reversed && "bg-card")}
    >
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <RevealOnScroll className={cn("lg:col-span-5", reversed && "lg:order-2")}>
          <p className="eyebrow">
            <span className="text-muted-foreground">0{index + 1}</span>
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{service.title}</h2>
          <p className="mt-3 text-lg text-foreground/80">{service.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted-foreground">{service.overview}</p>
          <ServiceSchematic kind={service.schematic} className="mt-8 h-40 w-full max-w-sm text-primary" />
          <Button asChild size="lg" className="mt-8 h-11 px-6">
            <Link
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              aria-label={`Talk to us about ${service.title}`}
            >
              Talk to us about this <ArrowRight className="size-4" />
            </Link>
          </Button>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className={cn("grid gap-10 sm:grid-cols-2 lg:col-span-7", reversed && "lg:order-1")}>
          <div className="border-t pt-5">
            <h3 className="eyebrow text-muted-foreground">What we build</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {service.whatWeBuild.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-sky" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-10">
            <div className="border-t pt-5">
              <h3 className="eyebrow text-muted-foreground">Typically for</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {service.industriesServed.map((name) => {
                  const industry = industries.find((entry) => entry.title === name);
                  return (
                    <li key={name}>
                      {industry ? (
                        <Link href={`/industries#${industry.id}`} className="underline-offset-4 hover:text-primary hover:underline">
                          {name}
                        </Link>
                      ) : (
                        name
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="border-t pt-5">
              <h3 className="eyebrow text-muted-foreground">Technologies</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {service.technologies.map((tech) => (
                  <li key={tech} className="rounded-md border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
