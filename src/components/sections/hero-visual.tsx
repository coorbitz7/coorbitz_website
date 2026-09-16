"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { SystemFallback } from "@/components/sections/system-fallback";
import { cn } from "@/lib/utils";

// The three.js scene is a separate client-only chunk that is only requested on desktop-class
// devices with WebGL and no reduced-motion preference. Everyone else gets the static SVG,
// which is also what shows while the chunk loads.
const HeroScene = dynamic(() => import("@/components/sections/hero-scene"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroVisual({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [use3d, setUse3d] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () =>
      setUse3d(Boolean(media.matches && !prefersReducedMotion && !connection?.saveData && supportsWebGL()));
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative aspect-[4/3] w-full text-foreground sm:aspect-[3/2] lg:aspect-square", className)}
    >
      <SystemFallback
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          use3d && sceneReady ? "opacity-0" : "opacity-100"
        )}
      />
      {use3d && (
        <div className={cn("absolute inset-0 transition-opacity duration-700", sceneReady ? "opacity-100" : "opacity-0")}>
          <HeroScene dark={resolvedTheme === "dark"} active={inView} onReady={() => setSceneReady(true)} />
        </div>
      )}
    </div>
  );
}
