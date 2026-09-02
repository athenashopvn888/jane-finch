import assert from "node:assert/strict";

const base = process.argv[2] || "http://localhost:3111";
const preferred = "https://www.janefinchcannabis.ca";

const migrations = {
  "/exotic": "/exotic-weed",
  "/premium": "/premium-weed",
  "/aaa": "/aaa-weed",
  "/aa": "/aa-weed",
  "/budget": "/budget-weed",
  "/resources/flower-guides": "/resources/weed-flower-guides",
  "/resources/flower-guides/aa-vs-aaa-vs-premium-vs-exotic": "/resources/weed-flower-guides/aa-vs-aaa-vs-premium-vs-exotic",
  "/resources/flower-guides/budget-vs-premium-flower": "/resources/weed-flower-guides/budget-vs-premium-flower",
};

for (const [legacy, canonical] of Object.entries(migrations)) {
  const response = await fetch(`${base}${legacy}`, { redirect: "manual" });
  assert.equal(response.status, 308, `${legacy} must be permanent 308`);
  assert.equal(new URL(response.headers.get("location"), base).pathname, canonical, `${legacy} must redirect directly to ${canonical}`);
  const destination = await fetch(`${base}${canonical}`, { redirect: "manual" });
  assert.equal(destination.status, 200, `${canonical} must return 200 directly`);
}

const canonicalPaths = [
  "/exotic-weed",
  "/premium-weed",
  "/aaa-weed",
  "/aa-weed",
  "/budget-weed",
  "/resources/weed-flower-guides",
  "/resources/weed-flower-guides/aa-vs-aaa-vs-premium-vs-exotic",
  "/resources/weed-flower-guides/budget-vs-premium-flower",
  "/items/vapes",
  "/items/vape-disposables",
  "/weed-dispensary-north-york",
];

for (const path of canonicalPaths) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  assert.equal(response.status, 200, `${path} must return 200 directly`);
  const html = await response.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical, `${preferred}${path}`, `${path} must self-canonicalize on preferred host`);
}

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
for (const canonical of Object.values(migrations)) assert.ok(sitemap.includes(`${preferred}${canonical}`), `${canonical} missing from sitemap`);
for (const legacy of Object.keys(migrations)) assert.ok(!sitemap.includes(`<loc>${preferred}${legacy}</loc>`), `${legacy} must not remain in sitemap`);

const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/www\.janefinchcannabis\.ca([^<]*)<\/loc>/g)].map((match) => match[1] || "/");
const failures = [];
for (const path of sitemapPaths) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  if (response.status !== 200) failures.push(`${path}:${response.status}`);
}
assert.deepEqual(failures, [], `sitemap routes must return 200 directly: ${failures.join(", ")}`);

console.log(JSON.stringify({ redirects: Object.keys(migrations).length, canonicals: canonicalPaths.length, sitemapRoutes: sitemapPaths.length }));
