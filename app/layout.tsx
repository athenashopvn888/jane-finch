import CigaretteStateProvider from "./components/CigaretteStateProvider";
import FleetContentProvider from "./components/fleet/FleetContentProvider";
import FullNameNap from "./components/FullNameNap";
import PinnedNavClearance from "./components/PinnedNavClearance";
import { getCigaretteSnapshot, toPublicCigaretteState } from "./lib/cigaretteFeed";
import { SHOW_CIGARETTES } from "./lib/siteConfig";
import type { Metadata } from "next";
import "./globals.css";
import StoreHoursBar from "./components/StoreHoursBar";
import { getFleetContent } from "./lib/fleetContent";
import type { Nap } from "./lib/fleet/types";
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

const ROOT_METADATA: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  const description = fleet.active ? fleet.pages.Home?.metaDescription : "";
  if (!description || description === ROOT_METADATA.description) return ROOT_METADATA;
  return {
    ...ROOT_METADATA,
    description,
    openGraph: { ...ROOT_METADATA.openGraph, description },
    twitter: { ...ROOT_METADATA.twitter, description },
  };
}

function storeJsonLdWithNap(nap: Nap) {
  const next = { ...storeJsonLd };
  let changed = false;
  if (nap.schemaName !== storeJsonLd.name) {
    next.name = nap.schemaName;
    changed = true;
  }
  if (nap.name !== STORE_NAME) {
    next.alternateName = nap.name;
    changed = true;
  }
  if (nap.phoneTel !== PHONE_INTL) {
    next.telephone = nap.phoneTel;
    changed = true;
  }
  if (nap.website !== SITE_ORIGIN) {
    next.url = nap.website;
    changed = true;
  }
  if (nap.street !== STREET_ADDRESS || nap.city !== CITY || nap.province !== REGION || nap.postalCode !== POSTAL_CODE) {
    next.address = {
      ...storeJsonLd.address,
      streetAddress: nap.street,
      addressLocality: nap.city,
      addressRegion: nap.province,
      postalCode: nap.postalCode,
    };
    changed = true;
  }
  if (nap.lat !== String(LATITUDE) || nap.lng !== String(LONGITUDE)) {
    next.geo = { "@type": "GeoCoordinates", latitude: Number(nap.lat), longitude: Number(nap.lng) };
    changed = true;
  }
  return changed ? next : storeJsonLd;
}

/* ── JSON-LD Structured Data ── */
const storeId = `${SITE_ORIGIN}/#store`;
const websiteId = `${SITE_ORIGIN}/#website`;

const storeJsonLd = {
  "@context": "https://schema.org",
  "@type": "CannabisStore",
  "@id": storeId,
  name: "Jane Finch Cannabis Dispensary Weed Delivery",
  alternateName: STORE_NAME,
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
      closes: "23:59",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [fleet, cigaretteSnapshot] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  const cigarettes = toPublicCigaretteState(cigaretteSnapshot);
  const jsonLd = fleet.active ? storeJsonLdWithNap(fleet.nap) : storeJsonLd;
  return (
    <html lang="en">
      <head>
        <meta name="fleet-content-version" content={fleet.version} />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
        <FleetContentProvider value={{ active: fleet.active, version: fleet.version, nap: fleet.nap }}>
          <CigaretteStateProvider value={{ ...cigarettes, web: SHOW_CIGARETTES ? cigarettes.web : false }}>
            <StoreHoursBar />
            {children}
            <FullNameNap />
            <PinnedNavClearance />
          </CigaretteStateProvider>
        </FleetContentProvider>
      </body>
    </html>
  );
}
