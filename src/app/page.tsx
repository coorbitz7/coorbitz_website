import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { ServicesOverview } from "@/components/sections/services-overview";
import { IndustriesOverview } from "@/components/sections/industries-overview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { FaqSection } from "@/components/sections/faq-section";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { ContactCta } from "@/components/sections/contact-cta";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesOverview />
      <IndustriesOverview />
      <WhyChooseUs />
      <ProcessTimeline />
      <TechStackSection />
      <TestimonialsCarousel />
      <FaqSection />
      <InsightsPreview />
      <ContactCta />
    </>
  );
}
