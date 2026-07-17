import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { Badge } from "@/components/ui/badge";
import { techStack } from "@/data/tech-stack";

export function TechStackSection() {
  return (
    <section className="section-y">
      <Container>
        <SectionHeading
          eyebrow="Technology"
          title="Our Technology Stack"
          description="We pick the right tool for the job, backed by teams fluent in every layer of the modern stack."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group, index) => (
            <RevealOnScroll key={group.category} delay={(index % 3) * 0.08}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-primary">{group.category}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="secondary" className="rounded-full px-3 py-1 font-normal">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
