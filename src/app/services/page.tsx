import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ServicesQuickNav } from "@/components/sections/services-quick-nav";
import { ServiceSection } from "@/components/sections/service-section";
import { ContactCta } from "@/components/sections/contact-cta";
import { services } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Explore Coorbitz's 14 IT and AI services — from web and mobile development to AI agents, business automation, and cloud solutions.",
  path: "/services",
  keywords: [
    "IT services company",
    "software development company",
    "AI integration company",
    "business automation company",
    "custom software development",
    "AI chatbot development",
    "web development company Chicago",
    "software development company Mehsana Gujarat",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
          ...services.map((service) => serviceJsonLd(service)),
        ]}
      />
      <section className="py-16 text-center sm:py-20">
        <Container>
          <RevealOnScroll>
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              Our Services
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Technology & AI Services Built to Move the Needle
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
              14 specialized services, one accountable team — from first line of code to
              production-grade AI systems.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <ServicesQuickNav />

      {services.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      <ContactCta />
    </>
  );
}
