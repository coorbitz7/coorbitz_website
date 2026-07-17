import { Container } from "@/components/shared/container";
import { siteConfig } from "@/data/site";

export function ParentNetworkStrip() {
  return (
    <section className="border-t py-6">
      <Container>
        <p className="text-center text-sm text-muted-foreground">
          Part of the {siteConfig.parentCompany.name} global network — Global Headquarters in{" "}
          {siteConfig.locations.headquarters.city}, with Development &amp; Operations in{" "}
          {siteConfig.locations.development.city}.
        </p>
      </Container>
    </section>
  );
}
