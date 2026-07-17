import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { Badge } from "@/components/ui/badge";
import { ContactCta } from "@/components/sections/contact-cta";
import { industries } from "@/data/industries";
import { getServiceById } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "Coorbitz delivers software and AI solutions across 15 industries — healthcare, finance, manufacturing, retail, e-commerce, logistics, and more.",
  path: "/industries",
  keywords: [
    "AI integration company",
    "business automation company",
    "software development company",
    "industries served",
    "healthcare software development",
    "fintech software development",
  ],
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }])} />
      <section className="py-16 text-center sm:py-20">
        <Container>
          <RevealOnScroll>
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              Industries We Serve
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Domain Expertise Across 15 Industries
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
              We build for the way your industry actually works — its compliance needs, its
              workflows, and its customers.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="section-y pt-0">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <RevealOnScroll
                key={industry.id}
                delay={(index % 3) * 0.08}
                className="scroll-mt-24"
              >
                <div id={industry.id} className="flex h-full scroll-mt-24 flex-col rounded-2xl border bg-card p-6 shadow-sm">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <industry.icon className="size-6" />
                  </div>
                  <h2 className="mt-5 text-lg font-semibold">{industry.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{industry.description}</p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {industry.relevantServiceIds.map((serviceId) => {
                      const service = getServiceById(serviceId);
                      if (!service) return null;
                      return (
                        <Link key={serviceId} href={`/services#${serviceId}`}>
                          <Badge variant="secondary" className="rounded-full font-normal hover:bg-primary/10">
                            {service.title}
                          </Badge>
                        </Link>
                      );
                    })}
                  </div>

                  <Link
                    href={`/contact?industry=${encodeURIComponent(industry.title)}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary"
                  >
                    Discuss your project <ArrowRight className="size-4" />
                  </Link>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
