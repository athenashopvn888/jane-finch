import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const source = fs.readFileSync(new URL("../app/item/[slug]/page.tsx", import.meta.url), "utf8");

test("item metadata uses the live apex host for canonical and Open Graph identity", () => {
  assert.match(source, /import \{ SITE_ORIGIN \} from "\.\.\/\.\.\/lib\/nap"/);
  assert.match(source, /canonical: `\$\{SITE_ORIGIN\}\/item\/\$\{slug\}`/);
  assert.match(source, /url: `\$\{SITE_ORIGIN\}\/item\/\$\{slug\}`/);
});

test("item Product and breadcrumb schema reuse the canonical origin", () => {
  assert.doesNotMatch(source, /https:\/\/www\.janefinchcannabis\.ca/);
  assert.match(source, /url: `\$\{SITE_ORIGIN\}\/item\/\$\{item\.slug\}`/);
  assert.match(source, /"item": SITE_ORIGIN/);
  assert.match(source, /"item": `\$\{SITE_ORIGIN\}\/items\/\$\{catSlug\}`/);
});
