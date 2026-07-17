import type { LucideIcon } from "lucide-react";
import {
  HeartPulse,
  Landmark,
  Factory,
  GraduationCap,
  Store,
  Building,
  ShoppingCart,
  Truck,
  Hotel,
  Scale,
  Car,
  Landmark as GovIcon,
  Rocket,
  Briefcase,
  Building2,
} from "lucide-react";

export type Industry = {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  relevantServiceIds: string[];
};

export const industries: Industry[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    icon: HeartPulse,
    description:
      "HIPAA-aware software for providers and health-tech platforms — patient portals, scheduling, telehealth, and clinical data systems.",
    relevantServiceIds: ["web-development", "custom-software-development", "ai-integration", "data-analysis"],
  },
  {
    id: "finance",
    title: "Finance",
    icon: Landmark,
    description:
      "Secure, compliant platforms for banks, fintechs, and financial advisors — from fraud detection to automated reporting.",
    relevantServiceIds: ["machine-learning-solutions", "business-automation", "cloud-solutions", "api-development"],
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    icon: Factory,
    description:
      "Predictive maintenance, supply chain visibility, and shop-floor automation for modern manufacturers.",
    relevantServiceIds: ["business-automation", "machine-learning-solutions", "custom-software-development"],
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    description:
      "Learning management systems, student portals, and AI-driven personalized learning tools for institutions and edtechs.",
    relevantServiceIds: ["web-development", "mobile-app-development", "ai-chatbots"],
  },
  {
    id: "retail",
    title: "Retail",
    icon: Store,
    description:
      "Omnichannel commerce experiences, inventory intelligence, and personalization engines that drive repeat purchases.",
    relevantServiceIds: ["web-development", "mobile-app-development", "digital-marketing", "ai-chatbots"],
  },
  {
    id: "real-estate",
    title: "Real Estate",
    icon: Building,
    description:
      "Property listing platforms, CRM integrations, and virtual tour experiences for agencies and proptech startups.",
    relevantServiceIds: ["web-development", "seo-optimization", "ai-chatbots"],
  },
  {
    id: "e-commerce",
    title: "E-Commerce",
    icon: ShoppingCart,
    description:
      "High-converting storefronts, headless commerce, and AI-powered recommendations built for scale.",
    relevantServiceIds: ["web-development", "digital-marketing", "seo-optimization", "ai-agents"],
  },
  {
    id: "logistics",
    title: "Logistics",
    icon: Truck,
    description:
      "Route optimization, fleet tracking, and warehouse automation systems that cut cost and delivery time.",
    relevantServiceIds: ["business-automation", "machine-learning-solutions", "api-development"],
  },
  {
    id: "hospitality",
    title: "Hospitality",
    icon: Hotel,
    description:
      "Booking engines, guest experience apps, and AI concierge chatbots for hotels, resorts, and venues.",
    relevantServiceIds: ["mobile-app-development", "ai-chatbots", "web-development"],
  },
  {
    id: "legal",
    title: "Legal",
    icon: Scale,
    description:
      "Document automation, contract analysis, and case management systems for law firms and legal-tech platforms.",
    relevantServiceIds: ["ai-agents", "business-automation", "custom-software-development"],
  },
  {
    id: "automotive",
    title: "Automotive",
    icon: Car,
    description:
      "Dealer management platforms, predictive maintenance models, and connected-vehicle data pipelines.",
    relevantServiceIds: ["machine-learning-solutions", "custom-software-development", "data-analysis"],
  },
  {
    id: "government",
    title: "Government",
    icon: GovIcon,
    description:
      "Secure citizen-facing portals and internal process modernization built to public-sector compliance standards.",
    relevantServiceIds: ["cloud-solutions", "custom-software-development", "business-automation"],
  },
  {
    id: "startups",
    title: "Startups",
    icon: Rocket,
    description:
      "MVP builds, fractional CTO guidance, and scalable architecture that helps early-stage teams ship fast without rework.",
    relevantServiceIds: ["web-development", "mobile-app-development", "ai-integration"],
  },
  {
    id: "small-business",
    title: "Small Business",
    icon: Briefcase,
    description:
      "Affordable websites, automation, and digital marketing packages that punch above their budget.",
    relevantServiceIds: ["web-development", "digital-marketing", "seo-optimization", "business-automation"],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    icon: Building2,
    description:
      "Large-scale system integration, governance, and AI transformation programs for complex organizations.",
    relevantServiceIds: ["custom-software-development", "cloud-solutions", "ai-agents", "api-development"],
  },
];
