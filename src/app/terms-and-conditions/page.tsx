import type { Metadata } from "next";
import { LegalPageShell, LegalSection } from "@/components/shared/legal-content";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: `The terms and conditions governing use of ${siteConfig.name}'s website and services.`,
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms & Conditions" lastUpdated="July 15, 2026">
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing or using the {siteConfig.name} website, you agree to be bound by these
          Terms & Conditions. If you do not agree, please do not use our website or services.
        </p>
      </LegalSection>

      <LegalSection title="2. Description of Services">
        <p>
          {siteConfig.name} provides IT consulting, custom software development, AI solutions,
          and related digital services as described on this website. Specific engagements are
          governed by a separate signed statement of work or services agreement.
        </p>
      </LegalSection>

      <LegalSection title="3. Use of the Website">
        <p>
          You agree to use this website only for lawful purposes and in a way that does not
          infringe the rights of, or restrict or inhibit the use and enjoyment of, this site by
          any third party.
        </p>
      </LegalSection>

      <LegalSection title="4. Intellectual Property">
        <p>
          All content on this website — including text, graphics, logos, and code — is the
          property of {siteConfig.name} or its licensors and is protected by applicable
          intellectual property laws. You may not reproduce or redistribute this content without
          prior written permission.
        </p>
      </LegalSection>

      <LegalSection title="5. Project Engagements & Payment">
        <p>
          Pricing, deliverables, timelines, and payment terms for any engagement are defined in
          a separate written proposal or contract agreed upon by both parties before work
          begins. Nothing on this website constitutes a binding offer or quote.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, {siteConfig.name} shall not be liable for any
          indirect, incidental, special, or consequential damages arising from your use of this
          website or our services.
        </p>
      </LegalSection>

      <LegalSection title="7. Third-Party Links">
        <p>
          Our website may contain links to third-party websites. We are not responsible for the
          content or privacy practices of those sites.
        </p>
      </LegalSection>

      <LegalSection title="8. Termination">
        <p>
          We reserve the right to suspend or terminate access to this website at our discretion,
          without notice, for conduct that violates these terms.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing Law">
        <p>
          These Terms & Conditions are governed by the laws of the State of Illinois, United
          States, without regard to conflict-of-law principles.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to These Terms">
        <p>
          We may revise these Terms & Conditions at any time. Continued use of the website after
          changes are posted constitutes acceptance of the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>
          Questions about these Terms & Conditions can be sent to{" "}
          <a href={`mailto:${siteConfig.email.contact}`} className="text-primary underline underline-offset-4">
            {siteConfig.email.contact}
          </a>.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
