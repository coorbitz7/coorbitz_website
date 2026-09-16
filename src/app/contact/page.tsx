import type { Metadata } from "next";
import { Suspense } from "react";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/data/site";
import { buildMetadata, breadcrumbJsonLd, contactPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Start a project with Coorbitz. Tell us what's slow, manual or broken and we'll reply with questions, not a sales deck. Offices in Chicago, Illinois and Mehsana, Gujarat.",
  path: "/contact",
  keywords: ["contact Coorbitz", "start a software project", "software company Chicago", "AI development Mehsana Gujarat"],
});

const nextSteps = [
  { title: "We read it properly", text: "A person reads your message, not a routing bot. Expect a reply within two business days." },
  { title: "A short call", text: "Thirty minutes to understand the problem and the constraints. No slides." },
  { title: "Options in writing", text: "What we'd build, what we wouldn't, and a range for each option before you commit to anything." },
];

export default function ContactPage() {
  const { headquarters, development } = siteConfig.locations;
  const tel = (value: string) => value.replace(/[^+\d]/g, "");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
          contactPageJsonLd(),
        ]}
      />
      <section className="border-b py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Have a problem worth solving?"
            description="Tell us what's slow, manual or broken. A couple of sentences is enough to start; we'll come back with questions."
            titleClassName="sm:text-5xl lg:text-[3.25rem]"
          />
        </Container>
      </section>

      <section className="section-y">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <RevealOnScroll className="space-y-10 lg:col-span-5">
            <div>
              <h2 className="eyebrow text-muted-foreground">What happens next</h2>
              <ol className="mt-4 divide-y border-y">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3 py-4">
                    <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                    <div>
                      <h3 className="font-heading text-base font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="eyebrow text-muted-foreground">Reach us directly</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-brand-sky" aria-hidden />
                  <a href={`mailto:${siteConfig.email.contact}`} className="hover:text-primary">
                    {siteConfig.email.contact}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-brand-sky" aria-hidden />
                  <a href={`tel:${tel(siteConfig.phone.us)}`} className="hover:text-primary">
                    {siteConfig.phone.us} <span className="text-muted-foreground">(US)</span>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-brand-sky" aria-hidden />
                  <a href={`tel:${tel(siteConfig.phone.india)}`} className="hover:text-primary">
                    {siteConfig.phone.india} <span className="text-muted-foreground">(India)</span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-4 text-brand-sky" aria-hidden />
                  <span className="text-muted-foreground">
                    {siteConfig.businessHours[0].days}, {siteConfig.businessHours[0].hours}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="eyebrow text-muted-foreground">Offices</h2>
              <ul className="mt-4 grid gap-6 sm:grid-cols-2">
                {[headquarters, development].map((location) => (
                  <li key={location.label} className="text-sm">
                    <p className="font-heading font-semibold">{location.city}</p>
                    <p className="text-muted-foreground">
                      {location.company} <span aria-hidden>·</span> {location.label}
                    </p>
                    <address className="mt-2 not-italic leading-relaxed text-muted-foreground">
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
                      className="mt-2 inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                    >
                      <MapPin className="size-3.5" aria-hidden /> Map <ArrowUpRight className="size-3" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1} className="lg:col-span-7">
            <Suspense fallback={<div className="h-[640px] rounded-lg border bg-card" aria-hidden />}>
              <ContactForm />
            </Suspense>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
