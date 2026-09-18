import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import nextConfig from "../next.config.ts";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const home = read("app/HomePage.tsx");
const visit = read("app/visit/page.tsx");
const geo = read("app/components/GBPLandingPage.tsx");
const openNow = read("app/24-hour-dispensary-north-york/page.tsx");
const tierPage = read("app/[tier]/page.tsx");
const hub = read("app/components/SccHubLinks.tsx");
const hubData = read("app/lib/sccHub.ts");
const tierSeo = read("app/lib/tierSeoContent.ts");
const publicFiles = [
  home,
  visit,
  geo,
  openNow,
  tierPage,
  hub,
  hubData,
  tierSeo,
  read("app/lib/nap.ts"),
  read("app/faq/page.tsx"),
  read("app/components/Footer.tsx"),
].join("\n");

const TIER_HREFS = [
  "/exotic-weed",
  "/premium-weed",
  "/aaa-weed",
  "/aa-weed",
  "/budget-weed",
] as const;

const UNIQUE_H1S = [
  "Exotic Weed & Cannabis Flower in North York",
  "Premium Weed at Jane & Sheppard",
  "AAA+ Weed at 2728 Jane St",
  "AA Weed for Jane–Finch Walk-In",
  "Budget Weed in North York",
] as const;

test("short SCC tier routes stay 301 aliases onto live *-weed owners", async () => {
  const redirects = await nextConfig.redirects!();
  for (const [shortHref, href] of [
    ["/exotic", "/exotic-weed"],
    ["/premium", "/premium-weed"],
    ["/aaa", "/aaa-weed"],
    ["/aa", "/aa-weed"],
    ["/budget", "/budget-weed"],
  ] as const) {
    assert.ok(
      redirects.some((redirect) =>
        redirect.source === shortHref &&
        redirect.destination === href &&
        redirect.permanent === true
      ),
      `${shortHref} must permanently redirect to ${href}`,
    );
  }
  assert.equal(existsSync(new URL("../app/jane-sheppard-dispensary", import.meta.url)), false);
  assert.doesNotMatch(publicFiles, /jane-sheppard-dispensary/);
});

test("five flower tiers have unique H1, title, and FAQ copy", () => {
  for (const h1 of UNIQUE_H1S) {
    assert.ok(tierSeo.includes(`h1: "${h1}"`), h1);
  }
  assert.equal(new Set(UNIQUE_H1S).size, 5);
  assert.match(tierSeo, /seoTitle: "Exotic Weed & Cannabis Flower in North York \| Jane Finch Cannabis"/);
  assert.match(tierSeo, /seoTitle: "Premium Weed at Jane & Sheppard \| Jane Finch Cannabis"/);
  assert.match(tierSeo, /seoTitle: "AAA\+ Weed at 2728 Jane St \| Jane Finch Cannabis"/);
  assert.match(tierSeo, /seoTitle: "AA Weed for Jane–Finch Walk-In \| Jane Finch Cannabis"/);
  assert.match(tierSeo, /seoTitle: "Budget Weed in North York \| Jane Finch Cannabis"/);
  assert.match(tierSeo, /What is the Exotic Weed tier at Jane Finch Cannabis\?/);
  assert.match(tierSeo, /What does Premium Weed mean at Jane Finch Cannabis\?/);
  assert.match(tierSeo, /What is AAA\+ Weed at Jane Finch Cannabis\?/);
  assert.match(tierSeo, /What is AA Weed at Jane Finch Cannabis\?/);
  assert.match(tierSeo, /What is Budget Weed at Jane Finch Cannabis\?/);
  assert.match(tierPage, /seo\?\.h1 \|\| config\.name/);
  assert.match(tierPage, /faqJsonLd\(seo\.faqs\)/);
});

test("homepage, visit, geo, 24h FAQ, and tiers share the SCC hub graph", () => {
  for (const source of [home, visit, geo, openNow, tierPage]) {
    assert.match(source, /SccHubLinks/);
  }

  for (const href of TIER_HREFS) {
    assert.match(home, new RegExp(`href="${href}"`));
    assert.match(visit, new RegExp(`href="${href}"`));
    assert.match(hubData, new RegExp(`href: "${href}"`));
  }

  assert.match(home, /href="\/weed-dispensary-north-york"/);
  assert.match(home, /VISIT_PATH/);
  assert.match(home, /OPEN_NOW_PATH/);
  assert.match(visit, /href="\/weed-dispensary-north-york"/);
  assert.match(visit, /href="\/"/);
  assert.match(visit, /OPEN_NOW_PATH/);
  assert.match(geo, /currentPath=\{store\.ownerPath\}/);
  assert.match(openNow, /currentPath=\{OPEN_NOW_PATH\}/);
  assert.match(visit, /currentPath=\{VISIT_PATH\}/);
  assert.match(tierPage, /currentPath=\{`\/\$\{tierSlug\}`\}/);
  assert.match(hub, /FLOWER_TIER_PAGES/);
  assert.match(hubData, /export const HUB_PAGES/);
  assert.match(hubData, /export const FLOWER_TIER_PAGES/);
});

test("visit already owns Jane–Sheppard so Wave 1 does not fork a corridor LP", () => {
  assert.match(visit, /Jane–Sheppard corridor questions stay on this visit hub/);
  assert.match(visit, /Jane &amp;\s*Sheppard/);
  assert.doesNotMatch(publicFiles, /Jane & Lawrence|Jane and Lawrence/);
});

test("delivery windows stay separate from 24h walk-in claims", () => {
  assert.match(home, /Delivery is a separate 10 a\.m\.–10 p\.m\. window/);
  assert.match(visit, /it is not a 24-hour courier/);
  assert.match(openNow, /Delivery stays 10 a\.m\. to 10 p\.m/);
  assert.match(tierSeo, /Delivery is a separate 10 a\.m\. to 10 p\.m\. service/);
  assert.match(tierSeo, /Delivery still runs 10 a\.m\. to 10 p\.m\. only/);
});

test("Wave 1 copy stays Jane Finch / North York with no sister or Ottawa language", () => {
  assert.doesNotMatch(publicFiles, /Ottawa|Gatineau|ByWard|Dalhousie/);
  assert.doesNotMatch(publicFiles, /sister store|After Dark Cannabis|Pink House/);
  assert.doesNotMatch(publicFiles, /GBP Name|rename the profile|Google Business Profile name/i);
  assert.match(publicFiles, /2728 Jane St/);
  assert.match(publicFiles, /\+1 \(437\) 524-9336/);
  assert.match(publicFiles, /https:\/\/janefinchcannabis\.ca/);
});
