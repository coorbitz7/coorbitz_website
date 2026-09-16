"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { processSteps } from "@/data/tech-stack";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 4500;

function StepDetail({ index }: { index: number }) {
  const step = processSteps[index];
  return (
    <div className="grid gap-8 md:grid-cols-12">
      <div className="md:col-span-7">
        <p className="font-mono text-sm text-muted-foreground">
          Step {step.step} <span aria-hidden>·</span> {step.summary}
        </p>
        <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">{step.title}</h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">{step.detail}</p>
      </div>
      <div className="md:col-span-5">
        <p className="eyebrow text-muted-foreground">What you get</p>
        <ul className="mt-3 space-y-2.5 text-sm">
          {step.outputs.map((output) => (
            <li key={output} className="flex gap-2.5">
              <Check className="mt-0.5 size-4 shrink-0 text-brand-sky" aria-hidden />
              {output}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function HowWeBuild() {
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Walk through the steps on its own until the visitor takes over.
  useEffect(() => {
    if (interacted || prefersReducedMotion || !inView) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % processSteps.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [interacted, prefersReducedMotion, inView]);

  const select = (index: number) => {
    setInteracted(true);
    setActive(index);
  };

  const progress = (active / (processSteps.length - 1)) * 100;

  return (
    <section id="how-we-build" ref={sectionRef} className="section-y scroll-mt-24 border-b bg-card">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="How we build"
          title="Seven steps, in the open."
          description="The same process for a launch site or an operations platform. You see working software from the third week, and you can stop or change course at any step."
        />

        {/* Desktop: a horizontal track with the detail below. */}
        <RevealOnScroll delay={0.1} className="mt-14 hidden md:block">
          <div className="relative">
            <div aria-hidden className="absolute left-[7%] right-[7%] top-5 h-px bg-border" />
            <motion.div
              aria-hidden
              className="absolute left-[7%] top-5 h-px origin-left bg-primary"
              animate={{ width: `${progress * 0.86}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <ol className="relative grid grid-cols-7">
              {processSteps.map((step, index) => {
                const state = index === active ? "active" : index < active ? "done" : "todo";
                return (
                  <li key={step.step} className="flex flex-col items-center text-center">
                    <button
                      type="button"
                      onClick={() => select(index)}
                      aria-current={state === "active" ? "step" : undefined}
                      className="group flex flex-col items-center gap-3 rounded-md px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                    >
                      <span
                        className={cn(
                          "flex size-10 items-center justify-center rounded-full border bg-card font-mono text-xs transition-colors",
                          state === "active" && "border-primary bg-primary text-primary-foreground",
                          state === "done" && "border-primary text-primary",
                          state === "todo" && "text-muted-foreground group-hover:border-foreground/40"
                        )}
                      >
                        {step.step}
                      </span>
                      <span
                        className={cn(
                          "font-heading text-sm font-semibold",
                          state === "active" ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {step.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-10 rounded-lg border bg-background p-8" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                <StepDetail index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </RevealOnScroll>

        {/* Small screens: a vertical rail, each step expands in place. */}
        <RevealOnScroll delay={0.1} className="mt-12 md:hidden">
          <ol className="relative border-l pl-6">
            {processSteps.map((step, index) => {
              const open = index === active;
              return (
                <li key={step.step} className="relative pb-8 last:pb-0">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-[31px] top-1 flex size-5 items-center justify-center rounded-full border bg-card",
                      open ? "border-primary" : "border-border"
                    )}
                  >
                    <span className={cn("size-2 rounded-full", open ? "bg-primary" : "bg-border")} />
                  </span>
                  <button
                    type="button"
                    onClick={() => select(index)}
                    aria-expanded={open}
                    className="flex w-full items-baseline gap-3 text-left"
                  >
                    <span className="font-mono text-xs text-muted-foreground">{step.step}</span>
                    <span className="font-heading text-lg font-semibold">{step.title}</span>
                  </button>
                  <p className="mt-1 text-sm text-muted-foreground">{step.summary}</p>
                  {open && (
                    <div className="mt-4 rounded-lg border bg-background p-5">
                      <p className="text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                      <ul className="mt-4 space-y-2 text-sm">
                        {step.outputs.map((output) => (
                          <li key={output} className="flex gap-2">
                            <Check className="mt-0.5 size-4 shrink-0 text-brand-sky" aria-hidden />
                            {output}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
