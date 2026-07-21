import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { IndustriesOverview } from "@/components/sections/industries-overview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { FaqSection } from "@/components/sections/faq-section";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { ContactCta } from "@/components/sections/contact-cta";
import { ParentNetworkStrip } from "@/components/sections/parent-network-strip";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
  keywords: [
    "IT company",
    "AI company",
    "software development company",
    "web development company",
    "AI integration company",
    "business automation company",
    "custom software development",
    "AI chatbot development",
    "data analytics company",
    "IT company Chicago Illinois",
    "software development company Mehsana Gujarat",
    "Coorbitz",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <IndustriesOverview />
      <WhyChooseUs />
      <ProcessTimeline />
      <TechStackSection />
      <FaqSection />
      <InsightsPreview />
      <ContactCta />
      <ParentNetworkStrip />
    </>
  );
}
