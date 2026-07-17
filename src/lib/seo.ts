import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
};

// Open Graph / Twitter images are supplied automatically by the opengraph-image.tsx
// file convention (see src/app/opengraph-image.tsx) — no image URL needs to be set here.
export function buildMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: BuildMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentCompany.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chicago",
        addressRegion: "Illinois",
        addressCountry: "US",
      },
    },
    sameAs: Object.values(siteConfig.social),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone.us,
        contactType: "sales",
        email: siteConfig.email.contact,
        areaServed: "US",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@type": "Organization", name: siteConfig.name },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function serviceJsonLd(service: {
  id: string;
  title: string;
  overview: string;
  industriesServed: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: service.title,
    description: service.overview,
    url: `${siteConfig.url}/services#${service.id}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: [
      { "@type": "Place", name: siteConfig.locations.headquarters.city },
      { "@type": "Place", name: siteConfig.locations.development.city },
    ],
    audience: service.industriesServed.map((industry) => ({
      "@type": "Audience",
      audienceType: industry,
    })),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.name}`,
    url: `${siteConfig.url}/contact`,
    about: { "@type": "Organization", name: siteConfig.name },
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      email: siteConfig.email.contact,
      telephone: siteConfig.phone.us,
      contactPoint: Object.values(siteConfig.locations).map((location) => ({
        "@type": "ContactPoint",
        contactType: location.label,
        telephone: location.company === siteConfig.parentCompany.name ? siteConfig.phone.us : siteConfig.phone.india,
        areaServed: location.country,
      })),
    },
  };
}

/**
 * Ready for real data — do not call this with fabricated ratings/review counts.
 * Wire it up once real reviews exist (Google Business Profile, Clutch, etc.).
 */
export function reviewJsonLd(input: {
  itemReviewed: string;
  ratingValue: number;
  reviewCount: number;
  reviews: { author: string; reviewBody: string; ratingValue: number; datePublished: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.itemReviewed,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: input.ratingValue,
      reviewCount: input.reviewCount,
    },
    review: input.reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.author },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.ratingValue,
        bestRating: 5,
      },
    })),
  };
}

/** Ready for the individual-article pages a full blog build would add. */
export function articleJsonLd(article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  path: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    url: `${siteConfig.url}${article.path}`,
    author: { "@type": "Organization", name: article.authorName ?? siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/logo.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}${article.path}` },
  };
}

export function localBusinessJsonLd() {
  return Object.values(siteConfig.locations).map((location) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${siteConfig.name} — ${location.label}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.addressLines[0],
      addressLocality: location.city,
      addressCountry: location.country,
    },
    url: siteConfig.url,
    telephone: siteConfig.phone.us,
  }));
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function jobPostingJsonLd(job: {
  title: string;
  description: string;
  datePosted: string;
  location: string;
  employmentType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    employmentType: job.employmentType.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
    },
    jobLocation: {
      "@type": "Place",
      address: job.location,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
