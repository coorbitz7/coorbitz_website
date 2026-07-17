import type { Metadata } from "next";
import { Suspense } from "react";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ContactForm } from "@/components/forms/contact-form";
import { LinkedInIcon, XIcon, FacebookIcon, InstagramIcon, GitHubIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/data/site";
import { buildMetadata, breadcrumbJsonLd, contactPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Coorbitz — reach our Chicago headquarters or Mehsana development office, or send us a project inquiry.",
  path: "/contact",
  keywords: [
    "IT company Chicago Illinois",
    "software development company Chicago",
    "AI company Mehsana Gujarat",
    "contact IT services company",
    "custom software development company",
  ],
});

const socialLinks = [
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: siteConfig.social.twitter, label: "X (Twitter)", Icon: XIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.github, label: "GitHub", Icon: GitHubIcon },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
          contactPageJsonLd(),
        ]}
      />
      <section className="py-16 text-center sm:py-20">
        <Container>
          <RevealOnScroll>
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              Get In Touch
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s Build Something Great Together
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
              Tell us about your project and we&apos;ll get back to you within one business day.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <RevealOnScroll className="space-y-6">
            {Object.values(siteConfig.locations).map((location) => (
              <div key={location.label} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <iframe
                  src={location.mapEmbedSrc}
                  className="h-48 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map to Coorbitz ${location.label}`}
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin className="size-4" />
                    <span className="text-sm font-semibold uppercase tracking-wide">
                      {location.label}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold">{location.company}</p>
                  <p className="text-sm text-muted-foreground">{location.city}, {location.country}</p>
                  {location.addressLines.map((line) => (
                    <p key={line} className="text-sm text-muted-foreground">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center gap-2 text-primary">
                <Clock className="size-4" />
                <span className="text-sm font-semibold uppercase tracking-wide">Business Hours</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {siteConfig.businessHours.map((entry) => (
                  <li key={entry.days} className="flex justify-between text-muted-foreground">
                    <span>{entry.days}</span>
                    <span className="font-medium text-foreground">{entry.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="size-4 text-primary" />
                  <a href={`mailto:${siteConfig.email.contact}`} className="hover:text-primary">
                    {siteConfig.email.contact}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 text-primary" />
                  <a href={`tel:${siteConfig.phone.india}`} className="hover:text-primary">
                    {siteConfig.phone.india} (India)
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 text-primary" />
                  <a href={`tel:${siteConfig.phone.us}`} className="hover:text-primary">
                    {siteConfig.phone.us} (US)
                  </a>
                </li>
              </ul>
              <div className="mt-5 flex gap-3">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <Suspense fallback={<div className="h-[600px] rounded-2xl border bg-card shadow-sm" />}>
              <ContactForm />
            </Suspense>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
