import { Container } from "@/components/shared/container";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { stats } from "@/data/tech-stack";

export function Stats() {
  return (
    <section className="border-y bg-muted/30 py-14">
      <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <RevealOnScroll key={stat.label} delay={index * 0.08} className="text-center">
            <p className="text-4xl font-bold tracking-tight text-gradient-brand sm:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">{stat.label}</p>
          </RevealOnScroll>
        ))}
      </Container>
    </section>
  );
}
