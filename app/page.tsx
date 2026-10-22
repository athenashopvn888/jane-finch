import { HOME_DOC_TITLE } from "./lib/homeDelivery";
import type { Metadata } from "next";
import HomePage from "./HomePage";
import { CODED_BANNERS } from "./lib/fleet/config";
import { getFleetContent } from "./lib/fleetContent";
import { getLiveMenu } from "./lib/liveMenu";
import { faqJsonLd, HOME_FAQS, HOME_SEO_DESCRIPTION, SITE_ORIGIN } from "./lib/nap";

const HOME_METADATA: Metadata = {
  title: { absolute: HOME_DOC_TITLE },
  description: HOME_SEO_DESCRIPTION,
  alternates: {
    canonical: SITE_ORIGIN,
  },
  openGraph: {
    title: HOME_DOC_TITLE,
    description: HOME_SEO_DESCRIPTION,
    url: SITE_ORIGIN,
  },

  twitter: { card: "summary_large_image", title: HOME_DOC_TITLE },
};

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  const description = fleet.active ? fleet.pages.Home?.metaDescription : "";
  if (!description || description === HOME_SEO_DESCRIPTION) return HOME_METADATA;
  return {
    ...HOME_METADATA,
    description,
    openGraph: { ...HOME_METADATA.openGraph, description },
    twitter: { ...HOME_METADATA.twitter, description },
  };
}

export const dynamic = "force-dynamic";

export default async function Page() {
  const [{ flowers }, fleet] = await Promise.all([getLiveMenu(), getFleetContent()]);
  const contentBanners = fleet.active && fleet.banners.some((banner, index) => banner !== CODED_BANNERS[index])
    ? fleet.banners
    : undefined;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(HOME_FAQS)) }}
      />
      <HomePage initialFlowers={flowers} contentBanners={contentBanners} />
    </>
  );
}
