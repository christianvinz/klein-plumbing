import {
  getStoryblokApi,
  StoryblokStory,
  storyblokInit,
  apiPlugin,
} from "@storyblok/react/rsc";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SITE, buildUrl } from "@/lib/seo-utils";
import STORYBLOK_COMPONENTS from "@/lib/storyblok-components";

export const revalidate = 60;

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

  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: STORYBLOK_COMPONENTS,
  });

  const storyblokApi = getStoryblokApi();
  const version = process.env.NODE_ENV === "production" ? "published" : "draft";

  let data;
  try {
    const result = await storyblokApi.get(`cdn/stories/${slugName}`, {
      version,
    });
    data = result.data;
  } catch {
    notFound();
  }

  return <StoryblokStory story={data.story} />;
}
