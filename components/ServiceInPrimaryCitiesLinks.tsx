import Link from "next/link";
import {
  getPrimaryAreas,
  getService,
  anchorTextForAreaService,
} from "@/lib/seo-utils";

type Props = {
  serviceSlug: string;
  className?: string;
};

export default function ServiceInPrimaryCitiesLinks({
  serviceSlug,
  className = "",
}: Props) {
  const service = getService(serviceSlug);
  if (!service) return null;

  const primary = getPrimaryAreas();

  const primaryOrdered = [...primary].sort((a, b) => {
    const order = ["jefferson", "oconomowoc"];
    return order.indexOf(a.slug) - order.indexOf(b.slug);
  });

  return (
    <section
      className={`bg-gray-50 border border-gray-200 rounded-lg p-6 ${className}`}
      aria-label="Service in primary cities"
    >
      <h2 className="text-xl font-bold text-[#333333]">
        {service.name} in our primary service areas
      </h2>
      <p className="text-gray-600 mt-2">
        Quick access to city-specific pages (best for local rankings).
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {primaryOrdered.map((area) => (
          <Link
            key={area.slug}
            href={`/service-areas/${area.slug}/${service.slug}`}
            className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-[#CEDC00] hover:shadow-sm transition"
          >
            <div className="text-sm font-bold text-[#333333]">
              {anchorTextForAreaService(area, service)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {area.counties.join(", ")}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
