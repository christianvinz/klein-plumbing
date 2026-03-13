import Link from "next/link";
import Image from "next/image";
import { SITE, serviceAreas } from "@/lib/seo-utils";

const Footer = () => {
  const hubs = serviceAreas
    .filter((a) => a.isPrimary)
    .sort((a, b) => a.name.localeCompare(b.name));

  const surrounding = serviceAreas
    .filter((a) => !a.isPrimary)
    .sort((a, b) => a.name.localeCompare(b.name));

  const telHref = `tel:${SITE.phone.replace(/[^0-9]/g, "")}`;

  return (
    <footer className="bg-[#333333] text-white pt-10 pb-6 border-t-8 border-[#CEDC00]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* COLUMN 1: BUSINESS IDENTITY */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo_white.png"
                alt="Klein Plumbing"
                width={110}
                height={50}
                priority
              />
            </Link>

            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter mb-2">
                Klein Plumbing, LLC
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Professional plumbing within a{" "}
                <span className="text-white font-bold">
                  30-mile radius of Helenville
                </span>
                , serving{" "}
                <span className="text-white">
                  Jefferson, Waukesha, Watertown, and Delafield
                </span>
                .
              </p>
            </div>

            <div className="space-y-2">
              <a
                href={telHref}
                className="group flex items-center gap-3 text-2xl font-black text-[#CEDC00] hover:text-white transition-colors"
              >
                <span className="bg-[#CEDC00] text-[#333333] p-1.5 rounded group-hover:bg-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.558-8.903.088-.041 2.055-1.008 2.062-1.012l-3.521-6.795c-.01-.005-1.965.963-2.056 1.008-3.123 1.512-4.348 4.396-2.319 9.313 2.456 5.959 10.557 14.292 16.156 11.583.091-.044 2.036-.988 2.046-.993-.001.001-.001.001-2.046.993z" />
                  </svg>
                </span>
                {SITE.phone}
              </a>

              {/* EMAIL AND FACEBOOK ON SAME LINE */}
              <div className="flex items-center justify-between">
                <a
                  href="mailto:service@klein.plumbing"
                  className="group flex items-center gap-2 text-gray-400 hover:text-[#CEDC00] font-bold text-[12px] tracking-widest uppercase transition-colors"
                >
                  <span className="bg-[#CEDC00] text-[#333333] p-1.5 rounded group-hover:bg-white transition-colors flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
                    </svg>
                  </span>
                  service@klein.plumbing
                </a>
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#CEDC00] transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* COLUMN 2: NAVIGATION & LOCATIONS */}
          <div className="lg:col-span-8 space-y-6">
            {/* NAVIGATION */}
            <div className="border-b border-white/10 pb-4">
              <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">
                Navigation
              </p>
              <div className="flex flex-wrap gap-8 text-[12px] font-black uppercase tracking-widest text-[#CEDC00]">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/service-areas"
                  className="hover:text-white transition-colors"
                >
                  Areas
                </Link>
                <Link
                  href="/#reviews"
                  className="hover:text-white transition-colors"
                >
                  Reviews
                </Link>
                <Link
                  href="/#faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* LOCATIONS */}
            <div className="space-y-5">
              {/* Major Service Hubs */}
              <div>
                <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Major Service Hubs
                </p>
                <div className="flex flex-wrap gap-2">
                  {hubs.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/service-areas/${area.slug}`}
                      className="bg-white/5 border border-white/10 text-white px-2.5 py-1 rounded font-bold text-[11px] hover:bg-[#CEDC00] hover:text-[#333333] transition-all"
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Surrounding Communities */}
              <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">
                  Surrounding Communities
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {surrounding.map((area, index) => (
                    <span key={area.slug}>
                      <Link
                        href={`/service-areas/${area.slug}`}
                        className="hover:text-[#CEDC00] transition-colors"
                      >
                        {area.name}
                      </Link>
                      {index < surrounding.length - 1 && (
                        <span className="text-white/20"> • </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>

              {/* RAPID RESPONSE */}
              <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                <p className="text-[12.3px] text-gray-400 leading-relaxed italic text-left">
                  Rapid-response plumbing to{" "}
                  <span className="font-bold text-white/80">
                    Jefferson, Waukesha, and Dodge Counties
                  </span>
                  . Our{" "}
                  <span className="font-bold text-white/80">
                    30-mile radius
                  </span>{" "}
                  covers well and city water systems from our Helenville shop.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 mt-8 pt-5">
          <div className="text-gray-500 text-[12px] text-left">
            © {new Date().getFullYear()} Klein Plumbing LLC • Licensed & Insured
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
