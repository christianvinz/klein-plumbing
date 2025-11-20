import Link from "next/link";

export default function ServicesPage() {
  // Hardcoded list of services - update this when you add new services
  const services = [
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
      title: "Remodeling & New Construction Services",
      slug: "remodeling-new-construction",
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#333333] text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Our Services
          </h1>
          <p className="text-lg text-center text-gray-300 max-w-2xl mx-auto">
            Comprehensive plumbing solutions for residential and commercial properties throughout Southeast Wisconsin
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
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all h-full">
                {/* Title */}
                <h2 className="text-xl font-bold text-[#333333] uppercase mb-3 group-hover:text-[#CEDC00] transition-colors">
                  {service.title}
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                
                {/* Learn More */}
                <span className="inline-block font-bold text-[#CEDC00] uppercase text-xs tracking-wider group-hover:underline">
                  Learn More →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-2xl font-bold text-[#333333] mb-4">
            Don't See What You Need?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer a wide range of plumbing services beyond what's listed here. Contact us to discuss your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:9207283034"
              className="inline-block bg-[#CEDC00] text-[#333333] px-8 py-3 font-bold uppercase text-sm tracking-wider hover:bg-[#333333] hover:text-white transition-colors rounded"
            >
              Call 920-728-3034
            </a>
            <Link
              href="/#contact"
              className="inline-block bg-[#333333] text-white px-8 py-3 font-bold uppercase text-sm tracking-wider hover:bg-[#CEDC00] hover:text-[#333333] transition-colors rounded"
            >
              Contact Us Online
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
