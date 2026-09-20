import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

import nextConfig from "../next.config.ts";
import { SITE_ORIGIN } from "../app/lib/nap.ts";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const WWW_HOST = "www.janefinchcannabis.ca";
const APEX_ORIGIN = "https://janefinchcannabis.ca";

function walkSourceFiles(dir: string, files: string[] = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === ".git" || entry === ".next") continue;
      walkSourceFiles(full, files);
      continue;
    }
    if (/\.(ts|tsx|mjs|js)$/.test(entry)) files.push(full);
  }
  return files;
}

test("primary host is apex and www 301s to apex for all paths", async () => {
  assert.equal(SITE_ORIGIN, APEX_ORIGIN);
  assert.match(read("app/lib/nap.ts"), /SITE_ORIGIN = "https:\/\/janefinchcannabis\.ca"/);
  assert.match(read("next.config.ts"), /const APEX_ORIGIN = "https:\/\/janefinchcannabis\.ca"/);

  const redirects = await nextConfig.redirects!();
  const wwwRedirects = redirects.filter((redirect) =>
    redirect.has?.some((rule) => rule.type === "host" && rule.value === WWW_HOST),
  );

  assert.ok(
    wwwRedirects.some((redirect) =>
      redirect.source === "/" &&
      redirect.destination === `${APEX_ORIGIN}/` &&
      redirect.statusCode === 301
    ),
    "www root must 301 to apex",
  );
  assert.ok(
    wwwRedirects.some((redirect) =>
      redirect.source === "/:path+" &&
      redirect.destination === `${APEX_ORIGIN}/:path+` &&
      redirect.statusCode === 301
    ),
    "www paths must 301 to apex",
  );
  assert.ok(
    wwwRedirects.some((redirect) =>
      redirect.source === "/:path+/" &&
      redirect.destination === `${APEX_ORIGIN}/:path+` &&
      redirect.statusCode === 301
    ),
    "www trailing-slash paths must 301 to clean apex paths",
  );
});

test("canonical, sitemap, robots, and JSON-LD hosts use SITE_ORIGIN apex", () => {
  assert.match(read("app/sitemap.ts"), /const BASE = SITE_ORIGIN/);
  assert.match(read("app/robots.ts"), /sitemap: `\$\{SITE_ORIGIN\}\/sitemap\.xml`/);
  assert.match(read("app/page.tsx"), /canonical: SITE_ORIGIN/);
  assert.match(read("app/visit/page.tsx"), /canonical: `\$\{SITE_ORIGIN\}\$\{VISIT_PATH\}`/);
  assert.match(read("app/weed-dispensary-north-york/page.tsx"), /canonical: `\$\{SITE_ORIGIN\}\$\{weedOwner\.ownerPath\}`/);
  assert.match(read("app/cannabis-delivery-north-york/page.tsx"), /canonical: `\$\{SITE_ORIGIN\}\$\{DELIVERY_LP_PATH\}`/);
  assert.match(read("app/layout.tsx"), /metadataBase: new URL\(SITE_ORIGIN\)/);
  assert.match(read("app/resources/resourceData.ts"), /export const SITE_URL = SITE_ORIGIN/);
  assert.match(read("app/[tier]/page.tsx"), /import \{ faqJsonLd, SITE_ORIGIN \} from "\.\.\/lib\/nap"/);
  assert.match(read("app/lib/collectionPageSchema.ts"), /export const SITE_ORIGIN = "https:\/\/janefinchcannabis\.ca"/);
  assert.match(read("app/lib/tierStructuredData.ts"), /from "\.\/collectionPageSchema"/);
  assert.match(read("app/lib/categoryStructuredData.ts"), /from "\.\/collectionPageSchema"/);
});

test("app source does not claim www as the public host", () => {
  const root = new URL("..", import.meta.url).pathname;
  const claimedWww: string[] = [];
  for (const file of walkSourceFiles(join(root, "app"))) {
    const text = readFileSync(file, "utf8");
    if (text.includes(`https://${WWW_HOST}`)) {
      claimedWww.push(relative(root, file));
    }
  }
  assert.deepEqual(claimedWww, [], `absolute www host leftover: ${claimedWww.join(", ")}`);
});
