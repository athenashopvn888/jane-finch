import type { Metadata } from "next";
import ResourceView from "./ResourceView";
import { getResourcePageByRoute, resourceCanonical } from "./resourceData";

const page = getResourcePageByRoute("/resources");

export function generateMetadata(): Metadata {
  if (!page) return {};
  return {
    title: { absolute: page.seoTitle },
    description: page.metaDescription,
    alternates: { canonical: resourceCanonical(page) },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: resourceCanonical(page),
      type: "website",
    },
  };
}

export default function ResourcesPage() {
  if (!page) return null;
  return <ResourceView page={page} />;
}
