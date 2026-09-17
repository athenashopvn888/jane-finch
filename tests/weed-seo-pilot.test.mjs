import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const landing = readFileSync("app/components/GBPLandingPage.tsx", "utf8");
const discovery = readFileSync("app/lib/weedDiscovery.ts", "utf8");
const home = readFileSync("app/HomePage.tsx", "utf8");
const homeRoute = readFileSync("app/page.tsx", "utf8");
const nap = readFileSync("app/lib/nap.ts", "utf8");

test("protected owner renders exactly one H1 and approved content", () => {
  assert.equal((landing.match(/<h1>/g) || []).length, 1);
  assert.match(discovery, /North York Weed Dispensary at Jane & Sheppard/);
  assert.match(landing, /Find Your Weed/);
  assert.match(landing, /Weed, Cannabis, Bud and Flower/);
});

test("homepage has one bounded Weed bridge and unique neighbourhood H1", () => {
  assert.equal((home.match(/<WeedDiscoveryModule \/>/g) || []).length, 1);
  assert.match(home, /HOME_H1/);
  assert.match(homeRoute, /canonical: SITE_ORIGIN/);
  assert.match(nap, /24 Hour Weed Dispensary Near Jane Finch/);
});

test("unsafe implementation claims stay absent", () => {
  assert.doesNotMatch(discovery, /now in stock|sale price|free delivery/i);
  assert.doesNotMatch(discovery, /\/exotics(?:["/])/);
});
