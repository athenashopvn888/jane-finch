import type { Metadata } from "next";
import HomePage from "./HomePage";
import { faqJsonLd, HOME_FAQS, HOME_SEO_DESCRIPTION, HOME_SEO_TITLE, SITE_ORIGIN } from "./lib/nap";

export const metadata: Metadata = {
  title: { absolute: HOME_SEO_TITLE },
  description: HOME_SEO_DESCRIPTION,
  alternates: {
    canonical: SITE_ORIGIN,
  },
  openGraph: {
    title: HOME_SEO_TITLE,
    description: HOME_SEO_DESCRIPTION,
    url: SITE_ORIGIN,
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(HOME_FAQS)) }}
      />
      <HomePage />
    </>
  );
}
