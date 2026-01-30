import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  SITE,
  services,
  getArea,
  generateServiceAreaMetadata,
  generatePageSchemas,
} from "@/lib/seo-utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  return generateServiceAreaMetadata(area);
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area: areaSlug } = await params;
  const area = getArea(areaSlug);

  if (!area) return notFound();

  const telHref = `tel:${SITE.phone.replace(/[^0-9]/g, "")}`;
  const schemas = generatePageSchemas(area.slug);

  return (
    <>
      {schemas.map((schema, idx) => (
        <Script
          key={idx}
          id={`schema-service-area-${area.slug}-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="min-h-screen bg-white/10">
        {/* 1. HERO SECTION: FIXED CONTRAST FOR READABILITY */}
        <section className="bg-[#333333] py-16 md:py-20 border-b-4 border-[#CEDC00]">
          <div className="max-w-[1440px] mx-auto px-6 text-center">
            <span className="inline-block bg-[#CEDC00] text-[#333333] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              Licensed & Insured Wisconsin Plumbers
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tighter">
              Expert <span className="text-[#CEDC00]">Plumbing Service</span>{" "}
              <br className="hidden md:block" />
              in {area.name}, WI
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed mb-12">
              Professional repairs, high-efficiency upgrades, and emergency
              response across
              <span className="text-white font-bold"> {area.name} </span> and
              the surrounding {area.counties.join(" & ")} County communities.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a
                href={telHref}
                className="w-full sm:w-auto bg-[#CEDC00] text-[#333333] px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl text-center"
              >
                Call {SITE.phone}
              </a>
              <Link
                href="/#contact"
                className="w-full sm:w-auto bg-white text-[#333333] px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#CEDC00] transition-all shadow-lg text-center"
              >
                Book Online
              </Link>
            </div>
          </div>
        </section>

        {/* 2. CONTENT STACK */}
        <section className="py-24 bg-white/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-8">
                <div className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-black text-[#333333] mb-6 leading-tight uppercase italic">
                    Reliable Solutions for <br /> {area.name} Homeowners
                  </h2>
                  <div className="h-2 w-24 bg-[#CEDC00]"></div>
                </div>

                <div className="space-y-12 text-[#333333] text-xl leading-relaxed">
                  <div className="max-w-3xl">
                    <p className="font-bold text-[#333333] mb-4 text-2xl italic underline decoration-[#CEDC00] decoration-4 underline-offset-8">
                      Local infrastructure experts.
                    </p>
                    <p>
                      Klein Plumbing understands the specific needs of
                      properties in{" "}
                      <span className="font-bold">{area.name}</span>. Whether
                      you are dealing with a spring thaw sump pump emergency or
                      need winterized pipe protection for a Wisconsin freeze, we
                      provide the straightforward technical expertise required
                      for a lasting fix.
                    </p>
                  </div>

                  {/* HIGH-INTENT SERVICE GRID: LINKS FIXED TO NESTED ROUTES */}
                  <div className="grid md:grid-cols-2 gap-6 pt-6">
                    {services.map((svc) => (
                      <Link
                        key={svc.slug}
                        href={`/service-areas/${area.slug}/${svc.slug}`}
                        className="bg-white/10 p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-300"
                      >
                        <h3 className="text-2xl font-black text-[#333333] group-hover:text-[#CEDC00] transition-colors mb-3 uppercase">
                          {svc.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                          Licensed {svc.name.toLowerCase()} in {area.name} for
                          repairs, installations, and maintenance.
                        </p>
                        <span className="mt-auto block font-bold text-black uppercase text-[10px] tracking-[0.2em] transition-colors duration-300 group-hover:text-[#CEDC00]">
                          View Details →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* CONVERSION SIDEBAR */}
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <div className="bg-[#333333] p-12 rounded-[3rem] shadow-2xl border-t-8 border-[#CEDC00]">
                  <h3 className="text-[#CEDC00] text-xs font-black uppercase tracking-[0.2em] mb-6 text-center">
                    Fastest Response in {area.name}
                  </h3>

                  <a href={telHref} className="block group mb-12 text-center">
                    <p className="text-white text-4xl font-black mb-1 group-hover:text-[#CEDC00] transition-colors">
                      {SITE.phone}
                    </p>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-2">
                      Talk To A Licensed Plumber
                    </p>
                  </a>

                  <div className="space-y-6 mb-12 border-t border-white/10 pt-10">
                    {[
                      "Licensed & Insured",
                      "Upfront Pricing",
                      "Clean Work Area",
                      "WI State Standards",
                    ].map((benefit) => (
                      <div
                        key={benefit}
                        className="flex items-center gap-4 text-white font-bold text-xs uppercase tracking-widest"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#CEDC00]"></div>
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/#contact"
                    className="block w-full bg-[#CEDC00] text-[#333333] py-6 font-black uppercase text-xs tracking-widest hover:bg-white transition-all rounded-2xl text-center shadow-lg"
                  >
                    Request Online
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
