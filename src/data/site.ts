// Central company constants. Update these values to rebrand or correct company info.
export const siteConfig = {
  name: "Coorbitz",
  legalName: "Coorbitz LLC",
  tagline: "Software, AI and automation for growing businesses",
  description:
    "Coorbitz designs and builds custom software, AI systems and business automation for startups and growing companies, with engineering teams in Chicago, Illinois and Mehsana, Gujarat.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://coorbitz.com",
  keywords: [
    "custom software development",
    "AI development company",
    "AI agents",
    "business automation",
    "web development company",
    "data analytics",
    "software company Chicago",
    "software company Mehsana Gujarat",
    "Coorbitz",
  ],
  email: {
    contact: "info@coorbitz.com",
    careers: "info@coorbitz.com",
    support: "info@coorbitz.com",
  },
  phone: {
    us: "+1 (872) 258-2235",
    india: "+91 82006 88817",
  },
  // Coorbitz is the dedicated IT Services & AI Solutions brand operating under Coordinatez.
  parentCompany: {
    name: "Coordinatez",
    relationshipStatement: "Coorbitz is a technology brand of Coordinatez.",
    description:
      "Coorbitz is the software and AI brand of Coordinatez. The parent company's own trading operations are where several of our internal systems were first built and run.",
  },
  locations: {
    headquarters: {
      label: "Headquarters",
      company: "Coordinatez",
      city: "Chicago, Illinois",
      country: "USA",
      // City-level only by design — no street address is published.
      addressLines: [] as string[],
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chicago+Illinois+USA",
    },
    development: {
      label: "Engineering",
      company: "Coorbitz",
      divisionName: "Software & AI engineering",
      city: "Mehsana, Gujarat",
      country: "India",
      addressLines: [] as string[],
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mehsana+Gujarat+India",
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
  whatsappNumber: "18722582235",
  // The Contact page form submits directly to this Formspree endpoint client-side —
  // Formspree delivers each submission to the email configured on the Formspree form itself.
  formspree: {
    contact: process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT || "https://formspree.io/f/xpqvpkol",
  },
} as const;

export type SiteConfig = typeof siteConfig;
