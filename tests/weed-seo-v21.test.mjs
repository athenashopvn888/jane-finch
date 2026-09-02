import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");
const products = read("app/lib/products.ts");
const tierPage = read("app/[tier]/page.tsx");
const tierCopy = read("app/lib/tierSeoContent.ts");
const navbar = read("app/components/Navbar.tsx");
const footer = read("app/components/Footer.tsx");
const home = read("app/page.tsx");
const resources = read("app/resources/resourceData.ts");
const categoryPage = read("app/items/[category]/page.tsx");
const sitemap = read("app/sitemap.ts");
const redirects = read("next.config.ts");

const tiers = [
  ["Exotic Weed", "exotic-weed", "exotic"],
  ["Premium Weed", "premium-weed", "premium"],
  ["AAA+ Weed", "aaa-weed", "aaa"],
  ["AA Weed", "aa-weed", "aa"],
  ["Budget Weed", "budget-weed", "budget"],
];

test("all five tier owners use Tier Name plus Weed and weed-bearing canonicals", () => {
  for (const [name, slug, legacy] of tiers) {
    assert.ok(products.includes(`name: "${name}"`), `${name} config missing`);
    assert.ok(products.includes(`slug: "${slug}"`), `${slug} config missing`);
    assert.ok(navbar.includes(`href: "/${slug}", label: "${name}"`), `${name} nav missing`);
    assert.ok(footer.includes(`href="/${slug}">${name}<`), `${name} footer link missing`);
    assert.ok(redirects.includes(`source: "/${legacy}", destination: "/${slug}", permanent: true`), `${legacy} redirect missing`);
  }
  assert.match(tierPage, /https:\/\/www\.janefinchcannabis\.ca\/\$\{tierSlug\}/);
  assert.match(tierCopy, /createTierSeo\("EXOTIC", "Exotic Weed"\)/);
});

test("direct tier-support resources use one canonical weed-bearing route family", () => {
  const canonicalRoutes = [
    "/resources/weed-flower-guides",
    "/resources/weed-flower-guides/aa-vs-aaa-vs-premium-vs-exotic",
    "/resources/weed-flower-guides/budget-vs-premium-flower",
  ];
  for (const route of canonicalRoutes) assert.ok(resources.includes(`route: "${route}"`), `${route} missing`);
  assert.doesNotMatch(resources, /route: "\/resources\/flower-guides/);
  assert.match(resources, /Jane Finch Cannabis Weed & Flower Guides/);
  assert.match(sitemap, /RESOURCE_PAGES\.map/);
});

test("nicotine and THC terminology stay separate without moving routes", () => {
  assert.match(products, /"VAPE PENS":[\s\S]*?name: "Nicotine Vape", slug: "vapes"/);
  assert.match(products, /"VAPE DISPOSABLE":[\s\S]*?name: "THC Vape", slug: "vape-disposables"/);
  assert.match(products, /Nicotine products are for adults 19\+/);
  assert.match(navbar, /href: "\/items\/vapes", label: "Nicotine Vape"/);
  assert.match(navbar, /href: "\/items\/vape-disposables", label: "THC Vape"/);
  assert.match(categoryPage, /catInfo\.key === "VAPE PENS" \|\| catInfo\.key === "VAPE DISPOSABLE"/);
  assert.match(categoryPage, /<h1 className=\{styles\.heroTitle\}>/);
});

test("delivery remains on its held legacy route", () => {
  assert.match(navbar, /href="\/delivery"/);
  assert.match(home, /href="\/delivery"/);
  assert.match(sitemap, /\$\{BASE\}\/delivery/);
  assert.doesNotMatch(redirects, /weed-delivery-north-york/);
});

test("campaign copy has no reversed tier phrases", () => {
  const campaign = [products, tierPage, tierCopy, navbar, footer, home, resources].join("\n");
  assert.doesNotMatch(campaign, /\bWeed (?:Exotic|Premium|AAA\+?|AA|Budget)\b/i);
});
