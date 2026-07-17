import { cn } from "@/lib/utils";

export function GradientBlob({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full opacity-40 blur-3xl dark:opacity-30",
        className
      )}
    />
  );
}
