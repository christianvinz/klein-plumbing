import { Metadata } from 'next';

export const serviceAreas = [
  {
    slug: 'jefferson',
    name: 'Jefferson',
    state: 'WI',
    zip: '53549',
    description: 'Our home base in Jefferson, Wisconsin',
    counties: ['Jefferson County'],
    isPrimary: true
  },
  {
    slug: 'fort-atkinson',
    name: 'Fort Atkinson',
    state: 'WI',
    zip: '53538',
    description: 'Serving Fort Atkinson and surrounding communities',
    counties: ['Jefferson County']
  },
  {
    slug: 'watertown',
    name: 'Watertown',
    state: 'WI',
    zip: '53094',
    description: 'Professional plumbing services in Watertown',
    counties: ['Dodge County', 'Jefferson County']
  },
  {
    slug: 'johnson-creek',
    name: 'Johnson Creek',
    state: 'WI',
    zip: '53038',
    description: 'Quality plumbing for Johnson Creek residents',
    counties: ['Jefferson County']
  },
  {
    slug: 'lake-mills',
    name: 'Lake Mills',
    state: 'WI',
    zip: '53551',
    description: 'Trusted plumber serving Lake Mills area',
    counties: ['Jefferson County']
  },
  {
    slug: 'cambridge',
    name: 'Cambridge',
    state: 'WI',
    zip: '53523',
    description: 'Reliable plumbing services in Cambridge',
    counties: ['Jefferson County', 'Dane County']
  },
  {
    slug: 'sullivan',
    name: 'Sullivan',
    state: 'WI',
    zip: '53178',
    description: 'Expert plumbing solutions for Sullivan',
    counties: ['Jefferson County']
  },
  {
    slug: 'helenville',
    name: 'Helenville',
    state: 'WI',
    zip: '53137',
    description: 'Local plumber serving Helenville community',
    counties: ['Jefferson County']
  }
];

export const services = [
  {
    slug: 'emergency-plumbing',
    name: 'Emergency Plumbing',
    shortName: 'Emergency Services',
    icon: '🚨',
    description: '24/7 emergency plumbing repairs when you need us most'
  },
  {
    slug: 'water-heater',
    name: 'Water Heater Services',
    shortName: 'Water Heaters',
    icon: '🔥',
    description: 'Water heater repair, replacement, and installation'
  },
  {
    slug: 'drain-cleaning',
    name: 'Drain Cleaning',
    shortName: 'Drain Services',
    icon: '🌊',
    description: 'Professional drain cleaning and clog removal'
  },
  {
    slug: 'leak-repair',
    name: 'Leak Repair',
    shortName: 'Leak Repairs',
    icon: '💧',
    description: 'Fast leak detection and repair services'
  },
  {
    slug: 'toilet-repair',
    name: 'Toilet Repair',
    shortName: 'Toilet Services',
    icon: '🚽',
    description: 'Toilet repair, replacement, and installation'
  },
  {
    slug: 'pipe-repair',
    name: 'Pipe Repair',
    shortName: 'Pipe Services',
    icon: '🔧',
    description: 'Pipe repair and replacement services'
  }
];

/**
 * Generate SEO-optimized metadata for service area pages
 */
export function generateServiceAreaMetadata(
  areaSlug: string,
  serviceSlug?: string
): Metadata {
  const area = serviceAreas.find(a => a.slug === areaSlug);
  const service = serviceSlug ? services.find(s => s.slug === serviceSlug) : null;

  if (!area) {
    return {
      title: 'Klein Plumbing - Southeast Wisconsin Plumber',
      description: 'Professional plumbing services in Southeast Wisconsin'
    };
  }

  const baseTitle = 'Klein Plumbing, LLC';
  const phone = '920-728-3034';

  if (service) {
    // Service-specific page for a location
    return {
      title: `${service.name} in ${area.name}, ${area.state} | ${baseTitle}`,
      description: `Expert ${service.name.toLowerCase()} services in ${area.name}, Wisconsin. ${service.description}. Call ${phone} for fast, reliable service.`,
      keywords: [
        `${service.name.toLowerCase()} ${area.name}`,
        `plumber ${area.name} ${area.state}`,
        `${service.shortName.toLowerCase()} ${area.name}`,
        `${area.name} plumbing`,
        'Southeast Wisconsin plumber'
      ],
      openGraph: {
        title: `${service.name} - ${area.name}, WI`,
        description: `${service.description} Serving ${area.name} and Southeast Wisconsin.`,
        url: `https://klein-plumbing.com/service-areas/${areaSlug}/${serviceSlug}`,
        siteName: baseTitle,
        locale: 'en_US',
        type: 'website',
      },
      alternates: {
        canonical: `https://klein-plumbing.com/service-areas/${areaSlug}/${serviceSlug}`
      }
    };
  }

  // General service area page
  return {
    title: `Plumber in ${area.name}, ${area.state} | ${baseTitle} | ${phone}`,
    description: `Trusted plumbing services in ${area.name}, Wisconsin. ${area.description}. Family-owned, licensed plumber serving ${area.counties.join(' and ')}. Call ${phone}.`,
    keywords: [
      `plumber ${area.name}`,
      `plumbing ${area.name} ${area.state}`,
      `${area.name} plumber`,
      'Southeast Wisconsin plumbing',
      `plumber near me ${area.name}`,
      `emergency plumber ${area.name}`,
      `${area.counties[0]} plumber`
    ],
    openGraph: {
      title: `Professional Plumber in ${area.name}, WI`,
      description: `Klein Plumbing serves ${area.name} and all of Southeast Wisconsin with quality plumbing services.`,
      url: `https://klein-plumbing.com/service-areas/${areaSlug}`,
      siteName: baseTitle,
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `https://klein-plumbing.com/service-areas/${areaSlug}`
    }
  };
}

/**
 * Generate breadcrumb schema for service area pages
 */
export function generateBreadcrumbSchema(
  areaSlug: string,
  serviceSlug?: string
) {
  const area = serviceAreas.find(a => a.slug === areaSlug);
  const service = serviceSlug ? services.find(s => s.slug === serviceSlug) : null;

  const breadcrumbList = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://klein-plumbing.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Service Areas",
      "item": "https://klein-plumbing.com/service-areas"
    }
  ];

  if (area) {
    breadcrumbList.push({
      "@type": "ListItem",
      "position": 3,
      "name": `${area.name}, ${area.state}`,
      "item": `https://klein-plumbing.com/service-areas/${areaSlug}`
    });
  }

  if (service && area) {
    breadcrumbList.push({
      "@type": "ListItem",
      "position": 4,
      "name": service.name,
      "item": `https://klein-plumbing.com/service-areas/${areaSlug}/${serviceSlug}`
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbList
  };
}
