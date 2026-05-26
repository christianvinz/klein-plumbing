import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/seo-utils";

export default function NotFound() {
  const telHref = `tel:${SITE.phone.replace(/[^0-9]/g, "")}`;

  return (
    <div className="relative min-h-screen flex flex-col">

      {/* Hero image */}
      <div className="relative w-full h-[40vh] sm:h-[48vh] flex-shrink-0">
        <Image
          src="/kleinplumbing.jpeg"
          alt="Klein Plumbing truck"
          fill
          className="object-cover object-[center_40%]"
          priority
        />
        {/* Fade bottom into content, no top overlay so van reads clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#333333]" />
      </div>

      {/* Content */}
      <div className="flex-1 bg-[#333333] flex flex-col items-center justify-start px-6 pb-12 text-center">
        <div className="w-full max-w-lg space-y-8">

          <div className="space-y-3">
            <p className="text-[#CEDC00] font-black uppercase tracking-[0.25em] text-sm">
              404
            </p>
            <h1 className="text-white font-black uppercase text-4xl md:text-5xl tracking-tight leading-none">
              Page Not Found
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Looks like that page moved — but we didn&apos;t.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/services"
              className="block w-full bg-[#CEDC00] text-[#333333] font-black uppercase py-4 text-sm tracking-wider hover:bg-white transition-colors"
            >
              View Our Services
            </Link>
            <a
              href={telHref}
              className="block w-full border border-white/20 text-white font-bold uppercase py-4 text-sm tracking-wider hover:border-[#CEDC00] hover:text-[#CEDC00] transition-colors"
            >
              Call {SITE.phone}
            </a>
          </div>

          <p className="text-gray-500 text-sm italic">
            Easier to find than a hidden shut-off valve.
          </p>

        </div>
      </div>

    </div>
  );
}
