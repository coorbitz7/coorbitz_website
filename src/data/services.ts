import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Smartphone,
  Code2,
  BrainCircuit,
  Workflow,
  Bot,
  MessageSquare,
  BarChart3,
  Cpu,
  Megaphone,
  SearchCheck,
  Cloud,
  Plug,
  PenTool,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  icon: LucideIcon;
  shortDescription: string;
  overview: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  industriesServed: string[];
};

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    icon: Globe,
    shortDescription:
      "Fast, scalable, and beautifully designed websites and web applications.",
    overview:
      "We design and build high-performance websites and web applications that combine premium design with rock-solid engineering — from marketing sites to complex, data-heavy platforms, built to scale with your business.",
    features: [
      "Custom website & web app design and development",
      "Progressive Web Apps (PWA)",
      "E-commerce storefronts and headless commerce",
      "Content management system integration",
      "Third-party API and payment gateway integration",
      "Ongoing performance monitoring and maintenance",
    ],
    benefits: [
      "Sub-second load times and top-tier Core Web Vitals",
      "Responsive, accessible design across every device",
      "SEO-first architecture that ranks",
      "Scalable codebase that grows with your product",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL"],
    industriesServed: ["Startups", "E-Commerce", "Enterprise", "Retail", "Healthcare"],
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    icon: Smartphone,
    shortDescription:
      "Native and cross-platform mobile apps built for performance and scale.",
    overview:
      "From concept to App Store, we build iOS, Android, and cross-platform mobile applications with native performance, polished UX, and the backend infrastructure to support them.",
    features: [
      "Native iOS (Swift) and Android (Kotlin) development",
      "Cross-platform apps with React Native & Flutter",
      "Offline-first architecture and push notifications",
      "App Store & Play Store submission and optimization",
      "Backend APIs and real-time data sync",
      "Post-launch support and version upgrades",
    ],
    benefits: [
      "One codebase, every platform — lower cost, faster delivery",
      "Native-grade performance and smooth animations",
      "Secure, scalable backend architecture",
      "Continuous delivery pipeline for fast iteration",
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js"],
    industriesServed: ["Retail", "Healthcare", "Logistics", "Hospitality", "Startups"],
  },
  {
    id: "custom-software-development",
    title: "Custom Software Development",
    icon: Code2,
    shortDescription:
      "Tailor-made software systems engineered around your exact workflows.",
    overview:
      "When off-the-shelf software falls short, we design and engineer custom platforms — ERPs, internal tools, marketplaces, and SaaS products — built precisely around how your business actually operates.",
    features: [
      "Requirement discovery & solution architecture",
      "Custom ERP, CRM, and internal tooling",
      "Multi-tenant SaaS platform development",
      "Legacy system modernization",
      "Microservices and API-first architecture",
      "Quality assurance and automated testing",
    ],
    benefits: [
      "Software that fits your process, not the other way around",
      "Clean, maintainable architecture that scales with demand",
      "Reduced operational overhead through automation",
      "Full ownership of source code and IP",
    ],
    technologies: [".NET", "Java", "Node.js", "Python", "PostgreSQL", "Docker"],
    industriesServed: ["Enterprise", "Manufacturing", "Finance", "Logistics", "Government"],
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    icon: BrainCircuit,
    shortDescription:
      "Embed generative AI and machine intelligence directly into your products.",
    overview:
      "We integrate large language models and AI capabilities into your existing products and workflows — from intelligent search and content generation to predictive features that create real competitive advantage.",
    features: [
      "LLM integration (OpenAI, Anthropic, open-source models)",
      "Retrieval-augmented generation (RAG) pipelines",
      "AI-powered search and recommendation engines",
      "Prompt engineering and fine-tuning",
      "Vector database implementation",
      "AI feature discovery workshops",
    ],
    benefits: [
      "Ship AI features in weeks, not quarters",
      "Reduce manual work with intelligent automation",
      "Differentiate your product with AI-native experiences",
      "Responsible AI practices and guardrails built in",
    ],
    technologies: ["OpenAI API", "Anthropic Claude", "LangChain", "Pinecone", "Python", "Next.js"],
    industriesServed: ["Startups", "Enterprise", "Finance", "Healthcare", "Retail"],
  },
  {
    id: "business-automation",
    title: "Business Automation",
    icon: Workflow,
    shortDescription:
      "Automate repetitive processes and free your team to focus on growth.",
    overview:
      "We map your operational workflows and design automation systems that eliminate manual busywork — from document processing to cross-system data sync — cutting costs and human error simultaneously.",
    features: [
      "Workflow mapping and process automation audits",
      "RPA (Robotic Process Automation) implementation",
      "Document processing and data extraction",
      "Cross-platform system integrations (iPaaS)",
      "Automated reporting and dashboards",
      "Custom internal automation tools",
    ],
    benefits: [
      "Reclaim hundreds of staff hours every month",
      "Fewer errors from manual data entry",
      "Faster turnaround on operational processes",
      "Clear ROI within the first few months",
    ],
    technologies: ["Zapier", "n8n", "Power Automate", "Python", "UiPath", "REST APIs"],
    industriesServed: ["Finance", "Manufacturing", "Logistics", "Retail", "Small Business"],
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    icon: Bot,
    shortDescription:
      "Autonomous AI agents that plan, decide, and execute multi-step tasks.",
    overview:
      "We build goal-driven AI agents that go beyond chat — orchestrating tools, APIs, and business logic to autonomously complete complex, multi-step workflows on your behalf.",
    features: [
      "Multi-step autonomous task agents",
      "Tool-use and function-calling orchestration",
      "Agent-to-agent and human-in-the-loop workflows",
      "Custom knowledge base and memory systems",
      "Monitoring, observability, and guardrails",
      "Integration with existing business systems",
    ],
    benefits: [
      "Automate work that used to require human judgment",
      "24/7 execution without added headcount",
      "Composable agents that scale across departments",
      "Built-in safety limits and human oversight",
    ],
    technologies: ["LangGraph", "OpenAI Agents SDK", "Claude Agent SDK", "Python", "Redis", "PostgreSQL"],
    industriesServed: ["Enterprise", "Finance", "E-Commerce", "Startups", "Legal"],
  },
  {
    id: "ai-chatbots",
    title: "AI Chatbots",
    icon: MessageSquare,
    shortDescription:
      "Conversational AI that resolves support, sales, and internal queries.",
    overview:
      "We design and deploy intelligent chatbots trained on your business knowledge — handling customer support, lead qualification, and internal Q&A with natural, on-brand conversations.",
    features: [
      "Custom-trained conversational AI",
      "Website, WhatsApp, and Slack/Teams integration",
      "Lead qualification and CRM handoff",
      "Multilingual support",
      "Human escalation workflows",
      "Conversation analytics dashboard",
    ],
    benefits: [
      "Instant, 24/7 customer response times",
      "Lower support costs at higher volume",
      "Higher lead conversion through instant engagement",
      "Consistent, on-brand answers every time",
    ],
    technologies: ["OpenAI API", "Anthropic Claude", "Dialogflow", "Twilio", "Next.js", "WebSockets"],
    industriesServed: ["Retail", "E-Commerce", "Healthcare", "Hospitality", "Real Estate"],
  },
  {
    id: "data-analysis",
    title: "Data Analysis",
    icon: BarChart3,
    shortDescription:
      "Turn raw data into decisions with dashboards and analytics pipelines.",
    overview:
      "We build the data infrastructure and analytics layer that turns scattered business data into clear, actionable insight — from ETL pipelines to executive dashboards.",
    features: [
      "Data warehousing and ETL pipeline design",
      "Business intelligence dashboards",
      "Predictive and statistical analysis",
      "Data cleansing and quality frameworks",
      "Real-time analytics pipelines",
      "Custom KPI and reporting systems",
    ],
    benefits: [
      "Decisions backed by real-time, trustworthy data",
      "Unified view across every business system",
      "Faster reporting cycles for leadership",
      "Early detection of trends and anomalies",
    ],
    technologies: ["Python", "SQL", "Power BI", "Tableau", "dbt", "Snowflake"],
    industriesServed: ["Finance", "Retail", "Healthcare", "Manufacturing", "Enterprise"],
  },
  {
    id: "machine-learning-solutions",
    title: "Machine Learning Solutions",
    icon: Cpu,
    shortDescription:
      "Custom ML models for prediction, classification, and optimization.",
    overview:
      "We design, train, and deploy custom machine learning models tailored to your specific business problem — from demand forecasting to fraud detection to computer vision.",
    features: [
      "Custom model design, training, and evaluation",
      "Computer vision and image recognition",
      "Demand forecasting and predictive maintenance",
      "Fraud and anomaly detection",
      "MLOps pipeline and model deployment",
      "Model monitoring and retraining pipelines",
    ],
    benefits: [
      "Models tuned specifically to your data and problem",
      "Production-grade deployment, not just notebooks",
      "Ongoing monitoring to catch model drift early",
      "Measurable impact on cost, risk, or revenue",
    ],
    technologies: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "MLflow", "AWS SageMaker"],
    industriesServed: ["Manufacturing", "Finance", "Healthcare", "Logistics", "Automotive"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    shortDescription:
      "Data-driven marketing campaigns that generate measurable growth.",
    overview:
      "Our digital marketing team plans and executes full-funnel campaigns — paid, organic, and content — designed around measurable growth metrics, not vanity numbers.",
    features: [
      "Paid search and social advertising (PPC)",
      "Content strategy and marketing automation",
      "Email marketing and lifecycle campaigns",
      "Conversion rate optimization",
      "Marketing analytics and attribution",
      "Social media management",
    ],
    benefits: [
      "Lower customer acquisition cost over time",
      "Clear attribution from spend to revenue",
      "Consistent brand presence across channels",
      "Campaigns optimized continuously, not set-and-forget",
    ],
    technologies: ["Google Ads", "Meta Ads", "HubSpot", "Google Analytics 4", "Klaviyo", "Semrush"],
    industriesServed: ["Retail", "E-Commerce", "Real Estate", "Hospitality", "Small Business"],
  },
  {
    id: "seo-optimization",
    title: "SEO Optimization",
    icon: SearchCheck,
    shortDescription:
      "Technical, on-page, and content SEO that compounds organic traffic.",
    overview:
      "We combine technical SEO, content strategy, and authority building to move your site up the rankings for the searches that actually drive revenue.",
    features: [
      "Technical SEO audits and fixes",
      "Keyword research and content strategy",
      "On-page optimization and structured data",
      "Link building and digital PR",
      "Local SEO and Google Business Profile optimization",
      "Ongoing rank tracking and reporting",
    ],
    benefits: [
      "Sustainable, compounding organic traffic growth",
      "Higher-quality leads at a lower cost than paid ads",
      "Improved site health and Core Web Vitals",
      "Transparent monthly reporting on rankings and traffic",
    ],
    technologies: ["Google Search Console", "Ahrefs", "Semrush", "Screaming Frog", "Schema.org", "Google Analytics 4"],
    industriesServed: ["E-Commerce", "Real Estate", "Legal", "Healthcare", "Small Business"],
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    icon: Cloud,
    shortDescription:
      "Cloud architecture, migration, and DevOps built for reliability at scale.",
    overview:
      "We design and manage cloud infrastructure that's secure, cost-optimized, and built to scale — including migrations, CI/CD pipelines, and 24/7 monitoring across AWS, Azure, and GCP.",
    features: [
      "Cloud architecture design and migration",
      "CI/CD pipeline setup and DevOps automation",
      "Infrastructure as Code (Terraform, CloudFormation)",
      "Kubernetes and container orchestration",
      "Cost optimization and cloud FinOps",
      "24/7 monitoring, backups, and disaster recovery",
    ],
    benefits: [
      "Lower infrastructure costs through right-sizing",
      "Faster, safer deployments with automated pipelines",
      "High availability and disaster recovery built in",
      "Security best practices applied by default",
    ],
    technologies: ["AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Terraform", "Docker"],
    industriesServed: ["Enterprise", "Finance", "Healthcare", "Government", "Startups"],
  },
  {
    id: "api-development",
    title: "API Development",
    icon: Plug,
    shortDescription:
      "Secure, well-documented APIs that connect your entire tech ecosystem.",
    overview:
      "We design and build REST and GraphQL APIs that are fast, secure, and easy to integrate — the connective tissue between your products, partners, and internal systems.",
    features: [
      "REST and GraphQL API design & development",
      "Third-party and partner API integrations",
      "API gateway, rate limiting, and authentication",
      "Webhook and event-driven architecture",
      "Interactive API documentation",
      "Versioning and backward-compatibility strategy",
    ],
    benefits: [
      "Faster integrations for partners and internal teams",
      "Secure by design with proper auth and rate limiting",
      "Well-documented APIs that reduce support overhead",
      "Architecture built to evolve without breaking clients",
    ],
    technologies: ["Node.js", "GraphQL", "REST", "OpenAPI", "PostgreSQL", "Redis"],
    industriesServed: ["Enterprise", "Finance", "E-Commerce", "Logistics", "Startups"],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: PenTool,
    shortDescription:
      "Research-driven product design that's as intuitive as it is beautiful.",
    overview:
      "Our design team combines user research, interaction design, and premium visual craft to create digital products that are effortless to use and unmistakably on-brand.",
    features: [
      "User research and usability testing",
      "Wireframing and interactive prototyping",
      "Design systems and component libraries",
      "Brand identity and visual design",
      "Accessibility (WCAG) audits and remediation",
      "Motion and micro-interaction design",
    ],
    benefits: [
      "Higher conversion through friction-free journeys",
      "Consistent design system across every product surface",
      "Accessible experiences that reach every user",
      "Design decisions backed by real user research",
    ],
    technologies: ["Figma", "Framer", "Adobe Creative Cloud", "Storybook", "Maze", "Zeroheight"],
    industriesServed: ["Startups", "E-Commerce", "Healthcare", "Finance", "Enterprise"],
  },
];

export function getServiceById(id: string) {
  return services.find((service) => service.id === id);
}
