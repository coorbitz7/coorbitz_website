import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Magnetic } from "@/components/shared/magnetic";
import { SplitReveal } from "@/components/shared/split-reveal";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { HeroVisual } from "@/components/sections/hero-visual";

const capabilities = ["Web platforms", "Internal tools", "AI agents", "Data pipelines", "Automation"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      <div aria-hidden className="grid-paper absolute inset-0" />
      <Container className="relative grid items-center gap-12 pb-16 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-6">
          <p className="eyebrow">Software · AI · Automation</p>
          <h1 className="mt-5 font-heading text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem] xl:text-[3.9rem]">
            <SplitReveal text="Custom software, AI and automation, built for how your business actually works." />
          </h1>
          <RevealOnScroll delay={0.35} y={12}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Coorbitz is the software and AI brand of Coordinatez, with teams in Chicago and
              Mehsana. We design and build web platforms, internal tools, AI agents and data
              systems for startups and growing companies, and we stay on to run them.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.5} y={12} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <Button asChild size="lg" className="h-11 px-6 text-base">
                <Link href="/contact">
                  Start a project <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline" className="h-11 px-6 text-base">
              <Link href="#how-we-build">See how we build</Link>
            </Button>
          </RevealOnScroll>
          <RevealOnScroll delay={0.65} y={8}>
            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
              {capabilities.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden className="size-1.5 rounded-full bg-brand-sky" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>

        <div className="lg:col-span-6">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
