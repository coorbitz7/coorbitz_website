import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/shared/legal-content";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy" lastUpdated="July 15, 2026">
      <LegalSection title="1. Introduction">
        <p>
          {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects
          your privacy and is committed to protecting the personal information you share with
          us. This Privacy Policy explains what information we collect, how we use it, and the
          choices you have.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li>Contact details submitted through our contact and careers forms (name, email, phone, company)</li>
          <li>Project details, budget ranges, and service interests you share with us</li>
          <li>Resumes and application materials submitted through our careers page</li>
          <li>Newsletter subscription email addresses</li>
        </ul>
        <p>
          We also automatically collect limited technical information such as browser type,
          device type, and pages visited, via standard web server logs and cookies.
        </p>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <ul>
          <li>To respond to your inquiries and provide requested services</li>
          <li>To evaluate job applications and communicate with candidates</li>
          <li>To send newsletters and updates you&apos;ve opted into</li>
          <li>To improve our website, services, and marketing effectiveness</li>
          <li>To comply with legal obligations</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Cookies">
        <p>
          We use cookies and similar technologies to operate our website, remember your
          preferences (such as your cookie consent choice and theme), and analyze site traffic.
          You can control cookies through your browser settings and our cookie consent banner.
        </p>
      </LegalSection>

      <LegalSection title="5. How We Share Information">
        <p>
          We do not sell your personal information. We may share information with trusted
          service providers (such as our email delivery provider) solely to operate our
          business, or when required by law.
        </p>
      </LegalSection>

      <LegalSection title="6. Data Security">
        <p>
          We implement reasonable technical and organizational measures to protect your
          information against unauthorized access, alteration, or disclosure. No method of
          transmission over the internet is 100% secure, and we cannot guarantee absolute
          security.
        </p>
      </LegalSection>

      <LegalSection title="7. Your Rights">
        <p>
          Depending on your location, you may have rights to access, correct, or delete your
          personal information, or to object to certain processing. To exercise these rights,
          contact us at{" "}
          <a href={`mailto:${siteConfig.email.contact}`} className="text-primary underline underline-offset-4">
            {siteConfig.email.contact}
          </a>.
        </p>
      </LegalSection>

      <LegalSection title="8. Children's Privacy">
        <p>
          Our services are not directed to individuals under 16, and we do not knowingly collect
          personal information from children.
        </p>
      </LegalSection>

      <LegalSection title="9. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo;
          date above reflects the most recent revision.
        </p>
      </LegalSection>

      <LegalSection title="10. Contact Us">
        <p>
          Questions about this Privacy Policy can be sent to{" "}
          <a href={`mailto:${siteConfig.email.contact}`} className="text-primary underline underline-offset-4">
            {siteConfig.email.contact}
          </a>{" "}
          or to our headquarters at {siteConfig.locations.headquarters.addressLines.join(", ")}.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
