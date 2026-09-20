import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import nextConfig from "../next.config.ts";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const nap = read("app/lib/nap.ts");
const cig = read("app/native-cigarettes-jane-finch/page.tsx");
const vape = read("app/nicotine-vape-north-york/page.tsx");
const hub = read("app/lib/sccHub.ts");
const home = read("app/HomePage.tsx");
const visit = read("app/visit/page.tsx");
const geo = read("app/components/GBPLandingPage.tsx");
const openNow = read("app/24-hour-dispensary-north-york/page.tsx");
const footer = read("app/components/Footer.tsx");
const sitemap = read("app/sitemap.ts");
const config = read("next.config.ts");
const publicFiles = [
  nap,
  cig,
  vape,
  hub,
  home,
  visit,
  geo,
  openNow,
  footer,
  sitemap,
  read("app/faq/page.tsx"),
  read("app/components/Navbar.tsx"),
  read("app/lib/weedDiscovery.ts"),
].join("\n");

test("Wave 3 ships Jane Finch Native cig + North York nic-vape neighbourhood LPs", () => {
  assert.equal(existsSync(new URL("../app/native-cigarettes-jane-finch/page.tsx", import.meta.url)), true);
  assert.equal(existsSync(new URL("../app/nicotine-vape-north-york/page.tsx", import.meta.url)), true);
  assert.equal(existsSync(new URL("../app/nicotine-pouches-north-york", import.meta.url)), false);
  assert.equal(existsSync(new URL("../app/grabba-jane-finch", import.meta.url)), false);
  assert.match(nap, /NATIVE_CIG_LP_PATH = "\/native-cigarettes-jane-finch"/);
  assert.match(nap, /NIC_VAPE_LP_PATH = "\/nicotine-vape-north-york"/);
  assert.match(nap, /NATIVE_CIG_H1 = "Native Cigarettes at Jane Finch"/);
  assert.match(nap, /NIC_VAPE_H1 = "Nicotine Vape at Jane & Finch"/);
  assert.notEqual(
    nap.match(/NATIVE_CIG_H1 = "([^"]+)"/)?.[1],
    nap.match(/NIC_VAPE_H1 = "([^"]+)"/)?.[1],
  );
  assert.match(cig, /canonical: `\$\{SITE_ORIGIN\}\$\{NATIVE_CIG_LP_PATH\}`/);
  assert.match(vape, /canonical: `\$\{SITE_ORIGIN\}\$\{NIC_VAPE_LP_PATH\}`/);
  assert.match(sitemap, /\$\{BASE\}\/native-cigarettes-jane-finch/);
  assert.match(sitemap, /\$\{BASE\}\/nicotine-vape-north-york/);
});

test("cig and nic-vape LPs have FAQPage, NAP, and live category CTAs", () => {
  assert.match(cig, /faqJsonLd\(NATIVE_CIG_FAQS\)/);
  assert.match(vape, /faqJsonLd\(NIC_VAPE_FAQS\)/);
  assert.match(cig, /NATIVE_CIG_MENU_PATH/);
  assert.match(vape, /NIC_VAPE_MENU_PATH/);
  assert.match(cig, /Open the cigarette menu/);
  assert.match(vape, /Browse nicotine vapes/);
  assert.match(cig, /FULL_ADDRESS/);
  assert.match(vape, /FULL_ADDRESS/);
  assert.match(cig, /Website: janefinchcannabis\.ca/);
  assert.match(vape, /Website: janefinchcannabis\.ca/);
  assert.match(vape, /Nicotine is addictive/);
  assert.match(nap, /Does Jane Finch Cannabis sell Native cigarettes\?/);
  assert.match(nap, /Does Jane Finch Cannabis sell nicotine vapes in North York\?/);
});

test("hub graph links homepage, visit, geo, delivery, 24h, cig, and nic-vape", () => {
  assert.match(hub, /href: NATIVE_CIG_LP_PATH/);
  assert.match(hub, /href: NIC_VAPE_LP_PATH/);
  assert.match(hub, /href: DELIVERY_LP_PATH/);
  assert.match(cig, /SccHubLinks/);
  assert.match(vape, /SccHubLinks/);
  assert.match(home, /NATIVE_CIG_LP_PATH/);
  assert.match(home, /NIC_VAPE_LP_PATH/);
  assert.match(home, /DELIVERY_LP_PATH/);
  assert.match(visit, /href="\/native-cigarettes-jane-finch"/);
  assert.match(visit, /href="\/nicotine-vape-north-york"/);
  assert.match(geo, /href="\/native-cigarettes-jane-finch"/);
  assert.match(geo, /href="\/nicotine-vape-north-york"/);
  assert.match(geo, /href="\/cannabis-delivery-north-york"/);
  assert.match(openNow, /NATIVE_CIG_LP_PATH/);
  assert.match(openNow, /NIC_VAPE_LP_PATH/);
  assert.match(footer, /href="\/native-cigarettes-jane-finch"/);
  assert.match(footer, /href="\/nicotine-vape-north-york"/);
  assert.match(footer, /href="\/cannabis-delivery-north-york"/);
});

test("B09 24h FAQ stays the owner and alias is a 301, not a duplicate page", async () => {
  assert.equal(existsSync(new URL("../app/24-hour-dispensary-north-york/page.tsx", import.meta.url)), true);
  assert.equal(existsSync(new URL("../app/24-hour-north-york-dispensary", import.meta.url)), false);
  assert.match(nap, /OPEN_NOW_PATH = "\/24-hour-dispensary-north-york"/);
  assert.match(nap, /OPEN_NOW_ALIAS_PATH = "\/24-hour-north-york-dispensary"/);
  assert.match(nap, /OPEN_NOW_H1 = "24-Hour Jane Finch Dispensary — North York Open Now"/);
  assert.match(openNow, /canonical: `\$\{SITE_ORIGIN\}\$\{OPEN_NOW_PATH\}`/);
  assert.match(openNow, /24-hour walk-in for flower, Native cigarettes, and nic vape/);
  assert.match(nap, /Is the Jane–Finch \/ Jane & Sheppard counter open at 2 a\.m\.\?/);
  assert.match(nap, /Is 24-hour for walk-in or for Jane Finch delivery\?/);
  const redirects = await nextConfig.redirects!();
  assert.ok(
    redirects.some((redirect) =>
      redirect.source === "/24-hour-north-york-dispensary" &&
      redirect.destination === "/24-hour-dispensary-north-york" &&
      redirect.permanent === true
    ),
  );
  assert.doesNotMatch(sitemap, /24-hour-north-york-dispensary/);
});

test("walk-in 24h is never invented as a delivery clock", () => {
  assert.match(openNow, /Delivery stays 10 a\.m\. to 10 p\.m/);
  assert.match(cig, /Delivery is a separate 10 a\.m\.–10 p\.m\. courier/);
  assert.match(vape, /Delivery is a separate 10 a\.m\.–10 p\.m\. window/);
  assert.doesNotMatch(cig, /24-hour delivery|24\/7 delivery|overnight delivery/i);
  assert.doesNotMatch(vape, /24-hour delivery|24\/7 delivery|overnight delivery/i);
  assert.doesNotMatch(cig, /delivery is open 24|24-hour delivery|24\/7 delivery/i);
  assert.doesNotMatch(vape, /delivery is open 24|24-hour delivery|24\/7 delivery/i);
  assert.match(openNow, /is not a 24-hour courier/);
});

test("existing /info/ cig and nic resources stay; menu JSON swimlane is untouched", () => {
  assert.match(read("app/lib/seoPages.ts"), /slug": "native-cigarettes-north-york"/);
  assert.match(read("app/lib/seoPages.ts"), /slug: "nicotine-vapes-north-york"/);
  assert.match(footer, /href="\/info\/native-cigarettes-north-york"/);
  assert.match(footer, /href="\/info\/nicotine-vapes-north-york"/);
  assert.doesNotMatch(config, /flowers\.json|items\.json|prebuild-stock|adcInventory|APPS_SCRIPT_URL/);
});

test("Master GO: five pillars, on-page FAQ, homepage hub cards, supporting articles tied to LPs", () => {
  const resources = read("app/resources/resourceData.ts");
  assert.match(hub, /href: WEED_OWNER_PATH/);
  assert.match(hub, /href: OPEN_NOW_PATH/);
  assert.match(hub, /href: DELIVERY_LP_PATH/);
  assert.match(hub, /href: NATIVE_CIG_LP_PATH/);
  assert.match(hub, /href: NIC_VAPE_LP_PATH/);
  assert.match(home, /Weed dispensary, 24-hour, delivery, Native cigarettes, and nic-vape/);
  assert.match(home, /Weed dispensary North York/);
  assert.match(geo, /FAQ: weed dispensary North York/);
  assert.match(nap, /WEED_H1 = "Weed Dispensary in North York at Jane Finch"/);
  assert.match(nap, /Is Jane Finch Cannabis a weed dispensary in North York\?/);
  assert.match(home, /slug: "native-cigarettes-jane-finch"/);
  assert.match(home, /slug: "nicotine-vape-north-york"/);
  assert.match(home, /DELIVERY_LP_PATH/);
  assert.match(home, /OPEN_NOW_PATH/);
  assert.match(cig, /id="faq"/);
  assert.match(vape, /id="faq"/);
  assert.match(openNow, /id="faq"/);
  assert.match(read("app/cannabis-delivery-north-york/page.tsx"), /id="faq"/);
  assert.match(resources, /\/native-cigarettes-jane-finch/);
  assert.match(resources, /\/nicotine-vape-north-york/);
  assert.match(resources, /\/24-hour-dispensary-north-york/);
  assert.match(resources, /\/cannabis-delivery-north-york/);
  assert.match(resources, /route: "\/resources\/vape-guides\/nicotine-vape-jane-finch"/);
  assert.match(resources, /route: "\/resources\/local-guides\/24-hour-jane-finch-walk-in"/);
  assert.match(resources, /route: "\/resources\/local-guides\/north-york-cannabis-delivery"/);
  assert.doesNotMatch(home, /LEARN_MORE|GBP Updates/);
});

test("Wave 3 copy stays Jane Finch / North York with no MJ01, Ottawa, sister, or GBP edits", () => {
  assert.match(cig, /Jane–Finch/);
  assert.match(cig, /Jane St/);
  assert.match(vape, /Jane &amp; Finch|Jane–Finch/);
  assert.match(vape, /North York/);
  assert.match(openNow, /Jane Finch/);
  assert.doesNotMatch(publicFiles, /Jane & Lawrence|Jane and Lawrence/);
  assert.doesNotMatch(publicFiles, /Ottawa|Gatineau|ByWard|Dalhousie/);
  assert.doesNotMatch(publicFiles, /sister store|After Dark Cannabis|Pink House/);
  assert.doesNotMatch(publicFiles, /GBP Name|rename the profile|Google Business Profile name/i);
  assert.doesNotMatch(publicFiles, /ranked #1|the #1 store|best dispensary|fake review/i);
  assert.match(publicFiles, /2728 Jane St/);
  assert.match(publicFiles, /\+1 \(437\) 524-9336/);
  assert.match(publicFiles, /https:\/\/janefinchcannabis\.ca/);
  assert.match(publicFiles, /Adults 19\+/);
});
