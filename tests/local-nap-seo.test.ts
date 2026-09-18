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
const faq = read("app/faq/page.tsx");
const publicFiles = [
  nap, layout, footer, contact, home, gbp, gbpPage, faq,
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
  assert.match(nap, /HOME_SEO_TITLE = "24 Hour Weed Dispensary Near Jane Finch \| North York"/);
  assert.match(nap, /GBP_SEO_TITLE = "North York Weed Dispensary at Jane & Sheppard \| Open 24 Hours"/);
  assert.notEqual(
    nap.match(/HOME_SEO_TITLE = "([^"]+)"/)?.[1],
    nap.match(/GBP_SEO_TITLE = "([^"]+)"/)?.[1],
  );
  assert.notEqual(
    nap.match(/HOME_H1 = "([^"]+)"/)?.[1],
    nap.match(/GBP_H1 = "([^"]+)"/)?.[1],
  );
  assert.match(home, /HOME_H1/);
  assert.match(gbp, /GBP_H1/);
  assert.match(gbpPage, /canonical: `\$\{SITE_ORIGIN\}\$\{weedOwner\.ownerPath\}`/);
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
  assert.match(nap, /Is there a 24 hour dispensary in North York\?/);
  assert.match(nap, /Where is the weed dispensary near Jane Finch\?/);
});
