import type { Metadata } from "next";
import { Roboto_Slab, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { MotionProvider } from "@/components/layout/motion-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { JsonLd } from "@/components/shared/json-ld";
import { AnalyticsScripts } from "@/components/shared/analytics-scripts";
import { buildMetadata, organizationJsonLd, localBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/data/site";

// Roboto Slab matches the slab-serif wordmark in the Coorbitz logo and carries all headings;
// IBM Plex Sans/Mono give body copy and technical labels a precise, engineered voice.
const headingFont = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    path: "/",
  }),
  metadataBase: new URL(siteConfig.url),
  // Search engine ownership verification — only rendered once a real code is supplied.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd(), ...localBusinessJsonLd()]} />
        <AnalyticsScripts />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <TooltipProvider delayDuration={150}>
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
              >
                Skip to content
              </a>
              <Navbar />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
              <BackToTop />
              <WhatsAppButton />
              <CookieConsent />
              <Toaster position="bottom-right" richColors />
            </TooltipProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
