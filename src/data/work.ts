// Selected work. Every entry describes a real system built by the team; client and prospect
// names are withheld, and there are no outcome figures because we don't publish numbers we
// can't independently substantiate. Add `outcome` only when the client has signed off on it.

export type WorkKind = "Client build" | "Internal system" | "Proposal prototype" | "Internal R&D";

export type WorkItem = {
  id: string;
  title: string;
  kind: WorkKind;
  industry: string;
  industryId: string;
  year: string;
  summary: string;
  problem: string;
  approach: string;
  stack: string[];
  serviceIds: string[];
  outcome?: string;
  note?: string;
};

export const workItems: WorkItem[] = [
  {
    id: "restaurant-launch-site",
    title: "Launch site and full website for an independent restaurant",
    kind: "Client build",
    industry: "Restaurants & Hospitality",
    industryId: "restaurants-hospitality",
    year: "2026",
    summary:
      "A new wings, tacos and pizza kitchen in Illinois needed a presence before opening day, with the full site ready to switch on once the menu was signed off.",
    problem:
      "The restaurant hadn't opened yet. Menu, prices and the ordering flow weren't final, but the business needed something live for customers and partners to find, without publishing details that were still going to change.",
    approach:
      "We built the full site and a separate one-page launch site from the same codebase and the owner's brand artwork. Menu items live in structured data, so the owners can update names, prices and sections without touching layout. The launch page went live first; the full site is staged and ready to switch on.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    serviceIds: ["web-app-development", "digital-solutions"],
    note: "Client name withheld until opening.",
  },
  {
    id: "trade-operations-platform",
    title: "Operations platform for an export trading business",
    kind: "Internal system",
    industry: "Trading & Logistics",
    industryId: "trading-logistics",
    year: "2025 – 2026",
    summary:
      "One internal system for finding buyers, running outreach, handling replies and tracking shipments for our parent company's scrap-metal export trade.",
    problem:
      "Contacts, outreach, replies and shipment status were spread across inboxes, spreadsheets and chat, with several people working different regions and no shared view of where each deal stood.",
    approach:
      "A modular platform: a contacts module for buyers, suppliers and freight partners; an outreach pipeline with templated sequences and controlled sending; inbox ingestion that classifies replies and drafts suggested responses; and shipment tracking from yard to port. Every change is reviewed through pull requests before it ships.",
    stack: ["Python 3.12", "FastAPI", "Next.js 14", "TypeScript", "PostgreSQL 16", "Docker Compose", "GitHub Actions"],
    serviceIds: ["custom-software", "ai-agents-automation", "data-analytics"],
  },
  {
    id: "outdoor-living-storefront",
    title: "E-commerce prototype for a motorized-pergola retailer",
    kind: "Proposal prototype",
    industry: "Retail & E-commerce",
    industryId: "retail-ecommerce",
    year: "2026",
    summary:
      "A working storefront demo with shop, filters, quick view, product comparison, interactive 3D product views and a mocked back office, built as a proposal for an outdoor-living retailer.",
    problem:
      "The prospect's existing catalog was hard to browse and gave no sense of the product in a real space. A slide deck wouldn't have shown what a better store could feel like to use.",
    approach:
      "We built the store itself rather than describing it: product browsing with filters and comparison, interactive 3D pergola views with React Three Fiber, and an admin area with clearly labeled demo data. Checkout and authentication are mocked by design.",
    stack: ["Next.js", "React Three Fiber", "Three.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    serviceIds: ["web-app-development"],
    note: "Built under a placeholder brand; imagery and checkout were demo-only.",
  },
  {
    id: "matcha-storefront-redesign",
    title: "Storefront redesign concept for a specialty matcha shop",
    kind: "Proposal prototype",
    industry: "Retail & E-commerce",
    industryId: "retail-ecommerce",
    year: "2026",
    summary:
      "A redesigned direct-to-consumer storefront plus the back office the shop's current site lacks, using the shop's real products and business details.",
    problem:
      "The existing site undersold a premium product and offered no way to manage orders or content. The shop needed to see what a better version looked like before committing.",
    approach:
      "A polished storefront built around the eight products the shop actually sells, its real location and workshop details, and a proposed identity, with everything speculative labeled as proposal rather than presented as fact.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    serviceIds: ["web-app-development", "digital-solutions"],
  },
  {
    id: "futures-research-system",
    title: "Research pipeline and automated trading strategy",
    kind: "Internal R&D",
    industry: "Data & Analytics",
    industryId: "growing-businesses",
    year: "2026",
    summary:
      "A pre-registered research program over years of 1-minute futures data, and the automated NinjaTrader 8 strategy it selected.",
    problem:
      "Most trading automation is built on hindsight. We wanted a strategy that survives a held-out test before it goes near an account, with the account's risk rules enforced in code rather than by discipline.",
    approach:
      "Decoded and validated raw market data, ran a fixed research plan with holdout validation, then implemented the chosen strategy in C# with an automated test suite and simulation-parity checks against the research results. The current verdict is “promising, not yet approved for live trading”, and we're comfortable saying so.",
    stack: ["Python", "pandas", "C# / .NET", "NinjaTrader 8"],
    serviceIds: ["data-analytics", "ai-machine-learning"],
  },
  {
    id: "ml-trading-research-platform",
    title: "Machine-learning trading research platform",
    kind: "Internal R&D",
    industry: "Data & Analytics",
    industryId: "growing-businesses",
    year: "2025 – 2026",
    summary:
      "An event-driven backtester, feature pipeline and paper-trading system combining ML regression, reinforcement learning and risk management, with an operations dashboard.",
    problem:
      "Evaluating machine-learning ideas for markets honestly needs causal features, realistic execution and reproducible experiments. Most notebooks have none of the three.",
    approach:
      "A pipeline of causal features over pluggable data providers, an event-driven backtester with paper and live execution paths, and a Streamlit dashboard for operations. The whole system runs offline against a synthetic provider so experiments are reproducible.",
    stack: ["Python", "PyTorch", "scikit-learn", "SQLite", "Streamlit"],
    serviceIds: ["ai-machine-learning", "data-analytics"],
  },
];

export function getWorkById(id: string) {
  return workItems.find((item) => item.id === id);
}
