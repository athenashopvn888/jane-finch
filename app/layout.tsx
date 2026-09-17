import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import {
  CITY,
  COUNTRY,
  HOME_SEO_DESCRIPTION,
  HOME_SEO_TITLE,
  LATITUDE,
  LONGITUDE,
  MAPS_CID_URL,
  PHONE_INTL,
  POSTAL_CODE,
  REGION,
  SITE_ORIGIN,
  STORE_NAME,
  STREET_ADDRESS,
} from "./lib/nap";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: HOME_SEO_TITLE,
    template: "%s | Jane Finch Cannabis",
  },
  description: HOME_SEO_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_ORIGIN,
    siteName: STORE_NAME,
    title: HOME_SEO_TITLE,
    description: HOME_SEO_DESCRIPTION,
    images: [
      {
        url: `${SITE_ORIGIN}/wp-content/uploads/2026/04/46Oi5.jpg`,
        width: 1200,
        height: 630,
        alt: "Jane Finch Cannabis - 24 hour weed dispensary near Jane Finch, North York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SEO_TITLE,
    description: HOME_SEO_DESCRIPTION,
    images: [`${SITE_ORIGIN}/wp-content/uploads/2026/04/46Oi5.jpg`],
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
    canonical: SITE_ORIGIN,
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

/* ── JSON-LD Structured Data ── */
const storeId = `${SITE_ORIGIN}/#store`;
const websiteId = `${SITE_ORIGIN}/#website`;

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "CannabisStore",
  "@id": storeId,
  name: STORE_NAME,
  description:
    "24 hour weed dispensary at 2728 Jane St in North York, ON (Jane St & Sheppard Ave W). Flower, pre-rolls, vapes, edibles, concentrates, and accessories. Open 24 hours, 7 days.",
  url: SITE_ORIGIN,
  telephone: PHONE_INTL,
  image: `${SITE_ORIGIN}/wp-content/uploads/2026/04/7Clmh.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: STREET_ADDRESS,
    addressLocality: CITY,
    addressRegion: REGION,
    postalCode: POSTAL_CODE,
    addressCountry: COUNTRY,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: LATITUDE,
    longitude: LONGITUDE,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "24:00",
    },
  ],
  areaServed: {
    "@type": "City",
    name: CITY,
  },
  sameAs: [MAPS_CID_URL],
  hasMap: MAPS_CID_URL,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  name: STORE_NAME,
  url: SITE_ORIGIN,
  publisher: { "@id": storeId },
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
        <meta name="geo.placename" content={CITY} />
        <meta name="geo.position" content={`${LATITUDE};${LONGITUDE}`} />
        <meta name="ICBM" content={`${LATITUDE}, ${LONGITUDE}`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
        <div className="deliveryAnnouncement" role="status" aria-label="Store hours">
          OPEN 24 HOURS
        </div>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}
