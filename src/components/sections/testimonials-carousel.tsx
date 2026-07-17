"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  function go(delta: number) {
    setIndex((prev) => (prev + delta + testimonials.length) % testimonials.length);
  }

  return (
    <section className="section-y bg-muted/30">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by Growing Businesses"
          description="Real feedback from the teams we've partnered with."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote className="mx-auto size-10 text-primary/20" />
          <div className="relative mt-4 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-balance text-xl font-medium leading-relaxed sm:text-2xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <p className="mt-6 font-semibold">{current.name}</p>
                <p className="text-sm text-muted-foreground">
                  {current.role}, {current.company}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => go(-1)} aria-label="Previous testimonial">
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`size-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "bg-primary/25"}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => go(1)} aria-label="Next testimonial">
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
