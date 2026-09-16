import { cn } from "@/lib/utils";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className,
  titleClassName,
}: {
  /** Section number shown in mono before the eyebrow, e.g. "01". */
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
  titleClassName?: string;
}) {
  const Heading = as;
  return (
    <RevealOnScroll
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      {(index || eyebrow) && (
        <p className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center")}>
          {index && <span className="text-muted-foreground">{index}</span>}
          {index && eyebrow && <span aria-hidden className="h-px w-6 bg-border" />}
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "mt-4 font-heading text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          titleClassName
        )}
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{description}</p>
      )}
    </RevealOnScroll>
  );
}
