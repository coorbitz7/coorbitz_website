"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, BrainCircuit, Bot, Cpu, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { GradientBlob } from "@/components/shared/gradient-blob";

const floatingIcons = [
  { Icon: BrainCircuit, className: "left-[6%] top-[18%]", delay: 0, anim: "animate-float-slow" },
  { Icon: Bot, className: "right-[8%] top-[12%]", delay: 0.15, anim: "animate-float-slower" },
  { Icon: Cpu, className: "left-[12%] bottom-[16%]", delay: 0.3, anim: "animate-float-slower" },
  { Icon: Workflow, className: "right-[14%] bottom-[22%]", delay: 0.45, anim: "animate-float-slow" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-brand-radial" aria-hidden />
      <GradientBlob className="left-[-10%] top-[-10%] size-[28rem] bg-primary/40" />
      <GradientBlob className="right-[-12%] top-[10%] size-[24rem] bg-secondary/40" />
      <GradientBlob className="bottom-[-15%] left-[30%] size-[26rem] bg-brand-accent/30" />

      {floatingIcons.map(({ Icon, className, delay, anim }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.6, duration: 0.8 }}
          className={`absolute hidden size-14 items-center justify-center rounded-2xl glass shadow-lg lg:flex ${className} ${anim}`}
          aria-hidden
        >
          <Icon className="size-6 text-primary" />
        </motion.div>
      ))}

      <Container className="relative section-y flex flex-col items-center pt-28 text-center sm:pt-36">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
        >
          <Sparkles className="size-4" /> AI-Powered Digital Innovation
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          Empowering Businesses with{" "}
          <span className="text-gradient-brand">AI-Driven Digital Innovation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl"
        >
          Coorbitz helps startups, SMEs, and enterprises build scalable software and
          intelligent automation — from custom platforms to production-grade AI agents.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button asChild size="lg" className="rounded-full px-8 text-base">
            <Link href="/contact">
              Get Free Consultation <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-base">
            <Link href="/services">Our Services</Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
