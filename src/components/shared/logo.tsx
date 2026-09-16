import { cn } from "@/lib/utils";
import { MARK_VIEWBOX, markSegments } from "@/lib/brand-mark";

/**
 * The Coorbitz network mark. Colors come from the `--mark-1..5` CSS variables so the same
 * geometry reads correctly on light and dark surfaces. Decorative by default; pass `title`
 * when the mark is the only thing identifying the company (e.g. an icon-only link).
 */
export function NetworkMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {markSegments.map((segment, index) => (
        <g key={index} style={{ color: `var(--mark-${index + 1})` }}>
          <circle cx={segment.node.cx} cy={segment.node.cy} r={segment.node.r} fill="currentColor" />
          <path
            d={segment.arm}
            fill="none"
            stroke="currentColor"
            strokeWidth={segment.armWidth}
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <NetworkMark className={cn("size-8 shrink-0", markClassName)} />
      {showWordmark && (
        <span
          className={cn(
            "font-heading text-[1.4rem] font-bold leading-none tracking-tight text-primary dark:text-foreground",
            wordmarkClassName
          )}
        >
          Coorbitz
        </span>
      )}
    </span>
  );
}
