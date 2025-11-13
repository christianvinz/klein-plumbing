import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StoryblokProvider from "../components/StoryblokProvider"; 

// Configure the font
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["400", "700", "900"]
});

export const metadata: Metadata = {
  metadataBase: new URL('https://klein-plumbing.com'),
  title: {
    default: "Klein Plumbing, LLC | Licensed Plumber in Jefferson & Southeast Wisconsin",
    template: '%s | Klein Plumbing'
  },
  description: "Family-owned plumbing services in Jefferson, Fort Atkinson, Watertown, and Southeast Wisconsin. Repairs, remodeling, and new build. Licensed, trusted plumber. Call 920-728-3034.",
  keywords: [
    'plumber Jefferson WI',
    'plumbing Southeast Wisconsin',
    'Klein Plumbing',
    'emergency plumber',
    'water heater repair',
    'drain cleaning',
    'Fort Atkinson plumber',
    'Watertown plumber',
    'plumbing repairs',
    'plumbing remodeling'
  ],
  authors: [{ name: 'Klein Plumbing, LLC' }],
  // Set theme color for browser UI (address bar, tabs)
  themeColor: "#333333",
  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://klein-plumbing.com',
    siteName: 'Klein Plumbing, LLC',
    title: "Klein Plumbing | Repairs - Remodeling - New Build",
    description: "Trusted, family-owned plumbing experts serving Jefferson and Southeast Wisconsin.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Klein Plumbing Logo",
      }
    ],
  },
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Klein Plumbing | Southeast Wisconsin Plumber",
    description: "Repairs - Remodeling - New Build | Serving Jefferson & Southeast WI",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Add your Google Search Console verification code here when ready
  // verification: {
  //   google: 'your-verification-code',
  // },
};

// Local Business Schema - tells Google who you are, where you are, what you do
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "name": "Klein Plumbing, LLC",
  "image": "https://klein-plumbing.com/og-image.png",
  "logo": "https://klein-plumbing.com/og-image.png",
  "@id": "https://klein-plumbing.com",
  "url": "https://klein-plumbing.com",
  "telephone": "+1-920-728-3034",
  "email": "Service@klein.plumbing",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
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
    { "@type": "City", "name": "Jefferson", "addressRegion": "WI" },
    { "@type": "City", "name": "Fort Atkinson", "addressRegion": "WI" },
    { "@type": "City", "name": "Watertown", "addressRegion": "WI" },
    { "@type": "City", "name": "Johnson Creek", "addressRegion": "WI" },
    { "@type": "City", "name": "Lake Mills", "addressRegion": "WI" },
    { "@type": "City", "name": "Cambridge", "addressRegion": "WI" },
    { "@type": "City", "name": "Sullivan", "addressRegion": "WI" },
    { "@type": "City", "name": "Helenville", "addressRegion": "WI" }
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
    "Plumbing Remodeling",
    "New Construction Plumbing"
  ],
  "slogan": "Your trusted, family-owned plumbing experts serving Jefferson and Southeast Wisconsin. Quality work, fair prices.",
  "paymentAccepted": "Cash, Check, Credit Card, Debit Card"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Override theme color for light/dark mode */}
        <meta name="theme-color" content="#333333" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#333333" media="(prefers-color-scheme: dark)" />
        
        {/* Local Business Structured Data - Critical for Local SEO */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={montserrat.className}>
        <Navbar />
        <StoryblokProvider>
          {children}
        </StoryblokProvider>
        <Footer />
      </body>
    </html>
  );
}
