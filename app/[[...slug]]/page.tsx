import {
  getStoryblokApi,
  StoryblokStory,
  storyblokInit,
  apiPlugin,
} from "@storyblok/react/rsc";

import type { Metadata } from "next";

import Page from "../../components/Page";
import Hero from "../../components/Hero";
import Grid from "../../components/Grid";
import ServiceCard from "../../components/ServiceCard";
import BeforeAfterCarousel from "../../components/BeforeAfterCarousel";
import Testimonial from "../../components/Testimonial";
import TrustSection from "../../components/TrustSection";
import JobLog from "../../components/JobLog";
import ContactSection from "../../components/ContactSection";
import ServiceDetailPage from "../../components/ServiceDetailPage";
import FAQAccordion from "../../components/FAQAccordion";
import DynamicRichTextWrapper from "../../components/DynamicRichTextWrapper";
import BadgeBar from "../../components/BadgeBar";
import TrustBadge from "../../components/TrustBadge";

import { SITE, buildUrl } from "@/lib/seo-utils";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    hero: Hero,
    Hero: Hero,
    grid: Grid,
    service_card: ServiceCard,
    before_after_carousel: BeforeAfterCarousel,
    testimonial: Testimonial,
    Testimonial: Testimonial,
    trust_section: TrustSection,
    job_log: JobLog,
    contact_section: ContactSection,
    service_detail_page: ServiceDetailPage,
    faq_section: FAQAccordion,
    rich_text: DynamicRichTextWrapper,
    BadgeBar: BadgeBar,
    badge_bar: BadgeBar,
    trust_badge: TrustBadge,
    slide_pair: () => null,
    job_entry: () => null,
    faq_item: () => null,
  },
});

export const dynamic = "force-dynamic";

/**
 * Keep CV outside component for purity
 */
const STORYBLOK_CV = Date.now();

/**
 * ✅ HEAD-ONLY SEO for homepage.
 * This will apply to this route file; for other slugs you
 * can add generateMetadata later.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: `Plumber in Jefferson, WI | ${SITE.name}`,
  description:
    "Klein Plumbing provides reliable plumbing, water heaters, gas piping, and sump pump services in Jefferson, WI and nearby areas. Call today.",
  alternates: {
    canonical: buildUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: buildUrl("/"),
    title: `Plumber in Jefferson, WI | ${SITE.name}`,
    description:
      "Reliable plumbing, water heaters, gas piping, and sump pump services in Jefferson, WI and nearby areas.",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `Plumber in Jefferson, WI | ${SITE.name}`,
    description:
      "Reliable plumbing, water heaters, gas piping, and sump pump services in Jefferson, WI and nearby areas.",
  },
};

export default async function StoryblokPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slugName = resolvedParams.slug ? resolvedParams.slug.join("/") : "home";

  const storyblokApi = getStoryblokApi();
  const version = process.env.NODE_ENV === "production" ? "published" : "draft";

  let data;
  try {
    const result = await storyblokApi.get(`cdn/stories/${slugName}`, {
      version,
      cv: STORYBLOK_CV,
    });
    data = result.data;
  } catch {
    return <div>Page not found: {slugName}</div>;
  }

  // ✅ JSON-LD schema (head-only, not visible)
  const telDigits = SITE.phone.replace(/[^0-9]/g, "");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": buildUrl("/#website"),
        url: buildUrl("/"),
        name: SITE.name,
      },
      {
        "@type": "LocalBusiness",
        "@id": buildUrl("/#localbusiness"),
        name: SITE.name,
        url: buildUrl("/"),
        telephone: `+1${telDigits}`,
        areaServed: "Jefferson, WI",
      },
      {
        "@type": "PlumbingService", // More specific than LocalBusiness
        "@id": buildUrl("/#plumbingbusiness"),
        name: SITE.name,
        url: buildUrl("/"),
        telephone: `+1${telDigits}`,
        priceRange: "$$",
        image: buildUrl("/logo.png"), // Add your logo
        address: {
          "@type": "PostalAddress",
          streetAddress: "Farmington Rd",
          addressLocality: "Jefferson",
          addressRegion: "WI",
          postalCode: "53549",
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "City", name: "Jefferson" },
          { "@type": "City", name: "Oconomowoc" },
          { "@type": "City", name: "Waukesha" },
        ],
        sameAs: [SITE.facebook],
      },
    ],
  };

  return (
    <>
      {/* Not visible on page; Google reads it */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <StoryblokStory story={data.story} />
    </>
  );
}
