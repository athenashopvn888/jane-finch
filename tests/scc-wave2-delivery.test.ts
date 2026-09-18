import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const nap = read("app/lib/nap.ts");
const page = read("app/cannabis-delivery-north-york/page.tsx");
const hub = read("app/lib/sccHub.ts");
const home = read("app/HomePage.tsx");
const visit = read("app/visit/page.tsx");
const geo = read("app/components/GBPLandingPage.tsx");
const openNow = read("app/24-hour-dispensary-north-york/page.tsx");
const footer = read("app/components/Footer.tsx");
const sitemap = read("app/sitemap.ts");
const tierPage = read("app/[tier]/page.tsx");
const deliveryMenu = read("app/delivery/page.tsx");
const thinDelivery = read("app/weed-delivery-north-york/page.tsx");
const publicFiles = [
  nap,
  page,
  hub,
  home,
  visit,
  geo,
  openNow,
  footer,
  sitemap,
  tierPage,
  thinDelivery,
  read("app/faq/page.tsx"),
  read("app/components/Navbar.tsx"),
  read("app/lib/weedDiscovery.ts"),
].join("\n");

test("Wave 2 ships /cannabis-delivery-north-york as the Jane Finch delivery owner", () => {
  assert.equal(existsSync(new URL("../app/cannabis-delivery-north-york/page.tsx", import.meta.url)), true);
  assert.match(nap, /DELIVERY_LP_PATH = "\/cannabis-delivery-north-york"/);
  assert.match(page, /DELIVERY_H1/);
  assert.match(nap, /DELIVERY_H1 = "Cannabis Delivery from Jane Finch in North York"/);
  assert.match(nap, /DELIVERY_SEO_TITLE = "Jane Finch Cannabis Delivery in North York — 10 a\.m\. to 10 p\.m\."/);
  assert.notEqual(
    nap.match(/DELIVERY_SEO_TITLE = "([^"]+)"/)?.[1],
    "Cannabis Delivery North York | Jane Finch Cannabis",
  );
  assert.match(deliveryMenu, /Cannabis Delivery North York \| Jane Finch Cannabis/);
  assert.match(page, /canonical: `\$\{SITE_ORIGIN\}\$\{DELIVERY_LP_PATH\}`/);
  assert.match(sitemap, /\$\{BASE\}\/cannabis-delivery-north-york/);
});

test("delivery LP has FAQPage, NAP, and how-to-order CTA", () => {
  assert.match(page, /faqJsonLd\(DELIVERY_FAQS\)/);
  assert.match(page, /id="how-to-order"/);
  assert.match(page, /DELIVERY_MENU_PATH/);
  assert.match(page, /Order on the delivery menu/);
  assert.match(page, /LIVE ORDER/);
  assert.match(nap, /2728 Jane St, North York, ON M3L 2G6/);
  assert.match(page, /FULL_ADDRESS/);
  assert.match(page, /PHONE_DISPLAY/);
  assert.match(page, /SITE_ORIGIN/);
  assert.match(page, /Website: janefinchcannabis\.ca/);
  assert.match(nap, /Does Jane Finch Cannabis deliver cannabis in North York\?/);
  assert.match(nap, /Is Jane Finch delivery open 24 hours like the walk-in store\?/);
  assert.match(nap, /How do I place a Jane Finch Cannabis delivery order\?/);
});

test("delivery hours stay 10 a.m.–10 p.m. and never claim 24h courier", () => {
  assert.match(nap, /DELIVERY_HOURS_LABEL = "Delivery 10 a\.m\.–10 p\.m\. daily"/);
  assert.match(page, /DELIVERY_HOURS_LABEL/);
  assert.match(page, /opens: "10:00"/);
  assert.match(page, /closes: "22:00"/);
  assert.match(page, /not a 24-hour courier/);
  assert.match(thinDelivery, /10 a\.m\. to 10 p\.m\. daily/);
  assert.doesNotMatch(page, /delivery is open 24|24-hour delivery|24\/7 delivery|overnight delivery/i);
  assert.doesNotMatch(nap, /DELIVERY[\s\S]{0,80}Open 24 hours, 7 days/);
});

test("hub graph links homepage, visit, geo weed, delivery LP, and tiers", () => {
  assert.match(hub, /href: DELIVERY_LP_PATH/);
  assert.match(page, /SccHubLinks/);
  assert.match(page, /currentPath=\{DELIVERY_LP_PATH\}/);
  assert.match(page, /href="\/"/);
  assert.match(page, /VISIT_PATH/);
  assert.match(page, /href="\/weed-dispensary-north-york"/);
  assert.match(page, /href="\/exotic-weed"/);
  assert.match(page, /href="\/premium-weed"/);
  assert.match(page, /href="\/aaa-weed"/);
  assert.match(page, /href="\/aa-weed"/);
  assert.match(page, /href="\/budget-weed"/);
  assert.match(home, /DELIVERY_LP_PATH/);
  assert.match(visit, /href="\/cannabis-delivery-north-york"/);
  assert.match(geo, /href="\/cannabis-delivery-north-york"/);
  assert.match(openNow, /href="\/cannabis-delivery-north-york"/);
  assert.match(footer, /href="\/cannabis-delivery-north-york"/);
  assert.match(tierPage, /\/cannabis-delivery-north-york/);
});

test("Wave 2 copy stays Jane Finch / North York with no MJ01, Ottawa, sister, or GBP edits", () => {
  assert.match(page, /Jane–Finch/);
  assert.match(page, /Jane St/);
  assert.match(page, /North York/);
  assert.doesNotMatch(publicFiles, /Jane & Lawrence|Jane and Lawrence/);
  assert.doesNotMatch(publicFiles, /Ottawa|Gatineau|ByWard|Dalhousie/);
  assert.doesNotMatch(publicFiles, /sister store|After Dark Cannabis|Pink House/);
  assert.doesNotMatch(publicFiles, /GBP Name|rename the profile|Google Business Profile name/i);
  assert.match(publicFiles, /2728 Jane St/);
  assert.match(publicFiles, /\+1 \(437\) 524-9336/);
  assert.match(publicFiles, /https:\/\/janefinchcannabis\.ca/);
});
