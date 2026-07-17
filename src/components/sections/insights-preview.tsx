import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { Button } from "@/components/ui/button";
import { insights } from "@/data/insights";

export function InsightsPreview() {
  return (
    <section className="section-y">
      <Container>
        <SectionHeading
          eyebrow="Insights"
          title="Latest Insights"
          description="Perspectives on AI, software, and technology strategy from our team."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {insights.map((insight, index) => (
            <RevealOnScroll key={insight.id} delay={index * 0.08}>
              <Link
                href="/insights"
                className="group flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {insight.category}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
                  {insight.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{insight.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5" />
                    {new Date(insight.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5" /> {insight.readTime}
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <Link href="/insights">
              View All Insights <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
