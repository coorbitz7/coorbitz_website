"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Reveals a headline word by word. The full text is kept in a visually-hidden span so
 * assistive tech reads a single sentence rather than a stream of fragments.
 */
export function SplitReveal({
  text,
  className,
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: delay + index * stagger, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}
