// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE, serviceAreas, services } from "@/lib/seo-utils";

type StoryblokLink = {
  slug: string;
  is_folder?: boolean;
  published_at?: string;
  created_at?: string;
};

const INCLUDE_STORYBLOK_SITEMAP = process.env.INCLUDE_STORYBLOK_SITEMAP === "1";

/**
 * Canonical base URL (no trailing slash).
 * NOTE: SITE.domain must include scheme, e.g. "https://klein.plumbing"
 */
function getBaseUrl(): string {
  return SITE.domain.endsWith("/") ? SITE.domain.slice(0, -1) : SITE.domain;
}

/**
 * Ensures slugs from Storyblok are turned into valid, absolute URLs.
 * Handles the "home" slug edge case and prevents double slashes.
 */
function toUrlFromStoryblokSlug(slug: string): string {
  const baseUrl = getBaseUrl();

  if (slug === "home" || slug === "") return baseUrl;

  // Remove leading/trailing slashes from the slug
  const cleanSlug = slug.replace(/^\/|\/$/g, "");
  return `${baseUrl}/${cleanSlug}`;
}

/**
 * Normalizes URLs for the deduplication Set (no trailing slash).
 */
function normalizeUrl(url: string): string {
  const baseUrl = getBaseUrl();
  if (url === baseUrl) return url;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

/**
 * Attempts to get a stable build timestamp to avoid sitemap churn.
 * Falls back to start-of-day UTC to avoid hourly changes if env isn’t set.
 */
function getBuildLastModIso(): string {
  const env =
    process.env.VERCEL_BUILD_TIME ||
    process.env.BUILD_TIME ||
    process.env.NEXT_PUBLIC_BUILD_TIME;

  if (env) {
    const d = new Date(env);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }

  // Fallback: start of current UTC day (stable within the day)
  const now = new Date();
  now.setUTCHours(0, 0, 0, 0);
  return now.toISOString();
}

async function fetchStoryblokLinks(): Promise<
  Array<{ url: string; lastModified?: string }>
> {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
  if (!token) return [];

  // Region endpoint: keep "api-us" only if your space is in US region.
  const API_URL = "https://api-us.storyblok.com/v2/cdn/links";
  const version = process.env.NODE_ENV === "production" ? "published" : "draft";

  // Denylist: internal Storyblok stories you never want indexed.
  const DENY_PREFIXES = ["global", "config", "settings", "components"];
  const DENY_EXACT = new Set(["404", "error"]);

  const out: Array<{ url: string; lastModified?: string }> = [];
  let page = 1;
  const perPage = 200; // safer than 1000; still efficient

  while (true) {
    const res = await fetch(
      `${API_URL}?token=${token}&version=${version}&per_page=${perPage}&page=${page}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) break;

    const data = (await res.json()) as {
      links?: Record<string, StoryblokLink>;
    };

    const links = data.links ? Object.values(data.links) : [];
    if (!links.length) break;

    for (const link of links) {
      const slug = link.slug;

      if (!slug) continue;
      if (link.is_folder) continue;
      if (DENY_EXACT.has(slug)) continue;

      // Filter out internal folders
      if (DENY_PREFIXES.some((p) => slug === p || slug.startsWith(`${p}/`)))
        continue;

      // Filter out routes that are hardcoded/generated elsewhere in this file
      if (
        slug === "service-areas" ||
        slug.startsWith("service-areas/") ||
        slug === "services" ||
        slug.startsWith("services/") ||
        slug === "joblog" ||
        slug.startsWith("joblog/")
      )
        continue;

      out.push({
        url: toUrlFromStoryblokSlug(slug),
        lastModified: link.published_at ?? link.created_at ?? undefined,
      });
    }

    if (links.length < perPage) break;
    page += 1;
  }

  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const buildLastMod = getBuildLastModIso();

  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const push = (entry: MetadataRoute.Sitemap[number]) => {
    const key = normalizeUrl(entry.url);
    if (seen.has(key)) return;
    seen.add(key);
    entries.push(entry);
  };

  /**
   * 1) CORE STATIC PAGES
   */
  push({
    url: baseUrl,
    lastModified: buildLastMod,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  push({
    url: `${baseUrl}/services`,
    lastModified: buildLastMod,
    changeFrequency: "weekly",
    priority: 0.95,
  });

  push({
    url: `${baseUrl}/service-areas`,
    lastModified: buildLastMod,
    changeFrequency: "weekly",
    priority: 0.93,
  });

  push({
    url: `${baseUrl}/reviews`,
    lastModified: buildLastMod,
    changeFrequency: "weekly",
    priority: 0.85,
  });

  push({
    url: `${baseUrl}/contact`,
    lastModified: buildLastMod,
    changeFrequency: "monthly",
    priority: 0.82,
  });

  push({
    url: `${baseUrl}/about`,
    lastModified: buildLastMod,
    changeFrequency: "monthly",
    priority: 0.72,
  });

  push({
    url: `${baseUrl}/joblog`,
    lastModified: buildLastMod,
    changeFrequency: "weekly",
    priority: 0.7,
  });

  push({
    url: `${baseUrl}/faq`,
    lastModified: buildLastMod,
    changeFrequency: "monthly",
    priority: 0.78,
  });

  /**
   * 2) GLOBAL SERVICE DETAIL PAGES
   * /services/<service>
   */
  for (const service of services) {
    push({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: buildLastMod,
      changeFrequency: "monthly",
      priority: 0.88,
    });
  }

  /**
   * 3) CITY HUB PAGES (Service Areas)
   */
  for (const area of serviceAreas) {
    push({
      url: `${baseUrl}/service-areas/${area.slug}`,
      lastModified: buildLastMod,
      changeFrequency: "monthly",
      priority: area.isPrimary ? 0.92 : 0.82,
    });
  }

  /**
   * 4) MONEY PAGES (Service + City Combinations)
   */
  for (const area of serviceAreas) {
    for (const service of services) {
      push({
        url: `${baseUrl}/service-areas/${area.slug}/${service.slug}`,
        lastModified: buildLastMod,
        changeFrequency: "monthly",
        priority: area.isPrimary ? 0.84 : 0.72,
      });
    }
  }

  /**
   * 5) OPTIONAL: DYNAMIC STORYBLOK PAGES
   * Enable by setting INCLUDE_STORYBLOK_SITEMAP=1
   */
  if (INCLUDE_STORYBLOK_SITEMAP) {
    const storyblokPages = await fetchStoryblokLinks();

    for (const p of storyblokPages) {
      push({
        url: p.url,
        lastModified: p.lastModified ?? buildLastMod,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
