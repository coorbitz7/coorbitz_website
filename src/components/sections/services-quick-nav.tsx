import Link from "next/link";
import { Container } from "@/components/shared/container";
import { services } from "@/data/services";

export function ServicesQuickNav() {
  return (
    <div className="sticky top-16 z-30 border-b glass lg:top-20">
      <Container>
        <nav className="scrollbar-none flex gap-1 overflow-x-auto py-3">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`#${service.id}`}
              className="shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {service.title}
            </Link>
          ))}
        </nav>
      </Container>
    </div>
  );
}
