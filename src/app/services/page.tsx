import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServicesQuickNav } from "@/components/sections/services-quick-nav";
import { ServiceSection } from "@/components/sections/service-section";
import { ContactCta } from "@/components/sections/contact-cta";
import { services } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "What Coorbitz builds: AI and machine learning, AI agents and automation, custom software, web and app development, data and analytics, and digital solutions.",
  path: "/services",
  keywords: [
    "custom software development",
    "AI development services",
    "AI agents",
    "business automation",
    "web development company",
    "data analytics services",
    "software company Chicago",
    "software company Mehsana Gujarat",
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
      <section className="border-b py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="What we build, and how we think about it."
            description="Six areas of work, most engagements combining two or three. Each section below says what it usually involves, who it tends to be for and what it's built with."
            titleClassName="sm:text-5xl lg:text-[3.25rem]"
          />
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
