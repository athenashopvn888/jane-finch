import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const local = read("app/lib/jfcLocal.ts");
const layout = read("app/layout.tsx");
const home = read("app/page.tsx");
const homeClient = read("app/HomePageClient.tsx");
const visit = read("app/visit/page.tsx");
const owner = read("app/weed-dispensary-north-york/page.tsx");
const nyDelivery = read("app/weed-delivery-north-york/page.tsx");
const vaughan = read("app/weed-delivery-vaughan/page.tsx");
const sitemap = read("app/sitemap.ts");
const footer = read("app/components/Footer.tsx");
const navbar = read("app/components/Navbar.tsx");
const robots = read("app/robots.ts");
const delivery = read("app/delivery/page.tsx");

const publicSurface = [local, layout, home, homeClient, visit, owner, nyDelivery, vaughan, footer, navbar, delivery].join("\n");

test("JFC01 keeps CannabisStore on the homepage origin and matching FAQPage blocks", () => {
  assert.match(local, /"@type": "CannabisStore"/);
  assert.match(local, /url: SITE_ORIGIN/);
  assert.match(local, /telephone: JFC\.phoneIntl/);
  assert.match(local, /2728 Jane St/);
  assert.match(local, /\+14375249336/);
  assert.match(layout, /cannabisStoreJsonLd/);
  assert.match(home, /faqPageJsonLd\(HOME_FAQS\)/);
  assert.match(visit, /faqPageJsonLd\(VISIT_FAQS\)/);
  assert.match(homeClient, /HOME_FAQS\.map/);
  assert.match(visit, /VISIT_FAQS\.map/);
});

test("homepage remains the visit hub and /visit is a unique Jane–Finch route guide", () => {
  assert.match(home, /canonical: SITE_ORIGIN/);
  assert.match(homeClient, /href="\/visit"/);
  assert.match(homeClient, /Jane–Finch \/ Black Creek/);
  assert.match(homeClient, /JFC\.mapsEmbedUrl/);
  assert.match(visit, /canonical: `\$\{SITE_ORIGIN\}\/visit`/);
  assert.match(visit, /robots: \{ index: true, follow: true \}/);
  assert.match(visit, /How to reach Jane Finch Cannabis on Jane Street/);
  assert.match(visit, /35 Jane bus/);
  assert.match(visit, /Plaza parking is directly in front/);
  assert.match(navbar, /href: "\/visit", label: "Visit"/);
  assert.match(footer, /href="\/visit"/);
  assert.match(sitemap, /\$\{BASE\}\/visit/);
});

test("thin city pages are demoted without deleting the URLs", () => {
  assert.match(owner, /canonical: SITE_ORIGIN/);
  assert.match(owner, /index: false/);
  assert.match(nyDelivery, /canonical: `\$\{SITE_ORIGIN\}\/delivery`/);
  assert.match(nyDelivery, /index: false/);
  assert.match(vaughan, /canonical: `\$\{SITE_ORIGIN\}\/delivery`/);
  assert.match(vaughan, /index: false/);
  assert.match(sitemap, /weed-dispensary-north-york[\s\S]*priority: 0\.3/);
  assert.match(robots, /allow: "\/"/);
  assert.doesNotMatch(robots, /disallow: "\/visit"/);
});

test("standalone Jane–Finch copy has no sister, fleet, or other-corridor language", () => {
  assert.doesNotMatch(publicSurface, /sister store|our other locations|Athena|Queen West|Parkdale|Torbram|Unit 59|The Planet 60|P60/i);
  assert.doesNotMatch(nyDelivery, /Brampton store/);
  assert.doesNotMatch(visit, /GBP Website|point GBP/i);
  assert.match(delivery, /Jane–Finch \/ Black Creek Delivery/);
});

test("GBP Website target stays the homepage; /visit is supporting", () => {
  assert.match(layout, /canonical: "https:\/\/www\.janefinchcannabis\.ca"/);
  assert.doesNotMatch(layout, /canonical: "https:\/\/www\.janefinchcannabis\.ca\/visit"/);
  assert.match(homeClient, /homepage is the Jane Finch Cannabis visit hub/);
});
