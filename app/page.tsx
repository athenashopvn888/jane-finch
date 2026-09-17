import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import {
  HOME_FAQS,
  SITE_ORIGIN,
  faqPageJsonLd,
  jsonLdScript,
} from "./lib/jfcLocal";

const title = "Jane–Finch / Black Creek Walk-In Dispensary | Jane Finch Cannabis";
const description =
  "Walk in at Jane Finch Cannabis, 2728 Jane St in the Jane–Finch / Black Creek neighbourhood. Open 24 hours. Adults 19+. Call +1 (437) 524-9336.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: SITE_ORIGIN },
  openGraph: {
    url: SITE_ORIGIN,
    title,
    description,
  },
  twitter: {
    title,
    description,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(HOME_FAQS)) }}
      />
      <HomePageClient />
    </>
  );
}