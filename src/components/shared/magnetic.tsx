"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Gives a control a slight pull toward the cursor. Only active on devices with a fine
 * pointer and hover, and never when the user prefers reduced motion — everywhere else it
 * renders its child untouched.
 */
export function Magnetic({
  children,
  className,
  strength = 0.22,
  maxOffset = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  maxOffset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 });
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(media.matches && !prefersReducedMotion);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  const clamp = (value: number) => Math.max(-maxOffset, Math.min(maxOffset, value));

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        if (!enabled || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(clamp((event.clientX - (rect.left + rect.width / 2)) * strength));
        y.set(clamp((event.clientY - (rect.top + rect.height / 2)) * strength));
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
