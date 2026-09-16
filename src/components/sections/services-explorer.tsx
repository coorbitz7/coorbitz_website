"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ServiceSchematic } from "@/components/shared/service-schematic";
import { services, type Service } from "@/data/services";
import { cn } from "@/lib/utils";

function ServicePanel({ service }: { service: Service }) {
  return (
    <div>
      <ServiceSchematic kind={service.schematic} className="h-36 w-full max-w-sm text-primary sm:h-40" />
      <h3 className="mt-6 font-heading text-2xl font-semibold tracking-tight">{service.title}</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">{service.overview}</p>
      <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
        {service.whatWeBuild.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-brand-sky" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
        {service.technologies.map((tech) => (
          <li key={tech} className="rounded-md border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground">
            {tech}
          </li>
        ))}
      </ul>
      <Link
        href={`/services#${service.id}`}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Explore {service.title} <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

export function ServicesExplorer() {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((service) => service.id === activeId) ?? services[0];
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowUp: -1, Home: -index, End: services.length - 1 - index };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = (index + keys[event.key] + services.length) % services.length;
    setActiveId(services[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className="section-y border-b">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            index="01"
            eyebrow="Services"
            title="Six things we do well."
            description="Most engagements combine two or three of these. Pick one to see what it usually involves."
          />
          <RevealOnScroll delay={0.1}>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              All services in detail <ArrowRight className="size-4" aria-hidden />
            </Link>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.1} className="lg:col-span-8">
          <div className="grid overflow-hidden rounded-lg border bg-card lg:grid-cols-12">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Services"
              className="divide-y lg:col-span-5 lg:border-r"
            >
              {services.map((service, index) => {
                const selected = service.id === activeId;
                return (
                  <div key={service.id}>
                    <button
                      ref={(element) => {
                        tabRefs.current[index] = element;
                      }}
                      role="tab"
                      id={`${baseId}-tab-${service.id}`}
                      aria-selected={selected}
                      aria-controls={`${baseId}-panel-${service.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveId(service.id)}
                      onKeyDown={(event) => onKeyDown(event, index)}
                      className={cn(
                        "relative flex w-full items-start gap-4 px-5 py-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-inset",
                        selected ? "bg-accent" : "hover:bg-muted/70"
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-y-0 left-0 w-0.5 transition-colors",
                          selected ? "bg-primary" : "bg-transparent"
                        )}
                      />
                      <span className="pt-0.5 font-mono text-xs text-muted-foreground">0{index + 1}</span>
                      <span className="min-w-0">
                        <span className={cn("block font-heading text-base font-semibold", selected && "text-primary")}>
                          {service.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-muted-foreground">{service.tagline}</span>
                      </span>
                    </button>
                    {/* Small screens: the detail expands in place beneath the active item. */}
                    <div
                      id={`${baseId}-panel-${service.id}`}
                      role="tabpanel"
                      aria-labelledby={`${baseId}-tab-${service.id}`}
                      hidden={!selected}
                      className="border-t bg-background px-5 py-6 lg:hidden"
                    >
                      {selected && <ServicePanel service={service} />}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden p-8 lg:col-span-7 lg:block" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <ServicePanel service={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
