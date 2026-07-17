export type TechCategory = {
  category: string;
  items: string[];
};

export const techStack: TechCategory[] = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"] },
  { category: "Backend", items: ["Node.js", "Python", ".NET", "Java", "GraphQL"] },
  { category: "Mobile", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
  { category: "AI & Data", items: ["OpenAI", "Anthropic Claude", "LangChain", "PyTorch", "Pinecone"] },
  { category: "Cloud & DevOps", items: ["AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"] },
  { category: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Snowflake"] },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "We dive into your business goals, users, and constraints through structured discovery workshops.",
  },
  {
    step: "02",
    title: "Design",
    description: "Solution architecture and UX design get validated with stakeholders before a single line of code ships.",
  },
  {
    step: "03",
    title: "Develop",
    description: "Agile sprints with weekly demos — you see progress continuously, not just at the end.",
  },
  {
    step: "04",
    title: "Deploy",
    description: "Rigorous QA, staged rollouts, and production deployment with zero-downtime releases.",
  },
  {
    step: "05",
    title: "Support & Scale",
    description: "Ongoing monitoring, iteration, and scaling support as your product and user base grow.",
  },
] as const;

export const whyChooseUs = [
  {
    title: "Proven Delivery Track Record",
    description: "200+ projects delivered across 15+ industries since 2016.",
  },
  {
    title: "Dedicated AI Practice",
    description: "A specialized team focused exclusively on AI integration, agents, and automation.",
  },
  {
    title: "US + India Global Model",
    description: "US-based account management with a scalable, cost-efficient India delivery team.",
  },
  {
    title: "Transparent Engagement",
    description: "Fixed-scope, time & materials, or dedicated team — clear pricing with no hidden costs.",
  },
  {
    title: "Security & Compliance First",
    description: "Secure SDLC practices applied to every engagement, regardless of size.",
  },
  {
    title: "Long-Term Partnership",
    description: "Average client relationship of 3+ years — we build for the long run, not one-off projects.",
  },
] as const;

export const stats = [
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 150, suffix: "+", label: "Team Members" },
  { value: 15, suffix: "+", label: "Industries Served" },
  { value: 98, suffix: "%", label: "Client Retention" },
] as const;
