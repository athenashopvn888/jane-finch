import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import AgeGate from "./components/AgeGate";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.janefinchcannabis.ca"),
  title: {
    default: "24 Hour North York Dispensary | Jane Finch Cannabis",
    template: "%s | Jane Finch Cannabis",
  },
  description:
    "Jane Finch Cannabis is a North York dispensary on Jane St with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
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
    "weed store North York",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.janefinchcannabis.ca",
    siteName: "Jane Finch Cannabis",
    title: "24 Hour North York Dispensary | Jane Finch Cannabis",
    description:
      "Jane Finch Cannabis is a North York dispensary on Jane St with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
    images: [
      {
        url: "https://www.janefinchcannabis.ca/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "Jane Finch Cannabis - Premium Cannabis Dispensary North York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "24 Hour North York Dispensary | Jane Finch Cannabis",
    description: "Jane Finch Cannabis is a North York dispensary on Jane St with flower, pre-rolls, vapes, edibles, concentrates, accessories, and adult 19+ info. Open 24 Hours.",
    images: ["https://www.janefinchcannabis.ca/wp-content/uploads/2026/04/46Oi5.jpg"],
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
    canonical: "https://www.janefinchcannabis.ca",
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
  "@id": "https://www.janefinchcannabis.ca",
  name: "Jane Finch Cannabis",
  description: "Cannabis dispensary at 2728 Jane St in North York, ON. Shop exotic, premium, AAA+, AA, and budget flower tiers plus edibles, prerolls, and vapes. Open 24 Hours.",
  url: "https://www.janefinchcannabis.ca",
  telephone: "+14375249336",
  image: "https://www.janefinchcannabis.ca/wp-content/uploads/2026/04/7Clmh.jpg",
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
    latitude: 43.7432147,
    longitude: -79.5144564,
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
        <Link className="deliveryAnnouncement" href="/delivery">
          NEW DELIVERY MENU IS HERE — CLICK TO EXPLORE
        </Link>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
