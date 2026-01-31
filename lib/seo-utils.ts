// lib/seo-utils.ts
import type { Metadata } from "next";

/**
 * Canonical site config (single source of truth)
 */
export const SITE = {
  name: "Klein Plumbing, LLC",
  domain: "https://klein.plumbing",
  phone: "920-728-3034",
  locale: "en_US",
  region: "US-WI",
  facebook: "https://www.facebook.com/kleinplumbingandseptic",
} as const;

export type ServiceArea = {
  slug: string;
  name: string;
  state: string;
  zip: string;
  description: string;
  counties: string[];
  isPrimary?: boolean;
};

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  /**
   * Icon key ONLY (no JSX here).
   * Render icons in UI components, not in seo-utils.
   */
  iconKey?: string;
  description: string;
};

export const serviceAreas: ServiceArea[] = [
  // --- MAJOR HUBS (isPrimary: true) ---
  {
    slug: "jefferson",
    name: "Jefferson",
    state: "WI",
    zip: "53549",
    description: "Our home base in Jefferson, Wisconsin",
    counties: ["Jefferson County"],
    isPrimary: true,
  },
  {
    slug: "oconomowoc",
    name: "Oconomowoc",
    state: "WI",
    zip: "53066",
    description: "Primary service hub for Lake Country",
    counties: ["Waukesha County"],
    isPrimary: true,
  },
  {
    slug: "waukesha",
    name: "Waukesha",
    state: "WI",
    zip: "53188",
    description: "Professional plumbing services for the Waukesha community",
    counties: ["Waukesha County"],
    isPrimary: true,
  },
  {
    slug: "delafield",
    name: "Delafield",
    state: "WI",
    zip: "53018",
    description: "Expert plumbing solutions for Delafield and Lake Country",
    counties: ["Waukesha County"],
    isPrimary: true,
  },
  {
    slug: "watertown",
    name: "Watertown",
    state: "WI",
    zip: "53094",
    description: "Professional plumbing services in Watertown",
    counties: ["Dodge County", "Jefferson County"],
    isPrimary: true,
  },
  {
    slug: "fort-atkinson",
    name: "Fort Atkinson",
    state: "WI",
    zip: "53538",
    description: "Serving Fort Atkinson and surrounding communities",
    counties: ["Jefferson County"],
    isPrimary: true,
  },
  {
    slug: "whitewater",
    name: "Whitewater",
    state: "WI",
    zip: "53190",
    description: "Reliable plumbing services for Whitewater residents",
    counties: ["Walworth County", "Jefferson County"],
    isPrimary: true,
  },
  {
    slug: "lake-mills",
    name: "Lake Mills",
    state: "WI",
    zip: "53551",
    description: "Trusted plumber serving the Lake Mills area",
    counties: ["Jefferson County"],
    isPrimary: true,
  },

  // --- SURROUNDING COMMUNITIES ---
  {
    slug: "helenville",
    name: "Helenville",
    state: "WI",
    zip: "53137",
    description: "Local plumber based in the Helenville community",
    counties: ["Jefferson County"],
  },
  {
    slug: "johnson-creek",
    name: "Johnson Creek",
    state: "WI",
    zip: "53038",
    description: "Quality plumbing for Johnson Creek residents",
    counties: ["Jefferson County"],
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    state: "WI",
    zip: "53523",
    description: "Reliable plumbing services in Cambridge",
    counties: ["Jefferson County", "Dane County"],
  },
  {
    slug: "sullivan",
    name: "Sullivan",
    state: "WI",
    zip: "53178",
    description: "Expert plumbing solutions for Sullivan",
    counties: ["Jefferson County"],
  },
  {
    slug: "pewaukee",
    name: "Pewaukee",
    state: "WI",
    zip: "53072",
    description: "Professional plumbing repairs in Pewaukee",
    counties: ["Waukesha County"],
  },
  {
    slug: "waterloo",
    name: "Waterloo",
    state: "WI",
    zip: "53594",
    description: "Trusted local plumber for Waterloo",
    counties: ["Jefferson County"],
  },
  {
    slug: "palmyra",
    name: "Palmyra",
    state: "WI",
    zip: "53156",
    description: "Plumbing services for the Palmyra community",
    counties: ["Jefferson County"],
  },
  {
    slug: "rome",
    name: "Rome",
    state: "WI",
    zip: "53178",
    description: "Local plumbing expertise for Rome residents",
    counties: ["Jefferson County"],
  },
  {
    slug: "ixonia",
    name: "Ixonia",
    state: "WI",
    zip: "53036",
    description: "Reliable plumbing solutions in Ixonia",
    counties: ["Jefferson County"],
  },
  {
    slug: "concord",
    name: "Concord",
    state: "WI",
    zip: "53018",
    description: "Professional plumber serving Concord",
    counties: ["Jefferson County"],
  },
  {
    slug: "dousman",
    name: "Dousman",
    state: "WI",
    zip: "53118",
    description: "Expert plumbing services for Dousman",
    counties: ["Waukesha County"],
  },
  {
    slug: "ashippun",
    name: "Ashippun",
    state: "WI",
    zip: "53003",
    description: "Plumbing repairs and service in Ashippun",
    counties: ["Dodge County"],
  },
  {
    slug: "lebanon",
    name: "Lebanon",
    state: "WI",
    zip: "53047",
    description: "Local plumbing solutions for Lebanon",
    counties: ["Dodge County"],
  },
  {
    slug: "hartland",
    name: "Hartland",
    state: "WI",
    zip: "53029",
    description: "Professional plumbing services for Hartland",
    counties: ["Waukesha County"],
  },
];

export const services: Service[] = [
  {
    slug: "gas-piping",
    name: "Gas Piping Services",
    shortName: "Gas Piping",
    iconKey: "gas",
    description: "Expert installation and repair for gas lines and appliances.",
  },
  {
    slug: "water-filtration",
    name: "Water Filtration Systems",
    shortName: "Water Filtration",
    iconKey: "filter",
    description: "Clean, safe water with professional filtration solutions.",
  },
  {
    slug: "remodeling-new-construction",
    name: "Remodeling & New Construction",
    shortName: "Remodeling",
    iconKey: "remodel",
    description: "Comprehensive plumbing for home renovations and new builds.",
  },
  {
    slug: "sump-pump-services",
    name: "Sump Pump Services",
    shortName: "Sump Pumps",
    iconKey: "pump",
    description:
      "In the Jefferson County area, the spring thaw can overwhelm standard pumps. We specialize in backup systems that keep basements dry during the heavy Wisconsin melt.",
  },
  {
    slug: "water-heater-services",
    name: "Water Heater Services",
    shortName: "Water Heaters",
    iconKey: "heater",
    description:
      "Repair, replacement, and installation for all water heater types.",
  },
];

/** -----------------------
 * Helpers
 * ---------------------- */

export function getArea(areaSlug: string): ServiceArea | undefined {
  return serviceAreas.find((a) => a.slug === areaSlug);
}

export function getService(serviceSlug?: string): Service | undefined {
  if (!serviceSlug) return undefined;
  return services.find((s) => s.slug === serviceSlug);
}

export function buildUrl(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.domain}${clean}`;
}

function titleForArea(area: ServiceArea): string {
  // Target: City + Plumber + Business Name
  return `${area.name} Plumber | Reliable Local Service | ${SITE.name}`;
}

function titleForServiceArea(area: ServiceArea, service: Service): string {
  // Target: Service + City + WI
  return `${service.shortName} ${area.name}, WI | Expert Local Plumbing | ${SITE.name}`;
}
function descriptionForArea(area: ServiceArea): string {
  const counties = area.counties.join(" and ");
  return `Trusted plumbing services in ${area.name}, Wisconsin. ${area.description}. Local, licensed plumber serving ${counties}. Call ${SITE.phone} for fast service.`;
}

function descriptionForServiceArea(
  area: ServiceArea,
  service: Service,
): string {
  return `Need ${service.name.toLowerCase()} in ${area.name}, WI? ${service.description}. Call ${SITE.phone} for fast, reliable local service.`;
}

const DEFAULT_OG_IMAGE = buildUrl("/og.jpg");

/** -----------------------
 * Metadata
 * ---------------------- */

export function generateServiceAreaMetadata(
  areaSlug: string,
  serviceSlug?: string,
): Metadata {
  const area = getArea(areaSlug);
  const service = getService(serviceSlug);

  if (!area) {
    const url = buildUrl("/");
    const title = `${SITE.name} | Southeast Wisconsin Plumber`;
    const description =
      "Professional plumbing services in Southeast Wisconsin.";

    return {
      metadataBase: new URL(SITE.domain),
      title,
      description,
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title,
        description,
        url,
        siteName: SITE.name,
        locale: SITE.locale,
        type: "website",
        images: [{ url: DEFAULT_OG_IMAGE }],
      },
    };
  }

  const isServicePage = Boolean(service);
  const path = isServicePage
    ? `/service-areas/${areaSlug}/${serviceSlug}`
    : `/service-areas/${areaSlug}`;
  const url = buildUrl(path);

  const title = service
    ? titleForServiceArea(area, service)
    : titleForArea(area);
  const description = service
    ? descriptionForServiceArea(area, service)
    : descriptionForArea(area);

  const keywords = service
    ? [
        `${service.name} ${area.name} WI`,
        `${service.shortName} ${area.name}`,
        `plumber ${area.name} WI`,
        `${area.name} emergency plumber`,
        "Klein Plumbing",
      ]
    : [
        `plumber ${area.name} WI`,
        `${area.name} plumber`,
        `emergency plumber ${area.name}`,
        `plumbing ${area.name} WI`,
        `${area.counties[0]} plumber`,
        "Klein Plumbing",
      ];

  return {
    metadataBase: new URL(SITE.domain),
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE }],
    },
  };
}

/** -----------------------
 * Schemas (JSON-LD)
 * ---------------------- */

export type JsonLd = Record<string, unknown>;

type BreadcrumbListItem = {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
};

export function generateLocalBusinessSchema(areaSlug: string): JsonLd | null {
  const area = getArea(areaSlug);
  if (!area) return null;

  return {
    "@context": "https://schema.org",
    "@type": "PlumbingBusiness",
    "@id": `${SITE.domain}#plumbingbusiness`,
    name: SITE.name,
    url: buildUrl("/"),
    mainEntityOfPage: buildUrl(`/service-areas/${area.slug}`),
    telephone: SITE.phone,
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: area.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: area.name,
        addressRegion: area.state,
        postalCode: area.zip,
        addressCountry: "US",
      },
    },
    serviceType: services.map((s) => s.name),
    sameAs: [SITE.facebook],
  };
}

export function generateServiceSchema(
  areaSlug: string,
  serviceSlug: string,
): JsonLd | null {
  const area = getArea(areaSlug);
  const service = getService(serviceSlug);
  if (!area || !service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} in ${area.name}, ${area.state}`,
    description: service.description,
    provider: {
      "@type": "PlumbingBusiness",
      "@id": `${SITE.domain}#plumbingbusiness`,
    },
    areaServed: {
      "@type": "City",
      name: area.name,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
          },
          priceCurrency: "USD",
          price: "0", // "Contact for quote" signal
        },
      ],
    },
    url: buildUrl(`/service-areas/${area.slug}/${service.slug}`),
  };
}

export function generateBreadcrumbSchema(
  areaSlug: string,
  serviceSlug?: string,
): JsonLd {
  const area = getArea(areaSlug);
  const service = getService(serviceSlug);

  const itemListElement: BreadcrumbListItem[] = [
    { "@type": "ListItem", position: 1, name: "Home", item: buildUrl("/") },
    {
      "@type": "ListItem",
      position: 2,
      name: "Service Areas",
      item: buildUrl("/service-areas"),
    },
  ];

  if (area) {
    itemListElement.push({
      "@type": "ListItem",
      position: 3,
      name: `${area.name}, ${area.state}`,
      item: buildUrl(`/service-areas/${area.slug}`),
    });
  }

  if (area && service) {
    itemListElement.push({
      "@type": "ListItem",
      position: 4,
      name: service.name,
      item: buildUrl(`/service-areas/${area.slug}/${service.slug}`),
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

export function generatePageSchemas(
  areaSlug: string,
  serviceSlug?: string,
): JsonLd[] {
  const schemas: JsonLd[] = [];

  const lb = generateLocalBusinessSchema(areaSlug);
  if (lb) schemas.push(lb);

  if (serviceSlug) {
    const svc = generateServiceSchema(areaSlug, serviceSlug);
    if (svc) schemas.push(svc);
  }

  schemas.push(generateBreadcrumbSchema(areaSlug, serviceSlug));
  return schemas;
}

export function getPrimaryAreas(): ServiceArea[] {
  return serviceAreas.filter((a) => a.isPrimary);
}

export function getSecondaryAreas(): ServiceArea[] {
  return serviceAreas.filter((a) => !a.isPrimary);
}

export function anchorTextForArea(area: ServiceArea): string {
  return `Plumber in ${area.name}, ${area.state}`;
}

export function anchorTextForAreaService(
  area: ServiceArea,
  service: Service,
): string {
  return `${service.name} in ${area.name}, ${area.state}`;
}

export function generateWebsiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: buildUrl("/"),
    inLanguage: "en-US",
  };
}

export function generateOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: buildUrl("/"),
    telephone: SITE.phone,
    sameAs: [SITE.facebook],
  };
}
