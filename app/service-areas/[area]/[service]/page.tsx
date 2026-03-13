import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  SITE,
  serviceAreas,
  getArea,
  getService,
  generateServiceAreaMetadata,
  generatePageSchemas,
} from "@/lib/seo-utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string; service: string }>;
}): Promise<Metadata> {
  const { area, service } = await params;
  return generateServiceAreaMetadata(area, service);
}

export default async function ServiceInAreaPage({
  params,
}: {
  params: Promise<{ area: string; service: string }>;
}) {
  const { area: areaSlug, service: serviceSlug } = await params;

  const area = getArea(areaSlug);
  const svc = getService(serviceSlug);

  if (!area || !svc) return notFound();

  const telHref = `tel:${SITE.phone.replace(/[^0-9]/g, "")}`;
  const schemas = generatePageSchemas(area.slug, svc.slug);

  return (
    <>
      {schemas.map((schema, idx) => (
        <Script
          key={idx}
          id={`schema-${area.slug}-${svc.slug}-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="bg-transparent min-h-screen">
        {/* 1. HERO SECTION */}
        <section className="bg-[#333333] border-b-4 border-[#CEDC00]">
          <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-20 text-center">
            <div className="mx-auto max-w-4xl">
              <span className="inline-block bg-[#CEDC00] text-[#333333] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                Professional {svc.name} • {area.name}, WI
              </span>
              <h1 className="text-4xl font-black tracking-tighter text-white md:text-7xl leading-none mb-8">
                {svc.name} <br className="hidden md:block" />
                In <span className="text-[#CEDC00]">{area.name}, WI</span>
              </h1>

              <p className="mx-auto mt-4 max-w-5xl text-lg leading-relaxed text-gray-300 md:text-xl">
                Need reliable {svc.shortName.toLowerCase()} in {area.name}?
                Klein Plumbing provides straightforward expertise, upfront
                pricing, and clean work for homeowners across{" "}
                {area.counties.join(" & ")}.
              </p>

              <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                <a
                  href={telHref}
                  className="inline-flex items-center justify-center rounded-xl bg-[#CEDC00] px-8 py-5 text-sm font-black uppercase tracking-widest text-[#333333] transition-all hover:bg-white shadow-lg"
                >
                  Call {SITE.phone}
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-5 text-sm font-black uppercase tracking-widest text-[#333333] transition-all hover:text-[#CEDC00] shadow-lg"
                >
                  Book Online
                </Link>
              </div>
            </div>
          </div>
        </section>

        <main className="mx-auto max-w-[1440px] px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* 2. CONTENT STACK */}
            <div className="lg:col-span-8">
              <section className="max-w-3xl">
                <h2 className="text-3xl font-black text-[#333333] md:text-5xl tracking-tight mb-6 uppercase italic">
                  Expert {svc.shortName} Solutions
                </h2>
                <div className="h-2 w-20 bg-[#CEDC00] mb-8"></div>

                <div className="text-xl text-[#333333] leading-relaxed space-y-6">
                  <p>
                    Specializing in{" "}
                    <span className="mt-auto block font-bold text-black uppercase text-[10px] tracking-[0.2em] transition-colors duration-300 group-hover:text-[#CEDC00]">
                      {svc.name.toLowerCase()}
                    </span>{" "}
                    tailored to the specific needs of{" "}
                    <span className="font-bold">{area.name}</span> properties.{" "}
                    {svc.description}.
                  </p>
                  <p>
                    Whether you are dealing with an emergency or planning an
                    upgrade, our licensed team arrives ready to provide a
                    lasting fix that meets all Wisconsin state plumbing codes.
                  </p>
                </div>

                {/* NEW FACEBOOK TRUST CTA */}
                <div className="bg-white/10 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300">
                  <div className="bg-white/10 p-4 rounded-2xl text-white">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#333333] font-black uppercase text-sm tracking-widest mb-1">
                      See Our Work in {area.name}
                    </p>
                    <p className="text-gray-500 text-sm mb-3 font-medium">
                      Read our 5-star reviews and view recent projects on
                      Facebook.
                    </p>
                    <a
                      href={SITE.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#333333] font-black text-xs uppercase tracking-[0.2em] hover:text-[#CEDC00] transition-colors"
                    >
                      Visit Our Facebook Page →
                    </a>
                  </div>
                </div>

                {/* LOCATIONAL CONTEXT CARDS */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="text-sm font-black text-[#333333] uppercase tracking-widest mb-3">
                      Serving {area.name}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {area.description}. Based near Helenville, we are just a
                      short drive from {area.name} via local routes.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="text-sm font-black text-[#333333] uppercase tracking-widest mb-3">
                      30-Mile Radius
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      We provide rapid response for{" "}
                      {svc.shortName.toLowerCase()} across {area.counties[0]}
                      and the surrounding Southeast Wisconsin communities.
                    </p>
                  </div>
                </div>
              </section>

              {/* 3. SEO CLOUD */}
              <section className="mt-20 pt-12 border-t border-gray-100">
                <h3 className="text-sm font-black text-[#333333] uppercase tracking-widest mb-6">
                  Also Providing {svc.name} in:
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {serviceAreas
                    .filter((neighbor) => neighbor.slug !== area.slug)
                    .map((neighbor) => (
                      <Link
                        key={neighbor.slug}
                        href={`/service-areas/${neighbor.slug}/${svc.slug}`}
                        className="text-xs font-bold text-gray-400 hover:text-[#CEDC00] transition-colors"
                      >
                        {neighbor.name}
                      </Link>
                    ))}
                </div>
              </section>
            </div>

            {/* 4. CONVERSION SIDEBAR */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                {/* PRIMARY CTA BOX */}
                <div className="bg-[#333333] p-10 rounded-[2.5rem] shadow-2xl border-t-8 border-[#CEDC00]">
                  <h3 className="text-[#CEDC00] text-xs font-black uppercase tracking-[0.2em] mb-4 text-center">
                    Direct Line
                  </h3>

                  <a href={telHref} className="block text-center group mb-10">
                    <p className="text-white text-3xl font-black mb-1 group-hover:text-[#CEDC00] transition-colors leading-none">
                      {SITE.phone}
                    </p>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                      Talk To A Licensed Plumber
                    </p>
                  </a>

                  <ul className="space-y-5 mb-10">
                    {[
                      "Licensed & Insured",
                      "Upfront Pricing",
                      "Helenville-Based",
                      "Clean Work Area",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-4 text-white font-bold text-xs uppercase tracking-tight"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#CEDC00]"></div>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/#contact"
                    className="block w-full bg-[#CEDC00] text-[#333333] py-5 font-black uppercase text-xs tracking-widest hover:bg-white transition-all rounded-xl text-center shadow-lg"
                  >
                    Book {svc.shortName}
                  </Link>
                </div>

                {/* NEW: SEO SAFETY NET BOX */}
                <div className="rounded-2xl bg-white/10 p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                  <h4 className="text-[#333333] font-black uppercase text-sm tracking-widest mb-3">
                    Not what you&apos;re looking for?
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                    Klein Plumbing provides **comprehensive plumbing solutions**
                    across Southeast Wisconsin. From complex remodels to minor
                    repairs, our team has the local expertise to handle any
                    project.
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center text-xs font-black uppercase tracking-widest text-[#333333] hover:text-[#CEDC00] transition-colors"
                  >
                    View All Services <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
