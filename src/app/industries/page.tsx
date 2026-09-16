import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ContactCta } from "@/components/sections/contact-cta";
import { industries } from "@/data/industries";
import { getServiceById } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "The kinds of businesses Coorbitz builds software, AI and automation for: manufacturing, trading and logistics, retail and e-commerce, restaurants, professional services, startups and growing companies.",
  path: "/industries",
  keywords: [
    "software for manufacturing",
    "trading and logistics software",
    "e-commerce development",
    "restaurant website development",
    "automation for professional services",
    "startup software development",
  ],
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
      <section className="border-b py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Industries"
            title="Where we tend to help."
            description="We don't claim deep expertise in every sector. These are the kinds of businesses whose problems we've actually worked on, what we usually find when we arrive, and where the work tends to go."
            titleClassName="sm:text-5xl lg:text-[3.25rem]"
          />
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <ol className="divide-y border-y">
            {industries.map((industry, index) => (
              <RevealOnScroll key={industry.id} delay={0.04}>
                <li id={industry.id} className="grid gap-6 py-10 scroll-mt-28 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-xs text-muted-foreground">0{index + 1}</p>
                    <h2 className="mt-2 flex items-center gap-3 font-heading text-2xl font-semibold tracking-tight">
                      <industry.icon className="size-5 shrink-0 text-brand-sky" aria-hidden />
                      {industry.title}
                    </h2>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="leading-relaxed text-muted-foreground">{industry.description}</p>
                    <h3 className="eyebrow mt-6 text-muted-foreground">Where we help</h3>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {industry.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-3">
                    <h3 className="eyebrow text-muted-foreground">Related services</h3>
                    <ul className="mt-3 space-y-1.5 text-sm">
                      {industry.relevantServiceIds.map((serviceId) => {
                        const service = getServiceById(serviceId);
                        if (!service) return null;
                        return (
                          <li key={serviceId}>
                            <Link href={`/services#${serviceId}`} className="underline-offset-4 hover:text-primary hover:underline">
                              {service.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <Link
                      href={`/contact?industry=${encodeURIComponent(industry.title)}`}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Talk to us <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
