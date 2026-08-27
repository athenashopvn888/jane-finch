import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { SEO_PAGES } from "../app/lib/seoPages.ts";

const page = SEO_PAGES.find((entry) => entry.slug === "nicotine-vapes-north-york");
const slugs = ["geek-promax-5-30k-puffs","geek-universe-25k-puffs","level-x-g2-pod","nexa-pix-30k-puffs-many-flavors","ovns-10000-5-10k-puffs","ovns-disposable-5-8ml-many-flavors"];

test("Jane Finch nicotine page uses the six verified VAPE PENS products", () => {
  assert.ok(page?.heroPreview);
  assert.deepEqual(page.heroPreview.products.map((product) => product.sourceSlug), slugs);
  assert.equal(page.heroPreview.menuHref, "/items/vapes");
  assert.equal(page.heroPreview.secondaryHref, "#featured-vapes");
  assert.equal(page.heroPreview.warning, "Adults 19+. Nicotine is addictive.");
  assert.match(page.sections[2].body, /\/items\/vape-disposables/);
});

test("Jane Finch nicotine discovery uses the served www canonical host", () => {
  const infoPageSource = readFileSync(new URL("../app/info/[seoPage]/page.tsx", import.meta.url), "utf8");
  const sitemapSource = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const footerSource = readFileSync(new URL("../app/components/Footer.tsx", import.meta.url), "utf8");

  assert.match(infoPageSource, /slug === "nicotine-vapes-north-york"[\s\S]*"https:\/\/www\.janefinchcannabis\.ca"/);
  assert.match(sitemapSource, /const BASE = "https:\/\/www\.janefinchcannabis\.ca"/);
  assert.ok(footerSource.includes('href="/info/nicotine-vapes-north-york"'));
});
