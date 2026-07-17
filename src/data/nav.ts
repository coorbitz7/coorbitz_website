export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  services: [
    { label: "Web Development", href: "/services#web-development" },
    { label: "Mobile App Development", href: "/services#mobile-app-development" },
    { label: "AI Integration", href: "/services#ai-integration" },
    { label: "Business Automation", href: "/services#business-automation" },
    { label: "AI Agents", href: "/services#ai-agents" },
    { label: "Cloud Solutions", href: "/services#cloud-solutions" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Industries", href: "/industries" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Insights & Blog", href: "/insights" },
    { label: "Case Studies", href: "/industries" },
    { label: "Careers", href: "/careers" },
    { label: "FAQ", href: "/#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
} satisfies Record<string, NavItem[]>;
