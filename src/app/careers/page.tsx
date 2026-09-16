import type { Metadata } from "next";
import { Briefcase, Clock, GraduationCap, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CareerForm } from "@/components/forms/career-form";
import { JsonLd } from "@/components/shared/json-ld";
import { jobOpenings, internshipInfo } from "@/data/jobs";
import { buildMetadata, jobPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Work with Coorbitz on real client and internal systems from Chicago or Mehsana. Current openings, our internship program and how to apply.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }])} />
      <section className="border-b py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Careers"
            title="Build real systems with a small team."
            description="We're engineers and designers in Chicago and Mehsana working on client systems and our own internal platforms. The work is production software, not busywork, and you'll be trusted with real responsibility early."
            titleClassName="sm:text-5xl lg:text-[3.25rem]"
          />
        </Container>
      </section>

      <section className="section-y border-b">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Open roles" title="Current openings." description="Roles are added here as they open. If nothing fits but you think you should be here, apply anyway and say why." />
          </div>
          <RevealOnScroll delay={0.1} className="lg:col-span-8">
            <Accordion type="single" collapsible className="w-full border-t">
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
                  <AccordionTrigger className="py-5 text-left hover:no-underline">
                    <div>
                      <p className="font-heading text-lg font-semibold">{job.title}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="size-3.5" aria-hidden /> {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3.5" aria-hidden /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="size-3.5" aria-hidden /> {job.type}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <p className="leading-relaxed text-muted-foreground">{job.description}</p>
                    <div className="mt-5 grid gap-6 sm:grid-cols-2">
                      <div>
                        <p className="eyebrow text-muted-foreground">Responsibilities</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {job.responsibilities.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="eyebrow text-muted-foreground">Requirements</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {job.requirements.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <a href="#apply" className="mt-5 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline">
                      Apply for this role
                    </a>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="section-y border-b bg-card">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Internships" title={internshipInfo.title} />
          </div>
          <RevealOnScroll delay={0.1} className="lg:col-span-8">
            <div className="flex gap-4">
              <GraduationCap className="mt-1 size-6 shrink-0 text-brand-sky" aria-hidden />
              <div>
                <p className="leading-relaxed text-muted-foreground">{internshipInfo.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {internshipInfo.tracks.map((track) => (
                    <li key={track} className="rounded-md border bg-background px-2.5 py-1 font-mono text-sm text-muted-foreground">
                      {track}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      <section id="apply" className="section-y scroll-mt-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Apply" title="Send us your application." description="Attach a resume and tell us, in your own words, what you'd like to work on." />
          </div>
          <RevealOnScroll delay={0.1} className="lg:col-span-8">
            <CareerForm />
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
