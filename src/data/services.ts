import type { LucideIcon } from "lucide-react";
import { BrainCircuit, Bot, Blocks, Globe, Database, Compass } from "lucide-react";

export type ServiceSchematic =
  | "model"
  | "agent"
  | "modules"
  | "web"
  | "pipeline"
  | "compass";

export type Service = {
  id: string;
  title: string;
  icon: LucideIcon;
  schematic: ServiceSchematic;
  /** One line, used in lists and navigation. */
  shortDescription: string;
  /** A sentence that states the point of the service without jargon. */
  tagline: string;
  /** Two or three sentences for the detail panel and the services page. */
  overview: string;
  whatWeBuild: string[];
  technologies: string[];
  industriesServed: string[];
};

export const services: Service[] = [
  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    schematic: "model",
    shortDescription:
      "Prediction, classification, document understanding and LLM features built into the tools you already use.",
    tagline: "Models and AI features that earn their place in production.",
    overview:
      "We help teams use AI where it changes an outcome, not as a demo. That means understanding the decision you're trying to improve, choosing between an off-the-shelf model, a fine-tuned one or a plain rules engine, and shipping it with the evaluation, monitoring and fallbacks that let you trust it.",
    whatWeBuild: [
      "LLM features inside existing products: search, drafting, summarization, extraction",
      "Retrieval-augmented generation over your own documents and data",
      "Forecasting, scoring and classification models",
      "Document and image understanding pipelines",
      "Evaluation harnesses, guardrails and human review steps",
      "Monitoring and retraining when the data drifts",
    ],
    technologies: ["Python", "PyTorch", "scikit-learn", "OpenAI", "Anthropic Claude", "LangChain", "pgvector"],
    industriesServed: ["Manufacturing", "Trading & Logistics", "Professional Services", "Startups"],
  },
  {
    id: "ai-agents-automation",
    title: "AI Agents & Automation",
    icon: Bot,
    schematic: "agent",
    shortDescription:
      "Goal-driven agents, workflow automation and system integrations for repetitive, multi-step operations.",
    tagline: "Agents and workflows that take work off your team's plate.",
    overview:
      "Most operational work is a chain of small steps across email, spreadsheets, a CRM and a couple of internal tools. We map that chain, automate the predictable parts with plain workflow tooling, and reserve AI agents for the judgment calls, with clear limits on what they may do alone and when they hand off to a person.",
    whatWeBuild: [
      "Process mapping and automation audits",
      "Workflow automation across email, CRM, ERP and spreadsheets",
      "AI agents that plan, call tools and escalate to a human",
      "Inbox and document triage: classify, extract, route",
      "Approval steps, audit trails and rollback paths",
      "Monitoring, so you know when an automation stops working",
    ],
    technologies: ["Python", "TypeScript", "n8n", "Zapier", "OpenAI", "Anthropic Claude", "REST APIs", "Webhooks"],
    industriesServed: ["Trading & Logistics", "Professional Services", "Retail & E-commerce", "Growing businesses"],
  },
  {
    id: "custom-software",
    title: "Custom Software",
    icon: Blocks,
    schematic: "modules",
    shortDescription:
      "Operations platforms, internal tools and back-office systems when off-the-shelf software stops fitting.",
    tagline: "Internal platforms and business systems built around how you actually operate.",
    overview:
      "When the spreadsheet has become the system, or the SaaS tool needs a workaround for every second task, we build software that matches the real process. Then we keep it maintainable: clear data models, tests, documentation and a deployment path your own team can run.",
    whatWeBuild: [
      "Operations and back-office platforms",
      "Internal tools, admin panels and dashboards",
      "Customer and partner portals",
      "Integrations with accounting, CRM, ERP and payment systems",
      "APIs and data models designed for the next five years, not the next sprint",
      "Migration off spreadsheets and legacy systems",
    ],
    technologies: ["TypeScript", "Next.js", "Node.js", "Python", "FastAPI", "Django", "PostgreSQL", "Docker"],
    industriesServed: ["Trading & Logistics", "Manufacturing", "Professional Services", "Growing businesses"],
  },
  {
    id: "web-app-development",
    title: "Web & App Development",
    icon: Globe,
    schematic: "web",
    shortDescription:
      "Marketing sites, storefronts and web apps that are quick to load, easy to update and pleasant to use.",
    tagline: "Fast, well-built websites and web applications.",
    overview:
      "From a restaurant's launch site to a multi-step storefront, we design and build on the web with an eye on what matters after launch: performance, accessibility, search visibility, and how easily your team can change content without calling us.",
    whatWeBuild: [
      "Company and product websites",
      "E-commerce storefronts and product configurators",
      "Web applications and customer-facing dashboards",
      "Content and menu systems non-technical teams can update",
      "Performance, accessibility and technical SEO built in",
      "Hosting, analytics and monitoring set up properly",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    industriesServed: ["Restaurants & Hospitality", "Retail & E-commerce", "Startups", "Professional Services"],
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    icon: Database,
    schematic: "pipeline",
    shortDescription:
      "Pipelines, data models and reporting that turn scattered operational data into something people actually use.",
    tagline: "Reliable data, clear dashboards, decisions you can defend.",
    overview:
      "Good analytics starts with unglamorous plumbing: getting data out of the systems it lives in, cleaning it once, and modeling it so the numbers agree. We build that layer, then the dashboards and reports on top, and we're honest about which questions your data can and can't answer yet.",
    whatWeBuild: [
      "Data pipelines and ETL from operational systems",
      "Warehouse and data-model design",
      "Operational dashboards and scheduled reports",
      "KPI definitions everyone agrees on",
      "Anomaly detection and alerting",
      "Research and quantitative analysis tooling",
    ],
    technologies: ["Python", "SQL", "PostgreSQL", "pandas", "Streamlit"],
    industriesServed: ["Trading & Logistics", "Manufacturing", "Retail & E-commerce", "Professional Services"],
  },
  {
    id: "digital-solutions",
    title: "Digital Solutions",
    icon: Compass,
    schematic: "compass",
    shortDescription:
      "Technical SEO, analytics setup and consulting for teams deciding what to build next.",
    tagline: "Search visibility, digital experiences and practical technology advice.",
    overview:
      "Not every problem needs new software. Sometimes the site needs to be found, the analytics need to be trusted, or a team needs an outside view before committing to a platform. We take on that work directly, and we tell you plainly when the answer is “don't build it”.",
    whatWeBuild: [
      "Technical SEO audits and fixes",
      "Structured data, sitemaps and search visibility",
      "Analytics, tag management and conversion tracking",
      "Technology consulting and build-vs-buy reviews",
      "Vendor and platform evaluations",
      "Roadmaps for gradual modernization",
    ],
    technologies: ["Google Search Console", "GA4", "Google Tag Manager", "Schema.org", "Lighthouse", "Cloudflare"],
    industriesServed: ["Restaurants & Hospitality", "Retail & E-commerce", "Professional Services", "Growing businesses"],
  },
];

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}
