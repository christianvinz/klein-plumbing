// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE, serviceAreas, services } from "@/lib/seo-utils";

type StoryblokLink = {
  slug: string;
  is_folder?: boolean;
  published_at?: string;
  created_at?: string;
  // Storyblok sometimes includes these, sometimes not:
  // alternates?: unknown[];
};

function toUrlFromStoryblokSlug(slug: string): string {
  // Storyblok commonly uses "home" as the root
  if (slug === "home") return SITE.domain;
  return `${SITE.domain}/${slug}`;
}

function normalizeUrl(url: string): string {
  // Ensure consistent dedupe keys (no trailing slash except root)
  if (url === SITE.domain) return url;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

async function fetchStoryblokLinks(): Promise<
  Array<{ url: string; lastModified?: string }>
> {
  const token = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN;
  if (!token) return [];

  const version = process.env.NODE_ENV === "production" ? "published" : "draft";

  // Denylist: internal Storyblok stories you never want indexed.
  // Adjust to match your space naming conventions if needed.
  const DENY_PREFIXES = ["global", "config", "settings", "components"];
  const DENY_EXACT = new Set(["404", "error"]);

  const out: Array<{ url: string; lastModified?: string }> = [];

  // Storyblok links endpoint is paginated
  let page = 1;
  const perPage = 100;

  while (true) {
    const res = await fetch(
      `https://api-us.storyblok.com/v2/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}`,
      {
        // Sitemap can be revalidated periodically; tune as desired
        next: { revalidate: 3600 },
      },
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
      if (DENY_PREFIXES.some((p) => slug === p || slug.startsWith(`${p}/`)))
        continue;

      // You generate these in code; don’t double-list
      if (slug === "service-areas" || slug.startsWith("service-areas/"))
        continue;
      if (slug === "services" || slug.startsWith("services/")) continue;
      if (slug === "joblog" || slug.startsWith("joblog/")) continue;

      const url = toUrlFromStoryblokSlug(slug);
      out.push({
        url,
        lastModified: link.published_at ?? link.created_at ?? undefined,
      });
    }

    // If we got fewer than per_page, we’re done
    if (links.length < perPage) break;
    page += 1;
  }

  return out;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE.domain;
  const now = new Date().toISOString();

  // Use a set to dedupe across all sources
  const seen = new Set<string>();

  const push = (entry: MetadataRoute.Sitemap[number]) => {
    const key = normalizeUrl(entry.url);
    if (seen.has(key)) return;
    seen.add(key);
    entries.push(entry);
  };

  const entries: MetadataRoute.Sitemap = [];

  /** -----------------------
   * Core pages (highest authority)
   * ---------------------- */
  push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  push({
    url: `${baseUrl}/services`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.95,
  });

  push({
    url: `${baseUrl}/service-areas`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.93,
  });

  push({
    url: `${baseUrl}/reviews`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  });

  push({
    url: `${baseUrl}/contact`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.82,
  });

  push({
    url: `${baseUrl}/about`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.72,
  });

  // Optional proof page
  push({
    url: `${baseUrl}/joblog`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  });

  /** -----------------------
   * Service-area hub pages (city pages)
   * Primaries: Jefferson + Oconomowoc
   * ---------------------- */
  for (const area of serviceAreas) {
    push({
      url: `${baseUrl}/service-areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: area.isPrimary ? 0.92 : 0.82,
    });
  }

  /** -----------------------
   * Service-in-city pages (money pages)
   * Primaries get higher weight
   * ---------------------- */
  for (const area of serviceAreas) {
    for (const service of services) {
      push({
        url: `${baseUrl}/service-areas/${area.slug}/${service.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: area.isPrimary ? 0.84 : 0.72,
      });
    }
  }

  /** -----------------------
   * Storyblok pages (everything else)
   * ---------------------- */
  const storyblokPages = await fetchStoryblokLinks();

  for (const p of storyblokPages) {
    push({
      url: p.url,
      lastModified: p.lastModified ?? now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
