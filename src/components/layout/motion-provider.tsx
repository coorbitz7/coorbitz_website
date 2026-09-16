"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// `reducedMotion="user"` makes every framer-motion animation on the site honor the OS-level
// "reduce motion" preference: transforms are skipped and only opacity changes remain.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
