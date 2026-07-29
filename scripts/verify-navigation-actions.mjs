import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const navbar = readFileSync("app/components/Navbar.tsx", "utf8");
const styles = readFileSync("app/components/Navbar.module.css", "utf8");

assert.match(navbar, /href="\/exotic"[\s\S]*?Store Menu/i, "Store Menu must target the existing /exotic menu");
assert.match(navbar, /href="\/delivery"[\s\S]*?Delivery Menu/i, "Delivery Menu must target /delivery");
assert.match(navbar, /aria-label="Primary navigation"/, "Top actions need an accessible label");
assert.match(navbar, /aria-current=/, "Active menu choices must expose aria-current");
assert.match(navbar, /commandBtn:[\s\S]*?minHeight:\s*44/, "Inline fallback must preserve 44px touch targets");
assert.match(styles, /\.deliveryBtn\s*\{[\s\S]*?background:/, "Delivery Menu needs a distinct style");
assert.match(styles, /\.commandBtn:focus-visible\s*\{/, "Top actions need a visible keyboard focus state");
assert.match(styles, /@media \(max-width: 520px\)[\s\S]*?\.actionDock\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/, "Mobile actions must use a non-overflowing grid");
assert.match(styles, /@media \(max-width: 520px\)[\s\S]*?\.commandBtn\s*\{[\s\S]*?min-height:\s*44px/, "Mobile actions need 44px touch targets");

console.log("Navigation action check passed: Store and Delivery menu controls are prominent, accessible, and mobile-safe.");
