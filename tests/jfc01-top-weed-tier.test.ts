import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  BOGO_BUY_2_GET_1,
  BOGO_BUY_3_GET_3,
  formatAsLowAsAfterPromos,
  formatPayEquals,
  formatPerGram,
  formatSitewideBogoStrip,
} from "../app/lib/flowerDeals.ts";

const read = (relativePath: string) => fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");

test("Dual-Frame deal totals and floors match the approved board", () => {
  assert.equal(formatPayEquals(20, 3), "Pay $20 = 3g");
  assert.equal(formatPayEquals(30, 6), "Pay $30 = 6g");
  assert.equal(formatPayEquals(30, 3), "Pay $30 = 3g");
  assert.equal(formatPayEquals(45, 6), "Pay $45 = 6g");
  assert.equal(formatPayEquals(40, 3), "Pay $40 = 3g");
  assert.equal(formatPayEquals(60, 6), "Pay $60 = 6g");
  assert.equal(formatAsLowAsAfterPromos(30, 6), "As low as $5/g after promos");
  assert.equal(formatAsLowAsAfterPromos(45, 6), "As low as $7.50/g after promos");
  assert.equal(formatAsLowAsAfterPromos(60, 6), "As low as $10/g after promos");
  assert.equal(formatPerGram(20, 3), "~$6.67/g");
  assert.equal(BOGO_BUY_2_GET_1, "Buy 2g Get 1g FREE");
  assert.equal(BOGO_BUY_3_GET_3, "Buy 3g Get 3g FREE");
});

test("tier config limits BOGO to Exotic, Premium, and AAA+", () => {
  const products = read("app/lib/products.ts");
  for (const fragment of [
    'price: 40, grams: 3, equals: "2g=3g"', 'price: 60, grams: 6, equals: "3g=6g"',
    'price: 30, grams: 3, equals: "2g=3g"', 'price: 45, grams: 6, equals: "3g=6g"',
    'price: 20, grams: 3, equals: "2g=3g"', 'price: 30, grams: 6, equals: "3g=6g"',
  ]) assert.ok(products.includes(fragment), fragment);
  const aaBlock = products.match(/AA: \{[\s\S]*?\n  \},/u)?.[0] ?? "";
  assert.match(aaBlock, /deal3g: null/);
  assert.match(aaBlock, /deal6g: null/);
});

test("sitewide strip and JFC01 homepage stack match scope", () => {
  assert.equal(formatSitewideBogoStrip(), "TOP WEED TIER SPECIAL · Buy 2g Get 1g FREE  Buy 3g Get 3g FREE *");
  const banner = read("app/components/FleetAnnouncementBanner.tsx");
  const sequence = ["data-thanksgiving-hours-notice", "<FlowerBogoStrip hero", "data-exotic-tier-banner", "data-cigarette-deal", "data-bb-light-deal", "data-cig-mix-banner", "data-bb-premium-banner"];
  let cursor = -1;
  for (const item of sequence) { const next = banner.indexOf(item); assert.ok(next > cursor, item); cursor = next; }
  assert.match(banner, /top-weed-tier-jfc01\.webp/);
  assert.match(banner, /native-cigarette-offer-20260822\.webp/);
  assert.match(banner, /EXCLUSIVE SPECIAL PREMIUM GRADE BB FULL, BB LIGHT &amp; BELMONT KING SIZE!/);
  assert.match(banner, /BB_Belmont_Premium_Grade\.webp/);
  assert.match(banner, /Jane Finch Cannabis/);
  for (const file of ["public/banners/top-weed-tier-jfc01.webp", "public/banners/native-cigarette-offer-20260822.webp", "public/banners/BB_Belmont_Premium_Grade.webp"]) {
    assert.ok(fs.statSync(file).size > 1000, file);
  }
});

test("mobile strip is one red bar and protected surfaces stay unchanged", () => {
  const css = read("app/globals.css");
  assert.match(css, /\[data-flower-bogo-strip\][\s\S]*background: #c5161d/);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*\[data-bogo-strip-copy\][\s\S]*flex-direction: column/);
  assert.match(read("app/components/Navbar.tsx"), /pathname !== "\/" \? <FlowerBogoStrip \/>/);
  assert.doesNotMatch(read("app/tv/page.tsx"), /FlowerBogoStrip|top-weed-tier-jfc01/);
  assert.doesNotMatch(read("app/delivery/DeliveryCatalog.tsx"), /FlowerBogoStrip|top-weed-tier-jfc01/);
});
