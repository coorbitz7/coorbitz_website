import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ContactCta } from "@/components/sections/contact-cta";
import { categories, insights } from "@/data/insights";
import { siteConfig } from "@/data/site";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = buildMetadata({
  title: "Insights",
  description:
    "Notes from the Coorbitz team on software, AI, automation and running systems in production. Written as we go, not on a content calendar.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
      <section className="border-b py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Insights"
            title="Notes from the work."
            description="We'd rather publish nothing than filler. This section will fill with things we've actually learned building and running systems: what worked, what didn't, and what we'd do differently."
            titleClassName="sm:text-5xl lg:text-[3.25rem]"
          />
        </Container>
      </section>

      <section className="section-y">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Topics we’ll cover</p>
            <RevealOnScroll delay={0.05}>
              <ul className="mt-5 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li key={category} className="rounded-md border bg-card px-2.5 py-1 font-mono text-sm text-muted-foreground">
                    {category}
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.1} className="lg:col-span-8">
            {insights.length === 0 ? (
              <div className="rounded-lg border border-dashed bg-card p-8 sm:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">No posts yet</p>
                <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight">First articles are being written.</h2>
                <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
                  In the meantime, the{" "}
                  <Link href="/work" className="text-primary underline-offset-4 hover:underline">
                    Work page
                  </Link>{" "}
                  is the most honest account of how we think, and we’re happy to talk through any of it directly.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline">
                    Ask us something <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    Follow on LinkedIn <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
              </div>
            ) : (
              <ol className="divide-y border-y">
                {insights.map((insight) => (
                  <li key={insight.id} className="py-6">
                    <p className="font-mono text-xs text-muted-foreground">
                      {insight.category} <span aria-hidden>·</span>{" "}
                      {new Date(insight.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}{" "}
                      <span aria-hidden>·</span> {insight.readTime}
                    </p>
                    <h2 className="mt-2 font-heading text-xl font-semibold tracking-tight">{insight.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{insight.excerpt}</p>
                  </li>
                ))}
              </ol>
            )}
          </RevealOnScroll>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
