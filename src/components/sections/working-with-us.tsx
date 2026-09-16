import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { principles } from "@/data/company";

export function WorkingWithUs() {
  return (
    <section className="section-y border-b bg-card">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Working with us"
          title="What you can hold us to."
          description="Not values on a poster. These are the working rules that shape estimates, code and conversations on every project."
        />
        <ol className="mt-14 grid gap-x-12 md:grid-cols-2">
          {principles.map((principle, index) => (
            <RevealOnScroll key={principle.title} delay={(index % 2) * 0.08}>
              <li className="grid grid-cols-[2.5rem_1fr] gap-4 border-t py-7">
                <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">{principle.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{principle.description}</p>
                </div>
              </li>
            </RevealOnScroll>
          ))}
        </ol>
      </Container>
    </section>
  );
}
