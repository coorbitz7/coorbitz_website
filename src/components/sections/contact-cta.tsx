import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-brand" aria-hidden />
      <GradientBlob className="left-[-5%] top-[-20%] size-96 bg-white/20" />
      <GradientBlob className="right-[-8%] bottom-[-25%] size-96 bg-white/10" />

      <Container className="relative text-center text-white">
        <RevealOnScroll>
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Ready to Transform Your Business with AI & Technology?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-balance text-lg text-white/85">
            Book a free consultation and get a clear roadmap for your next digital project — no
            obligation, no pressure.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white px-8 text-base text-primary hover:bg-white/90"
            >
              <Link href="/contact">
                Get Free Consultation <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/40 bg-transparent px-8 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
