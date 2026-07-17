import { cn } from "@/lib/utils";

export function OrbitMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden focusable="false">
      <ellipse cx="50" cy="50" rx="34" ry="16" transform="rotate(-20 50 50)" fill="none" stroke="#ffffff" strokeWidth="4.5" />
      <circle cx="81.95" cy="38.37" r="7" fill="#ffffff" />
      <circle cx="18.05" cy="61.63" r="7" fill="#ffffff" />
    </svg>
  );
}

export function Logo({
  className,
  iconClassName,
  showWordmark = true,
}: {
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <OrbitMark className={cn("size-9 shrink-0 rounded-xl bg-gradient-brand", iconClassName)} />
      {showWordmark && <span className="text-xl font-bold tracking-tight">Coorbitz</span>}
    </span>
  );
}
