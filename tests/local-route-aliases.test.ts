import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import nextConfig from "../next.config.ts";
import { SEO_PAGES } from "../app/lib/seoPages.ts";

const ALIAS_REDIRECTS = [
  ["york-weed-dispensary", "north-york-weed-dispensary"],
  ["cheap-weed-york", "cheap-weed-north-york"],
  ["native-cigarettes-york", "native-cigarettes-north-york"],
  ["weed-store-near-brampton", "weed-store-near-jane-and-finch-north-york"],
  ["weed-store-near-mississauga", "weed-store-near-jane-and-finch-north-york"],
  ["dispensary-near-me-york", "dispensary-near-me-north-york"],
] as const;

test("legacy aliases are excluded while canonical North York pages remain discoverable", async () => {
  const slugs = new Set(SEO_PAGES.map((page) => page.slug));
  for (const [source, destination] of ALIAS_REDIRECTS) {
    assert.equal(slugs.has(source), false, `${source} must not be generated or included in the sitemap`);
    assert.equal(slugs.has(destination), true, `${destination} must remain generated and discoverable`);
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
        redirect.source === `/info/${source}` &&
        redirect.destination === `/info/${destination}` &&
        redirect.permanent === true
      ),
      `${source} must permanently redirect to ${destination}`,
    );
  }
});

