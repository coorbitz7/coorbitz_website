import type { Metadata } from "next";
import { Calendar, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ContactCta } from "@/components/sections/contact-cta";
import { insights } from "@/data/insights";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Perspectives on AI, software engineering, and technology strategy from the Coorbitz team.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
      <section className="py-16 text-center sm:py-20">
        <Container>
          <RevealOnScroll>
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              Insights
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Ideas on AI, Software, and Growth
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-muted-foreground">
              Practical perspectives from the engineers, designers, and strategists building at
              Coorbitz.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      <section className="section-y pt-0">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {insights.map((insight, index) => (
              <RevealOnScroll key={insight.id} delay={(index % 3) * 0.08}>
                <article className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {insight.category}
                  </span>
                  <h2 className="mt-4 text-lg font-semibold leading-snug">{insight.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{insight.excerpt}</p>
                  <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {new Date(insight.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" /> {insight.readTime}
                    </span>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
