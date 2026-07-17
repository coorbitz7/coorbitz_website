// Sample insights/blog preview data — a lightweight, blog-ready content structure.
export type Insight = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO date
  readTime: string;
};

export const insights: Insight[] = [
  {
    id: "ai-agents-2026",
    title: "Why 2026 Is the Year AI Agents Move Into Production",
    excerpt:
      "Autonomous agents are graduating from demos to core business infrastructure. Here's what separates a proof-of-concept from a production-grade agent.",
    category: "Artificial Intelligence",
    date: "2026-05-14",
    readTime: "6 min read",
  },
  {
    id: "cloud-cost-optimization",
    title: "5 Cloud Cost Optimizations Most Enterprises Overlook",
    excerpt:
      "Practical, low-risk changes that typically cut cloud spend by 20–30% without touching application architecture.",
    category: "Cloud Solutions",
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
];
