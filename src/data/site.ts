// Central company constants. Update these values to rebrand or correct company info.
export const siteConfig = {
  name: "Coorbitz",
  legalName: "Coorbitz LLC",
  tagline: "Transforming Businesses with AI & Technology",
  description:
    "Coorbitz is an IT Services and Artificial Intelligence Solutions company helping startups, SMEs, and enterprises build scalable digital products and automate business processes using modern technologies and AI.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://coorbitz.com",
  keywords: [
    "IT services company",
    "AI solutions",
    "custom software development",
    "AI integration",
    "business automation",
    "AI agents",
    "AI chatbots",
    "web development company",
    "mobile app development",
    "digital transformation",
    "Coorbitz",
  ],
  email: {
    contact: "coorbitz7@gmail.com",
    careers: "coorbitz7@gmail.com",
    support: "coorbitz7@gmail.com",
  },
  // Placeholder — replace with the real business line before launch.
  phone: {
    us: "+1 (312) 555-0176",
    india: "+91 79905 12345",
  },
  locations: {
    headquarters: {
      label: "Headquarters",
      city: "Chicago, Illinois",
      country: "United States",
      addressLines: ["71 S Wacker Dr, Suite 2400", "Chicago, IL 60606, USA"],
      mapEmbedSrc:
        "https://www.google.com/maps?q=71+S+Wacker+Dr,+Chicago,+IL+60606&output=embed",
    },
    development: {
      label: "Development Office",
      city: "Mehsana, Gujarat",
      country: "India",
      addressLines: ["3rd Floor, Orbit Business Hub", "Mehsana, Gujarat 384002, India"],
      mapEmbedSrc:
        "https://www.google.com/maps?q=Mehsana,+Gujarat,+India&output=embed",
    },
  },
  businessHours: [
    { days: "Monday – Friday", hours: "10:00 AM – 6:00 PM (IST)" },
    { days: "Saturday", hours: "Closed" },
    { days: "Sunday", hours: "Closed" },
  ],
  social: {
    linkedin: "https://linkedin.com/company/coorbitz",
    twitter: "https://x.com/coorbitz",
    facebook: "https://facebook.com/coorbitz",
    instagram: "https://instagram.com/coorbitz",
    github: "https://github.com/coorbitz",
  },
  whatsappNumber: "13125550176",
} as const;

export type SiteConfig = typeof siteConfig;
