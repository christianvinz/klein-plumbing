import Link from "next/link";
import {
  getPrimaryAreas,
  getSecondaryAreas,
  anchorTextForArea,
} from "@/lib/seo-utils";

type Props = {
  variant?: "compact" | "full";
  className?: string;
};

export default function PrimaryServiceAreasLinks({
  variant = "full",
  className = "",
}: Props) {
  const primary = getPrimaryAreas();
  const secondary = getSecondaryAreas();

  // If you ever want to hard-enforce ordering:
  const primaryOrdered = [...primary].sort((a, b) => {
    const order = ["jefferson", "oconomowoc"];
    return order.indexOf(a.slug) - order.indexOf(b.slug);
  });

  return (
    <section
      className={`border-t border-gray-200 bg-white ${className}`}
      aria-label="Primary service areas"
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-[#333333]">
              Serving Jefferson + Lake Country
            </h2>
            <p className="text-gray-600 mt-2">
              Fast local plumbing service from our primary hubs.
            </p>
          </div>

          <Link
            href="/service-areas"
            className="text-sm font-bold uppercase tracking-wider text-[#333333] hover:text-[#CEDC00]"
          >
            View all service areas →
          </Link>
        </div>

        {/* Primary hubs (high internal link weighting) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {primaryOrdered.map((area) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="rounded-lg border border-gray-200 p-5 hover:border-[#CEDC00] hover:shadow-sm transition"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Primary hub
              </div>
              <div className="mt-1 text-lg font-bold text-[#333333]">
                {anchorTextForArea(area)}
              </div>
              <div className="mt-2 text-gray-600 text-sm">
                {area.description}
              </div>
            </Link>
          ))}
        </div>

        {/* Secondary areas (optional density) */}
        {variant === "full" && secondary.length > 0 && (
          <>
            <h3 className="mt-10 text-sm font-bold uppercase tracking-wider text-gray-600">
              Also serving nearby communities
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {secondary.map((area) => (
                <Link
                  key={area.slug}
                  href={`/service-areas/${area.slug}`}
                  className="text-sm bg-gray-50 border border-gray-200 rounded-full px-4 py-2 hover:border-[#CEDC00] hover:bg-white transition"
                >
                  {anchorTextForArea(area)}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
