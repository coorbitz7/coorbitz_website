import type { Metadata } from "next";
import {
  HeartHandshake,
  GraduationCap,
  Laptop,
  TrendingUp,
  Users,
  Coffee,
  MapPin,
  Briefcase,
  Clock,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CareerForm } from "@/components/forms/career-form";
import { JsonLd } from "@/components/shared/json-ld";
import { jobOpenings, internshipInfo } from "@/data/jobs";
import { buildMetadata, jobPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Join Coorbitz — explore open roles in engineering, AI, design, and sales across our Chicago and Mehsana offices.",
  path: "/careers",
});

const benefits = [
  { icon: HeartHandshake, title: "Health & Wellness", description: "Comprehensive health coverage and wellness stipends." },
  { icon: TrendingUp, title: "Growth Path", description: "Clear career ladders and quarterly growth conversations." },
  { icon: Laptop, title: "Hybrid Flexibility", description: "Flexible hybrid schedules across both offices." },
  { icon: GraduationCap, title: "Learning Budget", description: "Annual budget for courses, books, and conferences." },
  { icon: Users, title: "Real Ownership", description: "Own features and client relationships from day one." },
  { icon: Coffee, title: "Great Culture", description: "Regular team events, hackathons, and social offsites." },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />
      <section className="py-16 text-center sm:py-20">
        <Container>
          <RevealOnScroll>
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              Careers at Coorbitz
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Build Your Career Around Real Impact
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
              We&apos;re a team of engineers, designers, and strategists solving real problems for
              real clients — across Chicago and Mehsana. Come build with us.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Why work with us / Benefits */}
      <section className="section-y bg-muted/30 pt-0">
        <Container>
          <SectionHeading eyebrow="Why Work With Us" title="Benefits & Perks" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <RevealOnScroll key={benefit.title} delay={(index % 3) * 0.08}>
                <div className="flex h-full gap-4 rounded-2xl border bg-card p-6 shadow-sm">
                  <benefit.icon className="size-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Current Openings */}
      <section className="section-y">
        <Container className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Join Our Team" title="Current Openings" />
          <RevealOnScroll className="mt-14">
            <Accordion type="single" collapsible className="w-full">
              {jobOpenings.map((job) => (
                <AccordionItem key={job.id} value={job.id}>
                  <JsonLd
                    data={jobPostingJsonLd({
                      title: job.title,
                      description: job.description,
                      datePosted: job.datePosted,
                      location: job.location,
                      employmentType: job.type,
                    })}
                  />
                  <AccordionTrigger className="text-left">
                    <div>
                      <p className="font-semibold">{job.title}</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="size-3.5" /> {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3.5" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" /> {job.type}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{job.description}</p>
                    <p className="mt-4 text-sm font-semibold">Responsibilities</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {job.responsibilities.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm font-semibold">Requirements</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {job.requirements.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                    <a href="#apply" className="mt-4 inline-block">
                      <Badge className="rounded-full px-4 py-1.5">Apply for this role</Badge>
                    </a>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Internships */}
      <section className="section-y bg-muted/30">
        <Container className="mx-auto max-w-3xl text-center">
          <RevealOnScroll>
            <GraduationCap className="mx-auto size-10 text-primary" />
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              {internshipInfo.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{internshipInfo.description}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {internshipInfo.tracks.map((track) => (
                <Badge key={track} variant="secondary" className="rounded-full font-normal">
                  {track}
                </Badge>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Application Form */}
      <section id="apply" className="section-y scroll-mt-20">
        <Container className="mx-auto max-w-2xl">
          <SectionHeading eyebrow="Apply Now" title="Submit Your Application" />
          <div className="mt-14">
            <CareerForm />
          </div>
        </Container>
      </section>
    </>
  );
}
