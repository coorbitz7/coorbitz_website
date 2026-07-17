import type { Metadata } from "next";
import { Target, Eye, Heart, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { GradientBlob } from "@/components/shared/gradient-blob";
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
              Today, we help startups, SMEs, and enterprises across 15+ industries build
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

      {/* Office Locations */}
      <section className="section-y bg-muted/30">
        <Container>
          <SectionHeading eyebrow="Global Presence" title="Our Offices" />
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
                    <p className="mt-2 font-medium">{location.city}, {location.country}</p>
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
    </>
  );
}
