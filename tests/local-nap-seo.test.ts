import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const nap = read("app/lib/nap.ts");
const layout = read("app/layout.tsx");
const footer = read("app/components/Footer.tsx");
const contact = read("app/contact/page.tsx");
const home = read("app/HomePage.tsx");
const gbp = read("app/lib/weedDiscovery.ts");
const gbpPage = read("app/weed-dispensary-north-york/page.tsx");
const visit = read("app/visit/page.tsx");
const openNow = read("app/24-hour-dispensary-north-york/page.tsx");
const faq = read("app/faq/page.tsx");
const sitemap = read("app/sitemap.ts");
const publicFiles = [
  nap, layout, footer, contact, home, gbp, gbpPage, visit, openNow, faq,
  read("app/components/GBPLandingPage.tsx"),
  read("app/lib/gbp-location.ts"),
  read("app/lib/seoPages.ts"),
].join("\n");

test("canonical NAP is identical in the shared module, schema, footer, and contact", () => {
  for (const exact of [
    'STORE_NAME = "Jane Finch Cannabis"',
    'STREET_ADDRESS = "2728 Jane St"',
    'FULL_ADDRESS = "2728 Jane St, North York, ON M3L 2G6"',
    'PHONE_DISPLAY = "+1 (437) 524-9336"',
    'PHONE_INTL = "+14375249336"',
    'HOURS_LABEL = "Open 24 hours, 7 days"',
    'SITE_ORIGIN = "https://janefinchcannabis.ca"',
  ]) {
    assert.ok(nap.includes(exact), exact);
  }

  assert.match(layout, /url: SITE_ORIGIN/);
  assert.match(layout, /streetAddress: STREET_ADDRESS/);
  assert.match(layout, /telephone: PHONE_INTL/);
  assert.doesNotMatch(layout, /exotic-weed|#menu/);

  assert.match(footer, /STREET_ADDRESS/);
  assert.match(footer, /PHONE_DISPLAY/);
  assert.match(footer, /SITE_ORIGIN/);
  assert.match(footer, /HOURS_LABEL/);

  assert.match(contact, /PHONE_DISPLAY/);
  assert.match(contact, /SITE_ORIGIN/);
  assert.match(contact, /2728 Jane St/);
  assert.match(contact, /North York, ON M3L 2G6/);
});

test("homepage and North York landing use unique title, meta, and H1", () => {
  assert.match(nap, /HOME_SEO_TITLE = "Jane Finch Cannabis \| Jane and Finch Dispensary North York"/);
  assert.match(nap, /GBP_SEO_TITLE = "Cannabis Store North York — Open Now at Jane & Finch"/);
  assert.match(nap, /VISIT_SEO_TITLE = "Visit Jane Finch Cannabis — 2728 Jane St Walk-In Hub"/);
  assert.match(nap, /OPEN_NOW_SEO_TITLE = "24-Hour Jane Finch Dispensary — North York Open-Now FAQ"/);
  assert.notEqual(
    nap.match(/HOME_SEO_TITLE = "([^"]+)"/)?.[1],
    nap.match(/GBP_SEO_TITLE = "([^"]+)"/)?.[1],
  );
  assert.notEqual(
    nap.match(/HOME_H1 = "([^"]+)"/)?.[1],
    nap.match(/GBP_H1 = "([^"]+)"/)?.[1],
  );
  assert.notEqual(
    nap.match(/HOME_H1 = "([^"]+)"/)?.[1],
    nap.match(/VISIT_H1 = "([^"]+)"/)?.[1],
  );
  assert.notEqual(
    nap.match(/GBP_H1 = "([^"]+)"/)?.[1],
    nap.match(/VISIT_H1 = "([^"]+)"/)?.[1],
  );
  assert.notEqual(
    nap.match(/OPEN_NOW_H1 = "([^"]+)"/)?.[1],
    nap.match(/HOME_H1 = "([^"]+)"/)?.[1],
  );
  assert.notEqual(
    nap.match(/OPEN_NOW_H1 = "([^"]+)"/)?.[1],
    nap.match(/GBP_H1 = "([^"]+)"/)?.[1],
  );
  assert.notEqual(
    nap.match(/OPEN_NOW_H1 = "([^"]+)"/)?.[1],
    nap.match(/VISIT_H1 = "([^"]+)"/)?.[1],
  );
  assert.match(home, /HOME_H1/);
  assert.match(gbp, /GBP_H1/);
  assert.match(visit, /VISIT_H1/);
  assert.match(openNow, /OPEN_NOW_H1/);
  assert.match(gbpPage, /canonical: `\$\{SITE_ORIGIN\}\$\{weedOwner\.ownerPath\}`/);
  assert.match(visit, /canonical: `\$\{SITE_ORIGIN\}\$\{VISIT_PATH\}`/);
  assert.match(openNow, /canonical: `\$\{SITE_ORIGIN\}\$\{OPEN_NOW_PATH\}`/);
});

test("door-test neighbourhood language is present without stuffing other fleet brands", () => {
  assert.match(home, /weed dispensary near Jane Finch/i);
  assert.match(home, /24 hour weed dispensary in North York/i);
  assert.match(gbp, /Jane St & Sheppard Ave W/);
  assert.match(faq, /24 hour dispensary in North York/);
  assert.doesNotMatch(publicFiles, /Pink House|6IX|CAFE|corporate parent|sister store/i);
});

test("homepage FAQ JSON-LD is wired for local questions", () => {
  const page = read("app/page.tsx");
  assert.match(page, /faqJsonLd\(HOME_FAQS\)/);
  assert.match(gbpPage, /faqJsonLd\(weedOwner\.faq\)/);
  assert.match(visit, /faqJsonLd\(VISIT_FAQS\)/);
  assert.match(openNow, /faqJsonLd\(OPEN_NOW_FAQS\)/);
  assert.match(nap, /Is there a 24 hour dispensary in North York\?/);
  assert.match(nap, /Where is the weed dispensary near Jane Finch\?/);
  assert.match(nap, /Is there a dispensary near me in Jane–Finch \/ North York\?/);
  assert.match(nap, /Is there a cannabis store in North York near Jane and Finch\?/);
});

test("B03 near-me hub links homepage, North York LP, and /visit without GBP name edits", () => {
  assert.match(home, /VISIT_PATH/);
  assert.match(home, /dispensary near me/i);
  assert.match(gbp, /VISIT_PATH/);
  assert.match(visit, /2728 Jane St — Jane–Finch intersection clarity/);
  assert.match(visit, /North York walk-in vs delivery/);
  assert.match(visit, /Open now \/ hours/);
  assert.match(visit, /Transit &amp; parking tips/);
  assert.match(visit, /FAQ: cannabis store North York/);
  assert.match(visit, /Homepage NAP/);
  assert.match(footer, /href="\/visit"/);
  assert.doesNotMatch(publicFiles, /GBP Name|rename the profile|Google Business Profile name/i);
  assert.match(nap, /STORE_NAME = "Jane Finch Cannabis"/);
});

test("B09 expands 24-hour North York FAQPage and links home, LP, and /visit", () => {
  assert.match(openNow, /Hours truth/);
  assert.match(openNow, /North York open now/);
  assert.match(openNow, /Jane–Finch arrival/);
  assert.match(openNow, /FAQ: 24 hour dispensary North York/);
  assert.match(openNow, /href="\/"/);
  assert.match(openNow, /href="\/weed-dispensary-north-york"/);
  assert.match(openNow, /VISIT_PATH/);
  assert.match(openNow, /faqJsonLd\(OPEN_NOW_FAQS\)/);
  assert.match(nap, /Is Jane Finch Cannabis a 24\/7 dispensary near me\?/);
  assert.match(nap, /Is the dispensary near me open now in North York\?/);
  assert.match(faq, /24-Hour \/ Open Now/);
  assert.match(faq, /OPEN_NOW_PATH/);
  assert.match(faq, /href="\/weed-dispensary-north-york"/);
  assert.match(faq, /VISIT_PATH/);
  assert.match(home, /OPEN_NOW_PATH/);
  assert.match(gbp, /OPEN_NOW_PATH/);
  assert.match(visit, /OPEN_NOW_PATH/);
  assert.match(footer, /href="\/24-hour-dispensary-north-york"/);
  assert.match(sitemap, /\$\{BASE\}\/24-hour-dispensary-north-york/);
  assert.doesNotMatch(publicFiles, /GBP Name|rename the profile|Google Business Profile name/i);
  assert.match(nap, /STORE_NAME = "Jane Finch Cannabis"/);
  assert.match(openNow, /https:\/\/janefinchcannabis\.ca\//);
});

test("B16 rebuilds homepage as Jane Finch Cannabis local hub vs North York LP monoculture", () => {
  assert.match(nap, /HOME_H1 = "Jane Finch Cannabis — Jane and Finch Dispensary"/);
  assert.match(nap, /jane finch cannabis/i);
  assert.match(nap, /Dispensary near me/);
  assert.match(nap, /Jane and Finch dispensary/);
  assert.match(nap, /cannabis store North York/);
  assert.match(nap, /www\.janefinchcannabis\.ca 301s to/);
  assert.match(nap, /MAPS_EMBED_URL/);
  assert.match(home, /id="home-nap-hours-map"/);
  assert.match(home, /Address, hours, and map/);
  assert.match(home, /MAPS_EMBED_URL/);
  assert.match(home, /<iframe/);
  assert.match(home, /Jane–Finch corridor — Jane and Finch dispensary/);
  assert.match(home, /href="\/weed-dispensary-north-york"/);
  assert.match(home, /OPEN_NOW_PATH/);
  assert.doesNotMatch(home, /href="\/weed-dispensary-north-york\/"/);
  assert.doesNotMatch(home, /href="\/24-hour-dispensary-north-york\/"/);
  assert.match(gbp, /OPEN_NOW_PATH/);
  assert.match(sitemap, /const BASE = SITE_ORIGIN/);
  assert.match(nap, /SITE_ORIGIN = "https:\/\/janefinchcannabis\.ca"/);
  assert.doesNotMatch(publicFiles, /GBP Name|rename the profile|Google Business Profile name/i);
  assert.match(nap, /STORE_NAME = "Jane Finch Cannabis"/);
  assert.match(nap, /What is Jane Finch Cannabis\?/);
});
