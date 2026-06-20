import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://janefinchcannabis.ca"),
  title: {
    default: "Jane Finch Cannabis — Premium Cannabis Dispensary, North York",
    template: "%s | Jane Finch Cannabis",
  },
  description:
    "Shop 200+ premium cannabis strains at Jane Finch Cannabis. Exotic, Premium, AAA+, AA & Budget flower from $3/g. North York's uplifting dispensary at 2728 Jane St. Open 24 Hours.",
  keywords: [
    "cannabis dispensary North York",
    "weed store North York",
    "exotic flower North York",
    "premium cannabis",
    "Jane Finch Cannabis",
    "cheap weed North York",
    "dispensary near me",
    "THC flower",
    "indica sativa hybrid",
    "edibles North York",
    "vapes",
    "pre-rolls",
    "native cigarettes North York",
    "weed store Mississauga",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://janefinchcannabis.ca",
    siteName: "Jane Finch Cannabis",
    title: "Jane Finch Cannabis — Premium North York Cannabis Dispensary",
    description:
      "200+ strains from $3/g. Exotic to Budget. North York's uplifting dispensary at 2728 Jane St. Open 24 Hours.",
    images: [
      {
        url: "https://janefinchcannabis.ca/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "Jane Finch Cannabis — Premium Cannabis Dispensary North York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jane Finch Cannabis — North York's Uplifting Dispensary",
    description: "200+ strains from $3/g. Open 24 Hours at 2728 Jane St, North York.",
    images: ["https://janefinchcannabis.ca/wp-content/uploads/2026/04/46Oi5.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://janefinchcannabis.ca",
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  additionalType: "https://schema.org/Store",
  "@id": "https://janefinchcannabis.ca",
  name: "Jane Finch Cannabis",
  description: "Cannabis dispensary at 2728 Jane St in North York, ON. Shop exotic, premium, AAA+, AA, and budget flower tiers plus edibles, prerolls, and vapes. Open 24 Hours.",
  url: "https://janefinchcannabis.ca",
  telephone: "+15483232728",
  image: "https://janefinchcannabis.ca/wp-content/uploads/2026/04/7Clmh.jpg",
  priceRange: "$3 - $12/g",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2728 Jane St",
    addressLocality: "North York",
    addressRegion: "ON",
    postalCode: "M3L 2G6",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7483,
    longitude: -79.5163,
  },
  openingHoursSpecification: [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  }
],
  areaServed: {
    "@type": "City",
    name: "North York",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="North York" />
        <meta name="geo.position" content="43.7483;-79.5163" />
        <meta name="ICBM" content="43.7483, -79.5163" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-51JW61RPS8"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-51JW61RPS8');
            `
          }}
        />
      </head>
      <body>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
