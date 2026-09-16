"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/shared/container";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServicesQuickNav() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = services
      .map((service) => document.getElementById(service.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Services on this page"
      className="sticky top-16 z-30 border-b bg-background/95 backdrop-blur-sm lg:top-20"
    >
      <Container>
        <ul className="scrollbar-none -mb-px flex gap-6 overflow-x-auto">
          {services.map((service, index) => {
            const active = service.id === activeId;
            return (
              <li key={service.id} className="shrink-0">
                <a
                  href={`#${service.id}`}
                  aria-current={active ? "location" : undefined}
                  className={cn(
                    "flex items-center gap-2 border-b-2 py-3 text-sm transition-colors",
                    active
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-xs">0{index + 1}</span>
                  {service.title}
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
