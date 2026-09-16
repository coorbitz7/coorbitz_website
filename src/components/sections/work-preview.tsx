import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { workItems } from "@/data/work";

export function WorkPreview() {
  const featured = workItems.slice(0, 3);
  return (
    <section className="section-y border-b">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            index="05"
            eyebrow="Selected work"
            title="Real systems, described plainly."
            description="A few things we've built recently. Names are withheld where clients haven't asked to be named, and we don't publish outcome figures we can't stand behind."
          />
          <RevealOnScroll delay={0.1}>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              All work <ArrowRight className="size-4" aria-hidden />
            </Link>
          </RevealOnScroll>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {featured.map((item, index) => (
            <RevealOnScroll key={item.id} delay={index * 0.08}>
              <article className="flex h-full flex-col border-t pt-6">
                <p className="font-mono text-xs text-muted-foreground">
                  {item.kind} <span aria-hidden>·</span> {item.industry} <span aria-hidden>·</span> {item.year}
                </p>
                <h3 className="mt-3 font-heading text-xl font-semibold leading-snug tracking-tight">
                  <Link href={`/work#${item.id}`} className="transition-colors hover:text-primary">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                  {item.stack.slice(0, 4).map((tech) => (
                    <li key={tech} className="rounded-md border px-2 py-0.5 font-mono text-xs text-muted-foreground">
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
