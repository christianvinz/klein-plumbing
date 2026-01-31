import Link from "next/link";
import { buildUrl, SITE } from "@/lib/seo-utils";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Plumbing Service Areas | Jefferson & Waukesha Counties | ${SITE.name}`,
    description: `Klein Plumbing provides rapid-response plumbing to a 30-mile radius of Helenville, including Jefferson, Watertown, Oconomowoc, and Waukesha.`,
    alternates: { canonical: buildUrl("/service-areas") },
  };
}

export default function ServiceAreasPage() {
  const primaryHubs = [
    "Jefferson",
    "Fort Atkinson",
    "Watertown",
    "Oconomowoc",
    "Waukesha",
    "Whitewater",
    "Lake Mills",
    "Delafield",
  ];

  const surroundingCommunities = [
    "Johnson Creek",
    "Cambridge",
    "Sullivan",
    "Helenville",
    "Pewaukee",
    "Waterloo",
    "Palmyra",
    "Rome",
    "Ixonia",
    "Concord",
    "Dousman",
    "Ashippun",
    "Lebanon",
    "Hartland",
  ];

  const telHref = `tel:${SITE.phone.replace(/[^0-9]/g, "")}`;

  return (
    <div className="min-h-screen bg-white/10">
      {/* 1. THE FEATURE HERO: Restored with local authority text */}
      <section className="relative bg-[#333333] py-28 overflow-hidden border-b-8 border-[#CEDC00]">
        {/* Radial Map Visual */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="none"
              stroke="#CEDC00"
              strokeWidth="0.2"
            />
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="white"
              strokeWidth="0.1"
              strokeDasharray="2 2"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="white"
              strokeWidth="0.05"
            />
            <circle cx="50" cy="50" r="1.5" fill="#CEDC00" />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
          <span className="inline-block bg-[#CEDC00] text-[#333333] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            Local Southeast WI Experts
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter">
            Our 30-Mile <br />
            <span className="text-[#CEDC00]">Service Radius</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-300 leading-relaxed font-medium">
            Based in Helenville, we provide rapid-response plumbing to
            <span className="text-white">
              {" "}
              Jefferson, Waukesha, and Dodge Counties.
            </span>
          </p>
        </div>
      </section>

      {/* 2. THE CONTENT & DIRECTORY SECTION */}
      <section className="py-20 bg--white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* LEFT: Directory + Local Infrastructure Knowledge */}
            <div className="lg:col-span-8">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-[#333333] mb-6 uppercase tracking-tight">
                  Major Service Hubs
                </h2>
                <p className="text-gray-600 text-lg max-w-3xl mb-10 leading-relaxed">
                  Our central location in Helenville allows our trucks to hit
                  <span className="font-bold text-[#333333]">
                    {" "}
                    Hwy 18 or I-94 in minutes
                  </span>
                  . This ensures we provide the fastest possible response times
                  for plumbing emergencies across the following communities:
                </p>
                <div className="h-1.5 w-16 bg-[#CEDC00] mb-10"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {primaryHubs.map((city) => (
                    <Link
                      key={city}
                      href={`/service-areas/${city.toLowerCase().replace(/\s+/g, "-")}`}
                      className="group flex items-center justify-between bg-white/10 px-5 py-4 rounded-xl border border-gray-100 hover:border-[#333333] hover:shadow-lg transition-all"
                    >
                      <span className="font-bold text-[#333333] group-hover:text-[#CEDC00] transition-colors">
                        {city}
                      </span>
                      <span className="text-gray-300 group-hover:text-[#333333] transition-colors">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* SURROUNDING: The Link Cloud */}
              <div className="mt-20">
                <h3 className="text-xs font-black text-gray-400 mb-6 uppercase tracking-[0.3em]">
                  Surrounding Communities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {surroundingCommunities.map((town) => (
                    <Link
                      key={town}
                      href={`/service-areas/${town.toLowerCase().replace(/\s+/g, "-")}`}
                      className="bg-white/10 px-4 py-2 rounded-lg border border-gray-100 text-[#333333] font-semibold text-xs hover:bg-[#CEDC00] hover:border-[#CEDC00] transition-all"
                    >
                      {town}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Restored "The Wisconsin Edge" Autority Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-[#333333] rounded-[2rem] p-10 text-white shadow-2xl">
                <h3 className="text-[#CEDC00] text-2xl font-black mb-10 italic">
                  The Wisconsin Edge
                </h3>

                <div className="space-y-10">
                  <div className="relative pl-8 border-l-2 border-white/10">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#CEDC00]"></div>
                    <p className="font-bold text-lg mb-1 uppercase tracking-tight">
                      Winter Ready
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      We specialize in frozen pipe repair and
                      winterization—essential for bitter Southeast Wisconsin
                      winters.
                    </p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-white/10">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#CEDC00]"></div>
                    <p className="font-bold text-lg mb-1 uppercase tracking-tight">
                      Well & City Experts
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      From wells in Rome to city water in Waukesha, we handle
                      the specific filtration and pump needs of our region.
                    </p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-white/10">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#CEDC00]"></div>
                    <p className="font-bold text-lg mb-1 uppercase tracking-tight">
                      Spring Thaw Prep
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      When the snow melts, we protect basements in Jefferson and
                      Dodge Counties from sump pump failure.
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-[#CEDC00] font-black text-4xl">30+</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Areas
                    </p>
                  </div>
                  <div>
                    <p className="text-white font-black text-4xl">24/7</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      Service
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CENTERED CLOSING: The Final Neighborhood CTA */}
      <section className="w-full bg-white/10 py-24 border-t border-gray-100">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-7xl font-black text-[#333333] mb-8 leading-tight tracking-tighter">
            Plumbing Help in <br />
            <span className="text-[#CEDC00]">Your Neighborhood.</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            From{" "}
            <span className="font-bold text-[#333333]">
              Helenville to Oconomowoc
            </span>
            , you get the same straightforward pricing and clean work. We
            understand the unique plumbing needs of Southeast Wisconsin
            properties.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={telHref}
              className="bg-[#333333] text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-[#CEDC00] hover:text-[#333333] transition-all"
            >
              Call {SITE.phone}
            </a>
            <Link
              href="/#contact"
              className="bg-white border-2 border-[#333333] text-[#333333] px-10 py-5 rounded-xl font-black uppercase tracking-widest hover:bg-gray-50 transition-all"
            >
              Contact Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
