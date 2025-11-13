import { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { 
  serviceAreas, 
  generateServiceAreaMetadata, 
  generateBreadcrumbSchema 
} from '@/lib/seo-utils';

interface ServiceAreaPageProps {
  params: {
    area: string;
  };
}

// Generate static params for all service areas
export async function generateStaticParams() {
  return serviceAreas.map((area) => ({
    area: area.slug,
  }));
}

// Generate metadata for each service area
export async function generateMetadata(
  { params }: ServiceAreaPageProps
): Promise<Metadata> {
  return generateServiceAreaMetadata(params.area);
}

export default function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const area = serviceAreas.find(a => a.slug === params.area);

  if (!area) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema(params.area);

  return (
    <>
      {/* Breadcrumb Schema */}
      <Script
        id={`breadcrumb-${params.area}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Professional Plumber in {area.name}, {area.state}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Klein Plumbing, LLC provides trusted, family-owned plumbing services 
            throughout {area.name} and {area.counties.join(' & ')}. 
            Quality work, fair prices, and reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:920-728-3034"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Call 920-728-3034
            </a>
            <a 
              href="#services"
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              View Services
            </a>
          </div>
        </section>

        {/* Why Choose Us for Area */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Choose Klein Plumbing in {area.name}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-3">Local & Trusted</h3>
              <p className="text-gray-600">
                Family-owned business serving {area.name} and Southeast Wisconsin. 
                We're your neighbors, not a national chain.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Fast Response</h3>
              <p className="text-gray-600">
                Quick response times for emergency plumbing issues in {area.name}. 
                We understand urgent plumbing problems can't wait.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-bold mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">
                Licensed, experienced plumber with fair pricing. 
                We stand behind our work with quality guarantees.
              </p>
            </div>
          </div>
        </section>

        {/* Services in This Area */}
        <section id="services" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Plumbing Services in {area.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Emergency Plumbing */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-yellow-400 transition-colors">
              <h3 className="text-xl font-bold mb-3">🚨 Emergency Plumbing</h3>
              <p className="text-gray-600 mb-4">
                24/7 emergency plumbing repairs in {area.name}. Burst pipes, 
                overflowing toilets, and urgent leaks handled fast.
              </p>
              <a href={`/service-areas/${params.area}/emergency-plumbing`} className="text-blue-600 hover:underline">
                Learn more →
              </a>
            </div>

            {/* Water Heaters */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-yellow-400 transition-colors">
              <h3 className="text-xl font-bold mb-3">🔥 Water Heater Services</h3>
              <p className="text-gray-600 mb-4">
                Water heater repair, replacement, and installation. 
                Tank and tankless systems for {area.name} homes.
              </p>
              <a href={`/service-areas/${params.area}/water-heater`} className="text-blue-600 hover:underline">
                Learn more →
              </a>
            </div>

            {/* Drain Cleaning */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-yellow-400 transition-colors">
              <h3 className="text-xl font-bold mb-3">🌊 Drain Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Professional drain cleaning and clog removal. 
                Clear slow drains and restore proper flow quickly.
              </p>
              <a href={`/service-areas/${params.area}/drain-cleaning`} className="text-blue-600 hover:underline">
                Learn more →
              </a>
            </div>

            {/* Leak Repair */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-yellow-400 transition-colors">
              <h3 className="text-xl font-bold mb-3">💧 Leak Repair</h3>
              <p className="text-gray-600 mb-4">
                Fast leak detection and repair throughout {area.name}. 
                Don't let small leaks become big problems.
              </p>
              <a href={`/service-areas/${params.area}/leak-repair`} className="text-blue-600 hover:underline">
                Learn more →
              </a>
            </div>

            {/* Toilet Services */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-yellow-400 transition-colors">
              <h3 className="text-xl font-bold mb-3">🚽 Toilet Repair</h3>
              <p className="text-gray-600 mb-4">
                Toilet repairs, replacements, and installations. 
                Running toilets, clogs, and more fixed right.
              </p>
              <a href={`/service-areas/${params.area}/toilet-repair`} className="text-blue-600 hover:underline">
                Learn more →
              </a>
            </div>

            {/* Pipe Repair */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-yellow-400 transition-colors">
              <h3 className="text-xl font-bold mb-3">🔧 Pipe Repair</h3>
              <p className="text-gray-600 mb-4">
                Pipe repair and replacement services. 
                Fixing leaky, frozen, or damaged pipes in {area.name}.
              </p>
              <a href={`/service-areas/${params.area}/pipe-repair`} className="text-blue-600 hover:underline">
                Learn more →
              </a>
            </div>
          </div>
        </section>

        {/* Local Content Section */}
        <section className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6">
            Serving {area.name} & Surrounding Communities
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Klein Plumbing is proud to serve homeowners and businesses throughout 
            {area.name}, Wisconsin. As a local, family-owned plumbing company based 
            in Southeast Wisconsin, we understand the unique plumbing challenges that 
            {area.counties.join(' and ')} residents face.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Whether you need emergency plumbing repairs, routine maintenance, or a 
            complete plumbing installation in {area.name}, we're here to help with 
            quality workmanship and fair pricing. Our {area.isPrimary ? 'home base' : 'service commitment'} in 
            the area means faster response times and personalized service from a 
            plumber who cares about your community.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-3">We Also Serve:</h3>
            <div className="flex flex-wrap gap-3">
              {serviceAreas
                .filter(a => a.slug !== params.area)
                .map(nearby => (
                  <a
                    key={nearby.slug}
                    href={`/service-areas/${nearby.slug}`}
                    className="bg-white px-4 py-2 rounded-full hover:bg-yellow-100 transition-colors border border-gray-200"
                  >
                    {nearby.name}
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-800 text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">
            Need a Plumber in {area.name}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Call Klein Plumbing today for fast, reliable plumbing service in 
            {area.name} and throughout Southeast Wisconsin.
          </p>
          <a 
            href="tel:920-728-3034"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg text-lg transition-colors"
          >
            920-728-3034
          </a>
          <p className="mt-6 text-gray-300">
            Or email us at{' '}
            <a href="mailto:Service@klein.plumbing" className="underline hover:text-yellow-400">
              Service@klein.plumbing
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
