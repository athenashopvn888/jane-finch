import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const content = JSON.parse(fs.readFileSync(new URL("../app/resources/pinkyResourceContent.json", import.meta.url), "utf8"));
const tiers = JSON.parse(fs.readFileSync(new URL("../app/lib/pinkyTierAdditions.json", import.meta.url), "utf8"));
const source = fs.readFileSync(new URL("../app/resources/resourceData.ts", import.meta.url), "utf8");
const tierPage = fs.readFileSync(new URL("../app/[tier]/page.tsx", import.meta.url), "utf8");

const expectedNew = [
  "/resources/weed-flower-guides/what-does-good-weed-mean",
  "/resources/weed-flower-guides/thc-vs-weed-quality",
  "/resources/weed-flower-guides/bag-appeal",
  "/resources/weed-flower-guides/trichomes-frosty-weed",
  "/resources/weed-flower-guides/terpenes-gas-loud-aroma",
  "/resources/weed-flower-guides/drying-curing-freshness",
  "/resources/weed-flower-guides/smalls-vs-big-buds",
  "/resources/weed-flower-guides/bc-grown-indoor-hydro-outdoor",
  "/resources/weed-flower-guides/craft-vs-commercial-cannabis",
  "/resources/cannabis-101/indica-sativa-hybrid",
  "/resources/cannabis-101/strain-vs-cultivar",
  "/resources/cannabis-101/landrace-vs-hybrid",
  "/resources/cannabis-101/weed-slang-glossary",
];

test("PINKY packet maps to exactly 13 NEW and six EXPAND surfaces", () => {
  assert.equal(content.pages.filter((page) => page.action === "NEW").length, 13);
  assert.equal(content.pages.filter((page) => page.action === "EXPAND").length, 6);
  assert.deepEqual(content.pages.filter((page) => page.action === "NEW").map((page) => page.route), expectedNew);
});

test("new pages use first-publish date while expansions preserve original publication dates", () => {
  for (const page of content.pages.filter((entry) => entry.action === "NEW")) {
    assert.equal(page.datePublished, "2026-09-06");
    assert.equal(page.dateModified, "2026-09-06");
  }
  for (const page of content.pages.filter((entry) => entry.action === "EXPAND")) {
    assert.equal(page.datePublished, undefined);
    assert.equal(page.dateModified, "2026-09-06");
  }
  assert.match(source, /datePublished: seed\.datePublished \|\| PUBLISHED/);
});

test("all changed resources have metadata, body, visible FAQ data and exact internal links", () => {
  for (const page of content.pages) {
    assert.ok(page.h1 && page.seoTitle && page.metaDescription && page.body);
    assert.equal(page.faqs.length, 5, page.route);
    assert.ok(page.commercialLinks.length >= 3, page.route);
  }
});

test("all five protected Weed tier owners receive only additive education", () => {
  assert.deepEqual(Object.keys(tiers), ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"]);
  for (const addition of Object.values(tiers)) assert.ok(addition.rows.length >= 3);
  assert.match(tierPage, /s\.links\?\.length/);
});

test("protected Weed route labels remain unchanged", () => {
  for (const [label, route] of [
    ["Exotic Weed", "/exotic-weed"],
    ["Premium Weed", "/premium-weed"],
    ["AAA+ Weed", "/aaa-weed"],
    ["AA Weed", "/aa-weed"],
    ["Budget Weed", "/budget-weed"],
  ]) {
    assert.match(source, new RegExp(`"${route.replaceAll("/", "\\/")}": "${label.replace("+", "\\+")}"`));
  }
});

test("generated public content contains no raw Markdown rule leakage", () => {
  const publicText = JSON.stringify({ content, tiers });
  assert.doesNotMatch(publicText, /(^|\\n)---($|\\n)/);
});
