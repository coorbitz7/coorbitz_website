import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { NetworkMark } from "@/components/shared/logo";
import { ContactCta } from "@/components/sections/contact-cta";
import { principles, problemsWeSolve } from "@/data/company";
import { siteConfig } from "@/data/site";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Coorbitz is the software and AI brand of Coordinatez: an engineering team in Chicago and Mehsana that builds custom software, AI systems and automation for growing businesses.",
  path: "/about",
  keywords: ["about Coorbitz", "Coordinatez technology brand", "software company Chicago", "software engineering Mehsana Gujarat"],
});

export default function AboutPage() {
  const { headquarters, development } = siteConfig.locations;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />

      <section className="relative overflow-hidden border-b py-16 sm:py-20">
        <div aria-hidden className="grid-paper absolute inset-0" />
        <Container className="relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              as="h1"
              eyebrow="About"
              title="A small engineering team that builds the systems businesses run on."
              description="Coorbitz is the software and AI brand of Coordinatez. We design and build custom software, AI systems and automation for startups and growing companies, from Chicago and Mehsana."
              titleClassName="sm:text-5xl lg:text-[3.25rem]"
            />
          </div>
          <RevealOnScroll delay={0.15} className="hidden lg:col-span-4 lg:flex lg:items-center lg:justify-end">
            <NetworkMark className="size-40 opacity-90" />
          </RevealOnScroll>
        </Container>
      </section>

      <section className="section-y border-b">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">What we do</p>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-foreground/85 lg:col-span-7">
            <RevealOnScroll>
              <p>
                We build software that does real work: web platforms customers use, internal tools
                that replace spreadsheets, AI features and agents that take repetitive judgment off a
                team’s plate, and the data pipelines that make the numbers agree.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <p>
                We use AI where it changes an outcome and plain code everywhere else. Most of what we
                ship is unglamorous and durable, which is what a business system should be.
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className="section-y border-b bg-card">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Why Coorbitz exists</p>
          </div>
          <div className="space-y-5 leading-relaxed text-muted-foreground lg:col-span-7">
            <RevealOnScroll>
              <p>
                Coordinatez runs a trading business alongside its technology work. The systems that
                business needed, for outreach, replies, documents and shipments, didn’t exist in a
                form that fit, so the team built them. Coorbitz is that engineering capability,
                offered to other companies with the same kind of problems.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.05}>
              <p>
                That origin shapes how we work. We’ve been the client of our own software, so we’re
                impatient with tools that look good in a demo and fall over on a Tuesday. We care
                about the parts nobody shows in a pitch: data models, error handling, documentation,
                and what happens after launch.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p>
                The company is headquartered in {headquarters.city}, with the engineering team in{" "}
                {development.city}, India. The two offices work the same backlog to the same
                standard, and clients get one point of contact.
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      <section className="section-y border-b">
        <Container>
          <SectionHeading
            eyebrow="How we approach technology"
            title="Working rules, not values on a poster."
            description="These shape estimates, code and conversations on every project. Hold us to them."
          />
          <ol className="mt-14 grid gap-x-12 md:grid-cols-2">
            {principles.map((principle, index) => (
              <RevealOnScroll key={principle.title} delay={(index % 2) * 0.08}>
                <li className="grid grid-cols-[2.5rem_1fr] gap-4 border-t py-7">
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold tracking-tight">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{principle.description}</p>
                  </div>
                </li>
              </RevealOnScroll>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-y border-b bg-card">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Problems we're usually brought in for"
              title="If any of these sound familiar, we should talk."
            />
          </div>
          <RevealOnScroll delay={0.1} className="lg:col-span-8">
            <ul className="divide-y border-y">
              {problemsWeSolve.map((problem, index) => (
                <li key={problem} className="flex gap-5 py-4">
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                  <p className="text-base leading-relaxed">{problem}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              See how this plays out in practice on the{" "}
              <Link href="/work" className="text-primary underline-offset-4 hover:underline">
                Work page
              </Link>
              , or read{" "}
              <Link href="/#how-we-build" className="text-primary underline-offset-4 hover:underline">
                how we build
              </Link>
              .
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="section-y border-b">
        <Container>
          <SectionHeading eyebrow="Where we are" title="Two offices, one team." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[headquarters, development].map((location, index) => (
              <RevealOnScroll key={location.label} delay={index * 0.08}>
                <div className="flex h-full flex-col rounded-lg border bg-card p-7">
                  <p className="eyebrow text-muted-foreground">
                    {location.company} <span aria-hidden>·</span> {location.label}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight">{location.city}</h3>
                  <p className="text-muted-foreground">{location.country}</p>
                  <address className="mt-4 flex-1 text-sm not-italic leading-relaxed text-muted-foreground">
                    {location.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    <MapPin className="size-4" aria-hidden /> Open in Google Maps
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </div>
              </RevealOnScroll>
            ))}
          </div>
          <RevealOnScroll delay={0.1}>
            <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              A note on credentials: we don’t hold formal certifications yet and we don’t list
              client logos we haven’t been given permission to use. What we can offer is a
              conversation with the people who’d do the work, references on request, and the
              systems described on the Work page.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
