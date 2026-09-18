import { Metadata } from "next";
import { GBPLandingPage } from "@/app/components/GBPLandingPage";
import { weedOwner } from "@/app/lib/weedDiscovery";
import { faqJsonLd, SITE_ORIGIN } from "@/app/lib/nap";

export const metadata: Metadata = {
  title: { absolute: weedOwner.seoTitle },
  description: weedOwner.metaDescription,
  alternates: {
    canonical: `${SITE_ORIGIN}${weedOwner.ownerPath}`,
  },
  openGraph: {
    title: weedOwner.seoTitle,
    description: weedOwner.metaDescription,
    url: `${SITE_ORIGIN}${weedOwner.ownerPath}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(weedOwner.faq)) }}
      />
      <GBPLandingPage />
    </>
  );
}
