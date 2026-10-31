import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ResourceView from "../ResourceView";
import { getResourcePageBySlugParts, getResourceStaticParams, resourceCanonical } from "../resourceData";

type ResourceRouteProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getResourceStaticParams();
}

export async function generateMetadata({ params }: ResourceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getResourcePageBySlugParts(slug);
  if (!page) return {};
  const metadata: Metadata = {
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    alternates: { canonical: resourceCanonical(page) },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: resourceCanonical(page),
      type: page.kind === "article" || page.kind === "update" ? "article" : "website",
    },
  };
  if (
    page.route === "/resources/how-to-read-a-cannabis-label" ||
    page.route === "/resources/thcv-cbg-cbn-minor-cannabinoids-label"
  ) {
    metadata.robots = { index: true, follow: true };
  }
  return metadata;
}

export default async function ResourceRoute({ params }: ResourceRouteProps) {
  const { slug } = await params;
  const page = getResourcePageBySlugParts(slug);
  if (!page) notFound();
  return <ResourceView page={page} />;
}
