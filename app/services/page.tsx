// app/services/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import { SITE, buildUrl, serviceAreas } from "@/lib/seo-utils";

export async function generateMetadata(): Promise<Metadata> {
  const url = buildUrl("/services");

  const title = `Plumbing Services | ${SITE.name} | Call ${SITE.phone}`;
  const description =
    "Explore plumbing services from Klein Plumbing across Jefferson and Southeast Wisconsin—gas piping, water filtration, remodeling & new construction, sump pumps, and water heaters. Call 920-728-3034.";

  return {
    metadataBase: new URL(SITE.domain),
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title,
      description,
      images: [{ url: buildUrl("/og-image.png") }],
    },
    // ✅ remove twitter metadata (they don't use it)
    // ✅ keep keywords (fine)
    keywords: [
      "plumbing services Southeast Wisconsin",
      "plumber Jefferson WI",
      "plumber Oconomowoc WI",
      "gas piping plumber",
      "water filtration plumber",
      "sump pump plumber",
      "water heater services",
      "remodeling plumbing",
      "new construction plumbing",
      "Klein Plumbing",
    ],
  };
}

export default function ServicesPage() {
  // Hardcoded list of services - update this when you add new services
  const services = [
    {
      title: "Remodeling & New Construction Services",
      slug: "remodeling-new-construction",
      description: "Expert plumbing services tailored to your needs.",
    },
    {
      title: "Gas Piping Services",
      slug: "gas-piping",
      description: "Expert plumbing services tailored to your needs.",
    },
    {
      title: "Water Filtration Systems",
      slug: "water-filtration",
      description: "Expert plumbing services tailored to your needs.",
    },
    {
      title: "Sump Pump Services",
      slug: "sump-pump-services",
      description: "Expert plumbing services tailored to your needs.",
    },
    {
      title: "Water Heater Services",
      slug: "water-heater-services",
      description: "Expert plumbing services tailored to your needs.",
    },
  ];

  const pageUrl = buildUrl("/services");
  const telHref = `tel:${SITE.phone.replace(/[^0-9]/g, "")}`;

  // Use primary areas first (for internal links)
  const areasSorted = [...serviceAreas].sort((a, b) => {
    const ap = a.isPrimary ? 1 : 0;
    const bp = b.isPrimary ? 1 : 0;
    if (bp !== ap) return bp - ap;
    return a.name.localeCompare(b.name);
  });

  // Visible FAQs (and FAQPage schema)
  const faqs = [
    {
      q: "Do you offer emergency plumbing?",
      a: "If you have an active leak, backup, or no water, call. We’ll help you figure out the fastest next step and scheduling.",
    },
    {
      q: "Do you service areas outside Jefferson?",
      a: "Yes—Klein Plumbing serves Jefferson and nearby communities across Southeast Wisconsin. Use the service area links below to find local information.",
    },
    {
      q: "Can you help with remodeling or new construction?",
      a: "Yes. We handle plumbing for remodels and new builds and can coordinate with your timeline so you’re not stuck waiting on rough-in or final connections.",
    },
    {
      q: "Do you install and service water heaters?",
      a: "Yes—diagnostics, repair, replacement, and installation. If you’re out of hot water, call and we’ll walk through what’s most likely and what to check next.",
    },
  ];

  // ---- JSON-LD (SEO) ----
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Our Services",
      url: pageUrl,
      description:
        "Comprehensive plumbing solutions for residential and commercial properties throughout Southeast Wisconsin.",
      isPartOf: {
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.domain,
        // ✅ Facebook belongs here for this page's JSON-LD
        sameAs: [SITE.facebook],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: buildUrl("/") },
        { "@type": "ListItem", position: 2, name: "Services", item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Plumbing Services",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: services.length,
      itemListElement: services.map((s, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: s.title,
        url: buildUrl(`/services/${s.slug}`),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-white/10">
      {schemas.map((schema, idx) => (
        <Script
          key={idx}
          id={`schema-services-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Header */}
      {/* ✅ FIX: remove mt-20 because layout.tsx already pads the main content below the navbar */}
      <div className="bg-[#333333] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Our Services
          </h1>
          <p className="text-lg text-center text-gray-300 max-w-2xl mx-auto">
            Comprehensive plumbing solutions for residential and commercial
            properties throughout Southeast Wisconsin
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="block group"
            >
              <div className="bg-white/10 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300">
                {/* Title */}
                <h2 className="text-xl font-bold text-[#333333] uppercase mb-3 group-hover:text-[#CEDC00] transition-colors">
                  {service.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Learn More */}
                <span className="mt-auto block font-bold text-black uppercase text-[10px] tracking-[0.2em] transition-colors duration-300 group-hover:text-[#CEDC00]">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* ... (Previous Services Grid Ends Here) ... */}

      {/* SEO & Lead Section (The Page Ender) */}
      <section className="mt-8 w-full bg-white/10 py-20 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* LEFT: Stacked Trust Content */}
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-6xl font-black text-[#333333] mb-10 leading-[1.1] tracking-tight">
                Professional Plumbing Across{" "}
                <span className="text-[#CEDC00]">Southeast Wisconsin</span>
              </h2>

              <div className="space-y-12 text-gray-600 text-lg md:text-xl">
                <div className="max-w-3xl">
                  <p className="font-bold text-[#333333] mb-3 text-2xl italic underline decoration-[#CEDC00] decoration-4 underline-offset-8">
                    Don&apos;t see what you need?
                  </p>
                  <p className="leading-relaxed">
                    We offer a wide range of plumbing services beyond
                    what&apos;s listed above. Whether it&apos;s a unique repair
                    or a complex remodel, reach out to discuss your specific
                    project needs—you’ll get clear options, not a sales pitch.
                  </p>
                </div>

                <div className="max-w-3xl">
                  <p className="font-bold text-[#333333] mb-3 text-2xl">
                    Prevent Costly Damage
                  </p>
                  <p className="leading-relaxed">
                    If something is actively leaking or you’ve lost hot water,
                    call now. Klein Plumbing provides straightforward
                    recommendations and clean work to ensure your home is
                    protected from bigger damage later.
                  </p>
                </div>
              </div>

              {/* Facebook Trust Anchor */}
              <div className="mt-12 pt-10 border-t border-gray-100">
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex flex-col sm:flex-row sm:items-center gap-6"
                >
                  <div className="flex text-[#CEDC00] text-3xl tracking-tighter">
                    ★★★★★
                  </div>
                  <p className="text-sm font-bold text-[#333333] uppercase tracking-widest group-hover:text-[#CEDC00] transition-colors">
                    Read our 5-star reviews on Facebook{" "}
                    <span className="inline-block group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </p>
                </a>
              </div>
            </div>

            {/* RIGHT: High-Conversion CTA Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-[#333333] p-10 rounded-2xl shadow-2xl lg:-rotate-1">
                <h3 className="text-[#CEDC00] text-xs font-black uppercase tracking-[0.2em] mb-4">
                  Fastest Next Step
                </h3>

                <a href={telHref} className="block group mb-8">
                  <p className="text-white text-3xl font-black mb-1 group-hover:text-[#CEDC00] transition-colors">
                    {SITE.phone}
                  </p>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Click to Call Licensed Plumber
                  </p>
                </a>

                <ul className="text-white/80 space-y-4 mb-10 border-b border-white/10 pb-8">
                  {[
                    "Emergency Leaks",
                    "Water Heaters",
                    "Sump Pumps",
                    "Remodeling",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight"
                    >
                      <span className="w-1.5 h-1.5 bg-[#CEDC00] rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className="block w-full bg-[#CEDC00] text-[#333333] py-5 font-black uppercase text-sm tracking-widest hover:bg-white transition-all rounded-lg text-center"
                >
                  Contact Us Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
