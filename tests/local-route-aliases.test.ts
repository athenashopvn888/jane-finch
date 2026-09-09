import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import nextConfig from "../next.config.ts";
import { SEO_PAGES } from "../app/lib/seoPages.ts";

const ALIAS_REDIRECTS = [
  ["/info/north-york-weed-dispensary", "/weed-dispensary-north-york"],
  ["/info/york-weed-dispensary", "/weed-dispensary-north-york"],
  ["/info/cheap-weed-york", "/info/cheap-weed-north-york"],
  ["/info/native-cigarettes-york", "/info/native-cigarettes-north-york"],
  ["/info/weed-store-near-jane-and-finch-north-york", "/weed-dispensary-north-york"],
  ["/info/weed-store-near-brampton", "/weed-dispensary-north-york"],
  ["/info/weed-store-near-mississauga", "/weed-dispensary-north-york"],
  ["/info/dispensary-near-me-york", "/info/dispensary-near-me-north-york"],
] as const;

test("legacy aliases are excluded while canonical North York pages remain discoverable", async () => {
  const slugs = new Set(SEO_PAGES.map((page) => page.slug));
  for (const [source, destination] of ALIAS_REDIRECTS) {
    const sourceSlug = source.replace("/info/", "");
    assert.equal(slugs.has(sourceSlug), false, `${source} must not be generated or included in the sitemap`);
    if (destination.startsWith("/info/")) {
      assert.equal(slugs.has(destination.replace("/info/", "")), true, `${destination} must remain generated and discoverable`);
    }
  }

  const sitemapSource = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  assert.match(sitemapSource, /SEO_PAGES\.map\(/, "sitemap must derive local routes from SEO_PAGES");
});

test("all six existing permanent redirects remain exact", async () => {
  assert.equal(typeof nextConfig.redirects, "function");
  const redirects = await nextConfig.redirects!();

  for (const [source, destination] of ALIAS_REDIRECTS) {
    assert.ok(
      redirects.some((redirect) =>
        redirect.source === source &&
        redirect.destination === destination &&
        redirect.permanent === true
      ),
      `${source} must permanently redirect to ${destination}`,
    );
  }
});

