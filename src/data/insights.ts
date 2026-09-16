// Blog taxonomy and post structure. No sample or placeholder articles are shipped: the
// Insights page shows the categories and an honest "coming soon" until real writing exists.
// Add real posts here (with a real date and author) as they're published.
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

export const insights: Insight[] = [];
