import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, Heart, MapPin, Building2, Server, ChevronDown, FileText, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { OrbitMark } from "@/components/shared/logo";
import { techStack } from "@/data/tech-stack";
import { coreValues } from "@/data/team";
import { siteConfig } from "@/data/site";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Coorbitz's story, mission, and the technology expertise behind our AI and software delivery.",
  path: "/about",
  keywords: [
    "IT company Chicago Illinois",
    "software development company Mehsana Gujarat",
    "AI company",
    "about Coorbitz",
    "Coordinatez",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <section className="relative overflow-hidden py-20 sm:py-28">
        <GradientBlob className="left-[-10%] top-[-20%] size-96 bg-primary/30" />
        <GradientBlob className="right-[-10%] bottom-[-20%] size-96 bg-secondary/30" />
        <Container className="relative text-center">
          <RevealOnScroll>
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              About Coorbitz
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Building the Technology Behind Tomorrow&apos;s Businesses
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
              {siteConfig.description}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Story */}
      <section className="section-y">
        <Container className="mx-auto max-w-3xl">
          <RevealOnScroll>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Our Story
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From a Chicago Studio to a Global Delivery Team
            </h2>
            <p className="mt-5 text-muted-foreground">
              Coorbitz started in Chicago as a small web development studio serving local
              businesses. As demand grew, we opened a dedicated development office in Mehsana,
              Gujarat — combining US-based strategy and client management with a scalable,
              highly skilled engineering team.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today, we help startups, SMEs, and enterprises across a range of industries build
              software and AI systems that hold up under real-world scale — not just in demos.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Mission / Vision */}
      <section className="section-y bg-muted/30">
        <Container className="grid gap-6 lg:grid-cols-2">
          <RevealOnScroll className="rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
              <Target className="size-6" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold">Our Mission</h3>
            <p className="mt-3 text-muted-foreground">
              To help businesses of every size harness modern technology and AI to operate
              faster, smarter, and more profitably — through software built to last.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
              <Eye className="size-6" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold">Our Vision</h3>
            <p className="mt-3 text-muted-foreground">
              To be the trusted global technology partner that businesses turn to first when
              they&apos;re ready to build, automate, or reinvent with AI.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Core Values */}
      <section className="section-y">
        <Container>
          <SectionHeading eyebrow="What Drives Us" title="Our Core Values" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value, index) => (
              <RevealOnScroll key={value.title} delay={(index % 3) * 0.08}>
                <div className="flex h-full gap-4 rounded-2xl border bg-card p-6 shadow-sm">
                  <Heart className="size-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">{value.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Global Presence — company structure */}
      <section className="section-y">
        <Container>
          <SectionHeading
            eyebrow="Company Structure"
            title="Our Global Presence"
            description="This global structure allows Coorbitz to deliver reliable, scalable, and cost-effective technology solutions worldwide."
          />
          <div className="mx-auto mt-16 flex max-w-xl flex-col items-center">
            <RevealOnScroll className="flex w-full flex-col items-center rounded-2xl border bg-card p-8 text-center shadow-sm">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg">
                <Building2 className="size-6" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Parent Company
              </p>
              <h3 className="mt-1 text-xl font-bold">{siteConfig.parentCompany.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Global Headquarters — {siteConfig.locations.headquarters.city},{" "}
                {siteConfig.locations.headquarters.country}
              </p>
            </RevealOnScroll>

            <ChevronDown className="my-2 size-6 shrink-0 text-primary/50" aria-hidden />

            <RevealOnScroll
              delay={0.08}
              className="flex w-full flex-col items-center rounded-2xl border bg-card p-8 text-center shadow-sm"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-brand">
                <OrbitMark className="size-7" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Technology Brand
              </p>
              <h3 className="mt-1 text-xl font-bold">{siteConfig.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {siteConfig.locations.development.divisionName}
              </p>
            </RevealOnScroll>

            <ChevronDown className="my-2 size-6 shrink-0 text-primary/50" aria-hidden />

            <RevealOnScroll
              delay={0.16}
              className="flex w-full flex-col items-center rounded-2xl border bg-card p-8 text-center shadow-sm"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg">
                <Server className="size-6" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Development &amp; Operations
              </p>
              <h3 className="mt-1 text-xl font-bold">{siteConfig.locations.development.city}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {siteConfig.locations.development.country}
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Office Locations */}
      <section className="section-y bg-muted/30">
        <Container>
          <SectionHeading eyebrow="Visit Us" title="Our Offices" />
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {Object.values(siteConfig.locations).map((location, index) => (
              <RevealOnScroll key={location.label} delay={index * 0.1}>
                <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                  <iframe
                    src={location.mapEmbedSrc}
                    className="h-64 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map to Coorbitz ${location.label}`}
                  />
                  <div className="p-6">
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
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Expertise & Culture */}
      <section className="section-y">
        <Container className="grid gap-12 lg:grid-cols-2">
          <RevealOnScroll>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Technology Expertise</h2>
            <p className="mt-3 text-muted-foreground">
              Deep, hands-on expertise across the modern stack — not just a list of buzzwords.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {techStack.flatMap((group) => group.items).map((tech) => (
                <span key={tech} className="rounded-full border bg-card px-3 py-1.5 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Life at Coorbitz</h2>
            <p className="mt-3 text-muted-foreground">
              A culture built around craftsmanship, ownership, and continuous learning. Our
              Chicago and Mehsana teams operate as one — with shared standups, shared tooling,
              and shared accountability for outcomes.
            </p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li>• Weekly learning sessions and conference sponsorships</li>
              <li>• Flexible hybrid work across both offices</li>
              <li>• Quarterly hackathons exploring new AI tooling</li>
              <li>• Transparent, feedback-driven engineering culture</li>
            </ul>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Case Studies & Certifications */}
      <section className="section-y bg-muted/30">
        <Container className="grid gap-6 lg:grid-cols-2">
          <RevealOnScroll className="rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
              <FileText className="size-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">Case Studies</h3>
            <p className="mt-3 text-muted-foreground">
              Detailed case studies are coming soon. In the meantime,{" "}
              <Link href="/contact" className="text-primary underline underline-offset-4">
                get in touch
              </Link>{" "}
              and we&apos;ll gladly share references and examples from past projects.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1} className="rounded-2xl border bg-card p-8 shadow-sm">
            <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
              <ShieldCheck className="size-6" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">Certifications &amp; Compliance</h3>
            <p className="mt-3 text-muted-foreground">
              We&apos;re expanding our formal certifications as we grow.{" "}
              <Link href="/contact" className="text-primary underline underline-offset-4">
                Ask us
              </Link>{" "}
              about our current security and quality practices.
            </p>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
