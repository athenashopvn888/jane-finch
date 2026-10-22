import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { SHOW_CIGARETTES, VAPE_PAGE_PATH, hiddenCigarettePaths, isCigaretteRedirectPath } from "../app/lib/siteConfig.ts";

const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
const middleware = readFileSync(new URL("../middleware.ts", import.meta.url), "utf8");

test("cigarette-off stays a 302 to the vape page in next.config and middleware", () => {
  assert.equal(SHOW_CIGARETTES, false);
  assert.equal(VAPE_PAGE_PATH, "/vape-shop-north-york");
  assert.match(nextConfig, /hiddenCigarettePaths\(\)\.map/);
  assert.match(nextConfig, /statusCode: 302 as const/);
  assert.match(nextConfig, /source: "\/resources\/native-smokes\/:path\*"/);
  assert.match(nextConfig, /destination: VAPE_PAGE_PATH/);
  assert.match(middleware, /NextResponse\.redirect\(url, 302\)/);
  assert.match(middleware, /isCigaretteRedirectPath/);
  assert.doesNotMatch(nextConfig, /CigaretteUnavailable|data-cig-unavailable|webOn/);
  assert.doesNotMatch(middleware, /CigaretteUnavailable|data-cig-unavailable|fleet/);
  for (const path of [
    "/cigarettes",
    "/native-cigarettes-jane-finch",
    "/info/native-cigarettes-north-york",
    "/info/native-cigarettes-york",
    "/resources/native-smokes",
    "/resources/native-smokes/native-cigarettes-guide",
    "/guides/grabba",
    "/item/grabba",
    "/item/bb-full-carton",
  ]) {
    assert.equal(isCigaretteRedirectPath(path), true, path);
    assert.ok(hiddenCigarettePaths().includes(path) || path.includes("/resources/native-smokes/"), path);
  }
  assert.equal(isCigaretteRedirectPath("/items/cigarettes"), false);
  assert.equal(isCigaretteRedirectPath("/item/backwoods-assorted-flavors-20-25"), false);
  assert.equal(isCigaretteRedirectPath("/guides/backwoods"), false);
});
