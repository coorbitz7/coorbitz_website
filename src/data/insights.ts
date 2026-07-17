// Sample insights/blog preview data — a lightweight, blog-ready content structure.
// `categories` is the full taxonomy the blog is structured around; not every category
// needs a published post yet — add real articles under these categories as they're written.
export const categories = [
  "AI",
  "Automation",
  "Software Development",
  "Web Development",
  "Cloud",
  "Cybersecurity",
  "Business Growth",
  "SEO",
  "Technology",
] as const;

export type InsightCategory = (typeof categories)[number];

export type Insight = {
  id: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  date: string; // ISO date
  readTime: string;
};

export const insights: Insight[] = [
  {
    id: "ai-agents-2026",
    title: "Why 2026 Is the Year AI Agents Move Into Production",
    excerpt:
      "Autonomous agents are graduating from demos to core business infrastructure. Here's what separates a proof-of-concept from a production-grade agent.",
    category: "AI",
    date: "2026-05-14",
    readTime: "6 min read",
  },
  {
    id: "cloud-cost-optimization",
    title: "5 Cloud Cost Optimizations Most Enterprises Overlook",
    excerpt:
      "Practical, low-risk changes that typically cut cloud spend by 20–30% without touching application architecture.",
    category: "Cloud",
    date: "2026-04-22",
    readTime: "5 min read",
  },
  {
    id: "choosing-tech-stack-startups",
    title: "How Startups Should Actually Choose a Tech Stack in 2026",
    excerpt:
      "Framework hype changes every year. The fundamentals for picking a stack that won't need a rewrite haven't.",
    category: "Software Development",
    date: "2026-03-30",
    readTime: "7 min read",
  },
  {
    id: "website-security-checklist",
    title: "The Website Security Checklist Every Growing Business Needs",
    excerpt:
      "Security headers, form protection, and monitoring — the practical baseline every production site should meet before launch.",
    category: "Cybersecurity",
    date: "2026-06-18",
    readTime: "6 min read",
  },
  {
    id: "technical-seo-fundamentals",
    title: "Technical SEO Fundamentals That Still Move Rankings in 2026",
    excerpt:
      "Structured data, Core Web Vitals, and crawlability remain the highest-leverage technical SEO work — here's where to start.",
    category: "SEO",
    date: "2026-02-11",
    readTime: "5 min read",
  },
];
