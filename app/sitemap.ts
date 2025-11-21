import { MetadataRoute } from 'next';
import { serviceAreas, services } from '@/lib/seo-utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://klein.plumbing';
  const currentDate = new Date();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  // Service area pages (high priority for local SEO)
  const serviceAreaPages: MetadataRoute.Sitemap = serviceAreas.map(area => ({
    url: `${baseUrl}/service-areas/${area.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: area.isPrimary ? 0.95 : 0.85,
  }));

  // Service-specific pages for each area
  const serviceAreaServicePages: MetadataRoute.Sitemap = [];
  serviceAreas.forEach(area => {
    services.forEach(service => {
      serviceAreaServicePages.push({
        url: `${baseUrl}/service-areas/${area.slug}/${service.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.75,
      });
    });
  });

  // Job log pages (if you implement individual job pages)
  const jobLogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/joblog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  return [
    ...corePages,
    ...serviceAreaPages,
    ...serviceAreaServicePages,
    ...jobLogPages,
  ];
}
