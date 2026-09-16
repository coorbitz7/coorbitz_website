import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { techStack } from "@/data/tech-stack";

export function TechStackSection() {
  return (
    <section className="section-y border-b">
      <Container>
        <SectionHeading
          index="07"
          eyebrow="Technology"
          title="The stack we actually work in."
          description="Nothing on this list is aspirational. Each item is in a system described on the Work page, and we choose the plainest tool that fits before reaching for anything else."
        />
        <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {techStack.map((group, index) => (
            <RevealOnScroll key={group.category} delay={(index % 3) * 0.06}>
              <div className="border-t pt-5">
                <h3 className="eyebrow text-muted-foreground">{group.category}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border bg-card px-2.5 py-1 font-mono text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
