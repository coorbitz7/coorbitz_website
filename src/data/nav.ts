export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = { label: "Start a project", href: "/contact" };

export const footerNav = {
  services: [
    { label: "AI & Machine Learning", href: "/services#ai-machine-learning" },
    { label: "AI Agents & Automation", href: "/services#ai-agents-automation" },
    { label: "Custom Software", href: "/services#custom-software" },
    { label: "Web & App Development", href: "/services#web-app-development" },
    { label: "Data & Analytics", href: "/services#data-analytics" },
    { label: "Digital Solutions", href: "/services#digital-solutions" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Industries", href: "/industries" },
    { label: "How we build", href: "/#how-we-build" },
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
} satisfies Record<string, NavItem[]>;
