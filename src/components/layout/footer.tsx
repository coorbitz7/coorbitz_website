import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { LinkedInIcon, XIcon, FacebookIcon, InstagramIcon, GitHubIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/data/site";
import { footerNav } from "@/data/nav";

const socialLinks = [
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: siteConfig.social.twitter, label: "X (Twitter)", Icon: XIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.github, label: "GitHub", Icon: GitHubIcon },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <Container className="section-y">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" aria-label="Coorbitz home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">{siteConfig.tagline}</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Resources" links={footerNav.resources} />

          <div>
            <h3 className="text-sm font-semibold">Stay Updated</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Product news, AI insights, and case studies — no spam.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  <span className="block text-xs font-medium text-foreground/60">
                    {siteConfig.locations.development.company}
                  </span>
                  {siteConfig.locations.development.city}, {siteConfig.locations.development.country}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  <span className="block text-xs font-medium text-foreground/60">
                    {siteConfig.locations.headquarters.company} (Headquarters)
                  </span>
                  {siteConfig.locations.headquarters.city}, {siteConfig.locations.headquarters.country}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <a href={`tel:${siteConfig.phone.us}`} className="hover:text-primary">
                  {siteConfig.phone.us}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <a href={`mailto:${siteConfig.email.contact}`} className="hover:text-primary">
                  {siteConfig.email.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            {siteConfig.parentCompany.relationshipStatement}
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerNav.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
