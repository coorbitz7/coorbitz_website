import type { LucideIcon } from "lucide-react";
import { Factory, Ship, ShoppingBag, UtensilsCrossed, Briefcase, Rocket, TrendingUp } from "lucide-react";

export type Industry = {
  id: string;
  title: string;
  icon: LucideIcon;
  /** What we typically find when we arrive — written plainly, no claimed credentials. */
  description: string;
  /** Three short examples of where we help. */
  examples: string[];
  relevantServiceIds: string[];
};

export const industries: Industry[] = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    icon: Factory,
    description:
      "Manufacturers usually come to us with a data problem dressed as a software problem: production numbers in three places, quality logs on paper, forecasts in someone's head.",
    examples: ["Production and quality dashboards", "Demand and maintenance forecasting", "Shop-floor and inventory tooling"],
    relevantServiceIds: ["data-analytics", "ai-machine-learning", "custom-software"],
  },
  {
    id: "trading-logistics",
    title: "Trading & Logistics",
    icon: Ship,
    description:
      "Trade and logistics businesses run on outreach, documents and follow-ups across time zones. We built the internal systems for exactly that inside our own parent company.",
    examples: ["Lead and buyer pipelines by region", "Shipment and document tracking", "Inbox triage and reply drafting"],
    relevantServiceIds: ["custom-software", "ai-agents-automation", "data-analytics"],
  },
  {
    id: "retail-ecommerce",
    title: "Retail & E-commerce",
    icon: ShoppingBag,
    description:
      "Storefronts that load fast and are easy to run, plus the back office behind them: orders, inventory, content and the analytics to see what's working.",
    examples: ["Storefronts and product configurators", "Order, inventory and admin tooling", "Search, analytics and conversion tracking"],
    relevantServiceIds: ["web-app-development", "digital-solutions", "ai-agents-automation"],
  },
  {
    id: "restaurants-hospitality",
    title: "Restaurants & Hospitality",
    icon: UtensilsCrossed,
    description:
      "Independent restaurants and venues need a site that works on a phone, a menu the owner can change, and ordering that doesn't hand every customer to a third-party app.",
    examples: ["Launch and full websites with editable menus", "Ordering and reservation flows", "Local search and Google Business setup"],
    relevantServiceIds: ["web-app-development", "digital-solutions"],
  },
  {
    id: "professional-services",
    title: "Professional Services",
    icon: Briefcase,
    description:
      "Agencies, advisors and consultancies buried in repeatable admin: intake, documents, reporting and follow-ups that eat the hours you'd rather bill.",
    examples: ["Client portals and intake workflows", "Document generation and review automation", "Reporting that runs itself"],
    relevantServiceIds: ["ai-agents-automation", "custom-software", "data-analytics"],
  },
  {
    id: "startups",
    title: "Startups",
    icon: Rocket,
    description:
      "Early teams need a first version that's real enough to sell and clean enough to build on. We help scope it down, ship it, and avoid the rewrite.",
    examples: ["MVPs and first production releases", "AI features inside the product", "Architecture and hiring advice"],
    relevantServiceIds: ["web-app-development", "ai-machine-learning", "custom-software"],
  },
  {
    id: "growing-businesses",
    title: "Growing businesses",
    icon: TrendingUp,
    description:
      "Companies past the spreadsheet stage but nowhere near enterprise software. We build the practical middle: systems sized for where you are, with room to grow.",
    examples: ["Replacing spreadsheets with real systems", "Connecting the tools you already pay for", "Automating the weekly grind"],
    relevantServiceIds: ["custom-software", "ai-agents-automation", "digital-solutions"],
  },
];

export function getIndustryById(id: string) {
  return industries.find((industry) => industry.id === id);
}
