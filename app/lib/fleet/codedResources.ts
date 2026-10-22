import { RESOURCE_PAGES, type ResourcePage } from "../../resources/resourceData.ts";

/** Coded /resources slugs. A fleet article with any of these slugs is omitted. */
export function codedResourceSlugSet(pages: readonly { route: string }[] = RESOURCE_PAGES): Set<string> {
  const slugs = new Set<string>();
  for (const page of pages) {
    const rel = page.route.replace(/^\/resources\/?/, "").replace(/\/$/, "");
    if (!rel) continue;
    slugs.add(rel);
    const leaf = rel.split("/").filter(Boolean).pop();
    if (leaf) slugs.add(leaf);
  }
  return slugs;
}

export function codedArticleLinks(pages: readonly ResourcePage[] = RESOURCE_PAGES) {
  return pages
    .filter((page) => page.route.startsWith("/resources/") && page.route !== "/resources")
    .map((page) => ({
      slug: page.route.replace(/^\/resources\//, ""),
      title: page.h1,
      href: page.route,
    }));
}
