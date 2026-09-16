import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ContactCta } from "@/components/sections/contact-cta";
import { workItems } from "@/data/work";
import { getServiceById } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description:
    "Selected systems built by Coorbitz: a restaurant launch site, an export-trade operations platform, e-commerce prototypes, and quantitative research tooling. Described plainly, with no invented outcomes.",
  path: "/work",
  keywords: ["software case studies", "custom software examples", "AI and automation projects", "Coorbitz work"],
});

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} />
      <section className="border-b py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              as="h1"
              eyebrow="Work"
              title="Selected work."
              description="Real systems, described the way we'd describe them to a colleague: the problem we found, what we built, and what it runs on. Client and prospect names are withheld unless they've asked to be named, and we don't publish outcome figures we can't stand behind. References are available on request."
              titleClassName="sm:text-5xl lg:text-[3.25rem]"
            />
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <ol className="divide-y border-y">
            {workItems.map((item, index) => (
              <RevealOnScroll key={item.id} delay={0.04}>
                <li id={item.id} className="grid gap-8 py-12 scroll-mt-28 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-xs text-muted-foreground">0{index + 1}</p>
                    <dl className="mt-3 space-y-3 text-sm">
                      <div>
                        <dt className="eyebrow text-muted-foreground">Type</dt>
                        <dd className="mt-1 font-medium">{item.kind}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-muted-foreground">Industry</dt>
                        <dd className="mt-1">
                          <Link href={`/industries#${item.industryId}`} className="underline-offset-4 hover:text-primary hover:underline">
                            {item.industry}
                          </Link>
                        </dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-muted-foreground">Year</dt>
                        <dd className="mt-1">{item.year}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-muted-foreground">Services</dt>
                        <dd className="mt-1 space-y-1">
                          {item.serviceIds.map((serviceId) => {
                            const service = getServiceById(serviceId);
                            return service ? (
                              <Link
                                key={serviceId}
                                href={`/services#${serviceId}`}
                                className="block underline-offset-4 hover:text-primary hover:underline"
                              >
                                {service.title}
                              </Link>
                            ) : null;
                          })}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="lg:col-span-8">
                    <h2 className="font-heading text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">{item.title}</h2>
                    <p className="mt-4 text-lg leading-relaxed text-foreground/80">{item.summary}</p>
                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="eyebrow text-muted-foreground">The problem</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.problem}</p>
                      </div>
                      <div>
                        <h3 className="eyebrow text-muted-foreground">What we built</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.approach}</p>
                      </div>
                    </div>
                    {item.outcome && (
                      <div className="mt-8">
                        <h3 className="eyebrow text-muted-foreground">Outcome</h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.outcome}</p>
                      </div>
                    )}
                    <ul className="mt-8 flex flex-wrap gap-1.5" aria-label="Stack">
                      {item.stack.map((tech) => (
                        <li key={tech} className="rounded-md border bg-card px-2 py-0.5 font-mono text-xs text-muted-foreground">
                          {tech}
                        </li>
                      ))}
                    </ul>
                    {item.note && <p className="mt-5 font-mono text-xs text-muted-foreground">{item.note}</p>}
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
