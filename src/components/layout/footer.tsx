import Link from "next/link";
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

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="eyebrow text-muted-foreground">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-foreground/80 transition-colors hover:text-primary">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { headquarters, development } = siteConfig.locations;
  return (
    <footer className="border-t bg-card">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="Coorbitz home" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">{siteConfig.description}</p>
            <p className="mt-3 text-xs text-muted-foreground">{siteConfig.parentCompany.relationshipStatement}</p>

            <dl className="mt-8 grid gap-6 text-sm sm:grid-cols-2">
              {[development, headquarters].map((location) => (
                <div key={location.label}>
                  <dt className="eyebrow text-muted-foreground">
                    {location.company} <span aria-hidden>·</span> {location.label}
                  </dt>
                  <dd className="mt-2 text-foreground/80">
                    {location.city}, {location.country}
                  </dd>
                  <dd className="text-muted-foreground">
                    {location.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-2">
            <LinkColumn title="Services" links={footerNav.services} />
          </div>
          <div className="lg:col-span-2">
            <LinkColumn title="Company" links={footerNav.company} />
          </div>

          <div className="lg:col-span-3">
            <h3 className="eyebrow text-muted-foreground">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${siteConfig.email.contact}`} className="text-foreground/80 hover:text-primary">
                  {siteConfig.email.contact}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.us.replace(/[^+\d]/g, "")}`} className="text-foreground/80 hover:text-primary">
                  {siteConfig.phone.us} <span className="text-muted-foreground">(US)</span>
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone.india.replace(/[^+\d]/g, "")}`} className="text-foreground/80 hover:text-primary">
                  {siteConfig.phone.india} <span className="text-muted-foreground">(India)</span>
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex gap-2" aria-label="Social profiles">
              {socialLinks.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="mb-2 text-xs text-muted-foreground">Occasional notes on what we’re building. No spam.</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
