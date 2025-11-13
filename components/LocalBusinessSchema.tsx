import Script from 'next/script';

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "name": "Klein Plumbing, LLC",
    "image": "https://klein-plumbing.com/logo.png",
    "logo": "https://klein-plumbing.com/logo.png",
    "@id": "https://klein-plumbing.com",
    "url": "https://klein-plumbing.com",
    "telephone": "+1-920-728-3034",
    "email": "Service@klein.plumbing",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jefferson, WI", // Update with actual street address if you want it public
      "addressLocality": "Jefferson",
      "addressRegion": "WI",
      "postalCode": "53549",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.0058",
      "longitude": "-88.8073"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Jefferson",
        "addressRegion": "WI"
      },
      {
        "@type": "City",
        "name": "Fort Atkinson",
        "addressRegion": "WI"
      },
      {
        "@type": "City",
        "name": "Watertown",
        "addressRegion": "WI"
      },
      {
        "@type": "City",
        "name": "Johnson Creek",
        "addressRegion": "WI"
      },
      {
        "@type": "City",
        "name": "Lake Mills",
        "addressRegion": "WI"
      },
      {
        "@type": "City",
        "name": "Cambridge",
        "addressRegion": "WI"
      },
      {
        "@type": "City",
        "name": "Sullivan",
        "addressRegion": "WI"
      },
      {
        "@type": "City",
        "name": "Helenville",
        "addressRegion": "WI"
      }
    ],
    "serviceType": [
      "Emergency Plumbing",
      "Drain Cleaning",
      "Water Heater Repair",
      "Water Heater Installation",
      "Leak Repair",
      "Pipe Repair",
      "Toilet Repair",
      "Faucet Installation",
      "Garbage Disposal Repair",
      "Sump Pump Services"
    ],
    "slogan": "Your trusted, family-owned plumbing experts serving Jefferson and Southeast Wisconsin. Quality work, fair prices.",
    "foundingDate": "2022", // Update with actual founding year
    "paymentAccepted": "Cash, Check, Credit Card, Debit Card",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Plumbing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Plumbing Services",
            "description": "24/7 emergency plumbing repairs for Southeast Wisconsin"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Water Heater Services",
            "description": "Water heater repair, replacement, and installation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Drain Cleaning",
            "description": "Professional drain cleaning and clog removal"
          }
        }
      ]
    }
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
