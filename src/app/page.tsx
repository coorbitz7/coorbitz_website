import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesExplorer } from "@/components/sections/services-explorer";
import { HowWeBuild } from "@/components/sections/how-we-build";
import { SystemFlow } from "@/components/sections/system-flow";
import { IndustriesOverview } from "@/components/sections/industries-overview";
import { WorkPreview } from "@/components/sections/work-preview";
import { WorkingWithUs } from "@/components/sections/working-with-us";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactCta } from "@/components/sections/contact-cta";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  keywords: [
    "custom software development",
    "AI development company",
    "AI agents and automation",
    "business automation",
    "web development company",
    "data analytics",
    "software company Chicago Illinois",
    "software company Mehsana Gujarat",
    "Coorbitz",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesExplorer />
      <HowWeBuild />
      <SystemFlow />
      <IndustriesOverview />
      <WorkPreview />
      <WorkingWithUs />
      <TechStackSection />
      <FaqSection />
      <ContactCta />
    </>
  );
}
