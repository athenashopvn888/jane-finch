import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import {
  cannabisStoreJsonLd,
  jsonLdScript,
  websiteJsonLd,
} from "./lib/jfcLocal";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.janefinchcannabis.ca"),
  title: {
    default: "Jane–Finch / Black Creek Walk-In Dispensary | Jane Finch Cannabis",
    template: "%s | Jane Finch Cannabis",
  },
  description:
    "Jane Finch Cannabis is the Jane–Finch / Black Creek walk-in dispensary at 2728 Jane St, North York. Open 24 hours. Adults 19+. Call +1 (437) 524-9336.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://www.janefinchcannabis.ca",
    siteName: "Jane Finch Cannabis",
    title: "Jane–Finch / Black Creek Walk-In Dispensary | Jane Finch Cannabis",
    description:
      "Jane Finch Cannabis is the Jane–Finch / Black Creek walk-in dispensary at 2728 Jane St, North York. Open 24 hours. Adults 19+. Call +1 (437) 524-9336.",
    images: [
      {
        url: "https://www.janefinchcannabis.ca/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "Jane Finch Cannabis — Jane–Finch / Black Creek dispensary at 2728 Jane St",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jane–Finch / Black Creek Walk-In Dispensary | Jane Finch Cannabis",
    description: "Jane Finch Cannabis is the Jane–Finch / Black Creek walk-in dispensary at 2728 Jane St, North York. Open 24 hours. Adults 19+. Call +1 (437) 524-9336.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Jane–Finch / Black Creek, North York" />
        <meta name="geo.position" content="43.7432199;-79.5144264" />
        <meta name="ICBM" content="43.7432199, -79.5144264" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(cannabisStoreJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd) }}
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
