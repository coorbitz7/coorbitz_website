import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { Magnetic } from "@/components/shared/magnetic";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function ContactCta() {
  return (
    <section className="bg-primary text-primary-foreground">
      <Container className="grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-24">
        <RevealOnScroll className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground/70">Next step</p>
          <h2 className="mt-4 font-heading text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Have a problem worth solving?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
            Tell us what’s slow, manual or broken. We’ll read it properly and reply with questions,
            not a sales deck.
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1} className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
          <Magnetic>
            <Button
              asChild
              size="lg"
              className="h-11 bg-background px-6 text-base text-foreground hover:bg-background/90"
            >
              <Link href="/contact">
                Start a project <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Magnetic>
          <a
            href={`mailto:${siteConfig.email.contact}`}
            className="font-mono text-sm text-primary-foreground/80 underline-offset-4 hover:underline"
          >
            or email {siteConfig.email.contact}
          </a>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
