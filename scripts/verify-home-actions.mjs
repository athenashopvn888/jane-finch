import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const home = readFileSync("app/page.tsx", "utf8");
const homeCss = readFileSync("app/page.module.css", "utf8");
const landing = readFileSync("app/components/GBPLandingPage.tsx", "utf8");
const landingCss = readFileSync("app/components/GBPLandingPage.module.css", "utf8");

assert.match(home, /href="\/exotic-weed"[\s\S]*?STORE MENU/, "Store Menu must target /exotic-weed");
assert.match(home, /href="\/delivery"[\s\S]*?DELIVERY MENU/, "Delivery Menu must target /delivery");
assert.match(home, /NEW DELIVERY AVAILABLE/, "Delivery announcement headline is required");
assert.match(home, /delivery serves North York/, "Published Jane Finch delivery area is required");
assert.match(home, /LIVE ORDER/, "Delivery announcement must explain dispatcher connection");
for (const source of [home, landing]) {
  assert.doesNotMatch(source, /CALL STORE|Call Store/i, "Landing/home Call Store CTA must be removed");
}
assert.doesNotMatch(landing, /href=\{`tel:[\s\S]{0,120}className=\{`\$\{styles\.btn\}/, "Landing page cannot contain a tel button");
assert.match(homeCss, /\.homeMenuCta\s*\{[\s\S]*?min-height:\s*44px/, "Home CTAs need 44px touch targets");
assert.match(homeCss, /\.homeMenuActions\s*\{[\s\S]*?repeat\(2,\s*minmax\(0,\s*1fr\)\)/, "Home CTAs need a non-overflowing pair");
assert.match(landingCss, /\.primaryAction, \.secondaryAction\s*\{[\s\S]*?padding:\s*14px 20px/, "Landing CTAs need touch-safe vertical padding");

console.log("Jane Finch home and landing action check passed.");
