import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("JFC01 authority resource matches the approved packet and link contract", async () => {
  const [data, view, sitemap] = await Promise.all([
    read("app/resources/resourceData.ts"),
    read("app/resources/ResourceView.tsx"),
    read("app/sitemap.ts"),
  ]);

  for (const exact of [
    'route: "/resources/cannabis-dispensary-vs-weed-dispensary"',
    'seoTitle: "Dispensary vs Weed Dispensary | Jane Finch Cannabis North York"',
    'metaDescription: "What is the difference between a cannabis dispensary and weed dispensary? Jane Finch Cannabis explains the language behind local dispensary searches in North York."',
    'h1: "Dispensary, Cannabis Dispensary or Weed Dispensary: Understanding the Search"',
    'question: "Is a weed dispensary different from a cannabis dispensary?"',
    'question: "Should every keyword variation have a separate page?"',
    'menuLink("Open the Jane Finch Cannabis local store page", STORE_ROUTE',
  ]) assert.ok(data.includes(exact), exact);

  assert.equal((data.match(/\/resources\/cannabis-dispensary-vs-weed-dispensary/g) || []).length, 2);
  assert.ok(view.includes("Frequently Asked Questions"));
  assert.ok(view.includes("<h3 className={styles.bodyHeading}>{faq.question}</h3>"));
  assert.ok(view.includes('"@type": "FAQPage"'));
  assert.ok(sitemap.includes("RESOURCE_PAGES.map"));
});
