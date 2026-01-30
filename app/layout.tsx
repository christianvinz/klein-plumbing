import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StoryblokProvider from "../components/StoryblokProvider";
import { Analytics } from "@vercel/analytics/react";
import { Montserrat, Oswald } from "next/font/google";
import Image from "next/image";

// 1. Font Configurations
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-oswald",
  display: "swap",
});

// 2. Metadata & Viewport
const CANONICAL = "https://klein.plumbing";

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL),
  title: {
    default:
      "Klein Plumbing, LLC | Licensed Plumber in Jefferson & Southeast Wisconsin",
    template: "%s | Klein Plumbing",
  },
  description:
    "Family-owned plumbing services in Jefferson, Fort Atkinson, Watertown, and Southeast Wisconsin. Repairs, remodeling, and new build. Licensed, trusted plumber. Call 920-728-3034.",
  keywords: [
    "plumber Jefferson WI",
    "plumbing Southeast Wisconsin",
    "Klein Plumbing",
    "emergency plumber",
    "water heater services",
    "drain cleaning",
    "Fort Atkinson plumber",
    "Watertown plumber",
    "plumbing repairs",
    "plumbing remodeling",
  ],
  authors: [{ name: "Klein Plumbing, LLC" }],
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CANONICAL,
    siteName: "Klein Plumbing, LLC",
    title: "Klein Plumbing | Repairs - Remodeling - New Build",
    description:
      "Trusted, family-owned plumbing experts serving Jefferson and Southeast Wisconsin.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Klein Plumbing Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klein Plumbing | Southeast Wisconsin Plumber",
    description:
      "Repairs - Remodeling - New Build | Serving Jefferson & Southeast WI",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#333333",
};

// 3. Main Layout Component
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: "Klein Plumbing, LLC",
    image: `${CANONICAL}/og-image.png`,
    logo: `${CANONICAL}/og-image.png`,
    "@id": CANONICAL,
    url: CANONICAL,
    telephone: "+1-920-728-3034",
    email: "service@klein.plumbing",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jefferson",
      addressRegion: "WI",
      postalCode: "53549",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.0058,
      longitude: -88.8073,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Jefferson" },
      { "@type": "City", name: "Fort Atkinson" },
      { "@type": "City", name: "Watertown" },
      { "@type": "City", name: "Johnson Creek" },
      { "@type": "City", name: "Lake Mills" },
      { "@type": "City", name: "Cambridge" },
      { "@type": "City", name: "Sullivan" },
      { "@type": "City", name: "Helenville" },
    ],
    serviceType: [
      "Emergency Plumbing",
      "Drain Cleaning",
      "Water Heater Services",
      "Plumbing Remodeling",
      "New Construction Plumbing",
    ],
    paymentAccepted: "Cash, Check, Credit Card, Debit Card",
  };

  return (
    <html lang="en" className={`${montserrat.variable} ${oswald.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>

      <body className="relative min-h-screen bg-slate-50 text-(--brand) antialiased font-sans">
        {/* FIXED GLASS LAYER */}
        <div className="glass-layer fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <Image
            src="/og-image.png"
            alt=""
            width={1200}
            height={1200}
            priority
            className="w-full max-w-5xl opacity-[0.03] animate-slow-float mix-blend-multiply"
          />
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10 min-h-screen flex flex-col bg-transparent">
          <Navbar />

          <main className="grow bg-transparent pt-(--nav-h) md:pt-(--nav-h-md)">
            <StoryblokProvider>{children}</StoryblokProvider>
          </main>

          <Analytics />
          <Footer />
        </div>
      </body>
    </html>
  );
}
