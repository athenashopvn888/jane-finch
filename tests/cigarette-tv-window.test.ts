import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  CIG_WORDING_FALLBACK,
  decideCigaretteGuide,
  decideCigaretteSurface,
  decideWebsiteSurface,
  publicWebsiteCigaretteFlag,
  readCigaretteTvHeader,
  reconcileSurfaceItems,
  resolveCigWording,
  resolveSurfaceFlag,
} from "../app/lib/cigDecision.ts";
import { SHOW_CIGARETTES, cigaretteEnvHardOff, isHiddenCigaretteProduct } from "../app/lib/siteConfig.ts";
import { visibleTvCardItems } from "../app/lib/tvCigaretteBoard.ts";

const carton = { category: "CIGARETTES", name: "BB FULL CARTON", slug: "bb-full-carton" };
const grabba = { category: "CIGARETTES", name: "GRABBA", slug: "grabba" };
const backwoods = { category: "CIGARETTES", name: "BACKWOODS ASSORTED FLAVORS $20-$25", slug: "backwoods-assorted-flavors-20-25" };
const pouch = { category: "CIGARETTES", name: "NICOTINE POUCHES , VELO, PABLO, KILLA", slug: "nicotine-pouches-velo-pablo-killa" };
const wrap = { category: "CIGARETTES", name: "HEMP WRAPS", slug: "hemp-wraps" };
const paper = { category: "ADD ONS", name: "RAW PAPER KING SIZE", slug: "raw-paper-king-size" };
const cigarillo = { category: "CIGARETTES", name: "SWISHER CIGARILLO", slug: "swisher-cigarillo" };
const zyn = { category: "CIGARETTES", name: "ZYN NICOTINE POUCHES", slug: "zyn-nicotine-pouches" };
const pablo = { category: "CIGARETTES", name: "PABLO", slug: "pablo" };
const vape = { category: "VAPE PENS", name: "Mango Ice", slug: "mango-ice" };

const wording = {
  bannerText: "FEED BANNER",
  promoBrands: "FEED BRANDS",
  tv2BoardTitle: "FEED BOARD",
  wrapsTitle: "🍂 WRAPS & POUCHES",
  tickerLine1: "FEED TICKER",
  priceTwoPack: "$5",
  priceCarton: "$25",
  priceBelmont: "$10",
  priceBB2Pack: "$5",
};

function cig(extra: Record<string, unknown> = {}) {
  return { on: false, tvOn: false, webOn: false, webFollowsTv: true, wording, ...extra };
}

const shelf = [vape, carton, grabba, backwoods, pouch, wrap, paper, cigarillo, zyn, pablo];

function names(items: { name: string }[]) {
  return items.map((item) => item.name);
}

test("TV follows tvOn and the website follows webOn only", () => {
  const items = [carton, backwoods];
  const scheduled = cig({ on: true, webOn: false, tvOn: true, master: true });
  assert.equal(decideCigaretteSurface({ cig: scheduled, items, surface: "tv" }).show, true);
  assert.equal(decideWebsiteSurface({ cig: scheduled, items }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false }), items, surface: "web" }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ webOn: true, tvOn: false }), items, surface: "tv" }).show, false);
  assert.equal(decideWebsiteSurface({ cig: cig({ on: true, webOn: true, tvOn: false }), items }).show, true);
  assert.equal(decideWebsiteSurface({ cig: cig({ on: true, tvOn: true }), items }).show, false);
  assert.equal(decideWebsiteSurface({ cig: null, items, errored: true }).show, false);
  assert.equal(resolveSurfaceFlag({ on: true }, "tv"), true);
  assert.equal(resolveSurfaceFlag(cig({ on: true, webOn: false }), "web"), false);
  assert.equal(resolveSurfaceFlag(cig({ on: false, tvOn: true, webFollowsTv: true }), "tv"), true);
});

test("TV hides on a feed error or a missing block, and follows tvOn only after a successful feed", () => {
  const items = [carton, grabba, backwoods];
  const missing = decideCigaretteSurface({ cig: null, items, surface: "tv" });
  assert.equal(missing.reason, "missing");
  assert.equal(missing.show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "tv" }).show, true);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: false }), items, surface: "tv" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig(), items, surface: "tv" }).show, false);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items: [backwoods, pouch], surface: "tv" }).reason, "no-items");
  const errored = decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "tv", errored: true });
  assert.equal(errored.reason, "error");
  assert.equal(errored.show, false);
  const hidden = reconcileSurfaceItems(items, items, errored.show).map((item) => item.slug);
  assert.deepEqual(hidden, [backwoods.slug]);
  assert.equal(decideCigaretteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, surface: "tv", envRaw: "false" }).reason, "env");
  assert.equal(decideWebsiteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, envRaw: "off" }).reason, "env");
  assert.equal(decideWebsiteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, envRaw: "off" }).show, false);
  assert.equal(decideWebsiteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, errored: true }).show, false);
  assert.equal(decideWebsiteSurface({ cig: null, items }).show, false);
  assert.equal(decideWebsiteSurface({ cig: null, items }).reason, "missing");
  assert.equal(cigaretteEnvHardOff(undefined), false);
  assert.equal(cigaretteEnvHardOff(""), false);
  assert.equal(cigaretteEnvHardOff("false"), true);
  assert.equal(cigaretteEnvHardOff("true"), false);
});

test("the website flag stays off whenever the static gate is off, including a feed error or a missing block", () => {
  const items = [carton];
  const on = decideWebsiteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items });
  const errored = decideWebsiteSurface({ cig: cig({ on: true, webOn: true, tvOn: true }), items, errored: true });
  const missing = decideWebsiteSurface({ cig: null, items });
  assert.equal(on.show, true);
  assert.equal(publicWebsiteCigaretteFlag(on, SHOW_CIGARETTES), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, SHOW_CIGARETTES), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, SHOW_CIGARETTES), false);
  assert.equal(publicWebsiteCigaretteFlag(on, false), false);
  assert.equal(publicWebsiteCigaretteFlag(errored, true), false);
  assert.equal(publicWebsiteCigaretteFlag(missing, true), false);
  assert.equal(publicWebsiteCigaretteFlag({ show: false, reason: "off" }, true), false);
  assert.equal(SHOW_CIGARETTES ? on.show : false, false);
});

test("wording uses the feed and falls back to the current Jane Finch copy", () => {
  assert.equal(resolveCigWording({ bannerText: "  FEED BANNER  ", wrapsTitle: "" }).bannerText, "FEED BANNER");
  assert.equal(resolveCigWording({ bannerText: "  FEED BANNER  " }).wrapsTitle, CIG_WORDING_FALLBACK.wrapsTitle);
  assert.equal(CIG_WORDING_FALLBACK.wrapsTitle, "🚬 BACKWOODS");
  assert.equal(CIG_WORDING_FALLBACK.tv2BoardTitle, "🚬 CIGARETTES");
  assert.equal(decideCigaretteSurface({ cig: null, items: [], surface: "tv" }).wording.bannerText, CIG_WORDING_FALLBACK.bannerText);
});

test("guide pages follow the master switch and a feed error stays open", () => {
  const items = [carton];
  assert.equal(decideCigaretteGuide({ cig: cig({ on: false, master: false, webOn: true }), items }).show, false);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: true, webOn: false }), items }).show, true);
  assert.equal(decideCigaretteGuide({ cig: null, items, errored: true }).show, true);
  assert.equal(decideCigaretteGuide({ cig: cig({ on: true, master: true }), items, envRaw: "off" }).reason, "env");
});

test("TV on shows cigarette items and TV off keeps wraps, papers, Backwoods, and pouches", () => {
  const hidden = reconcileSurfaceItems(shelf, shelf, false).map((item) => item.slug);
  assert.deepEqual(hidden, [vape.slug, backwoods.slug, pouch.slug, wrap.slug, paper.slug, cigarillo.slug, zyn.slug, pablo.slug]);
  const shown = reconcileSurfaceItems([vape, backwoods], [carton, backwoods], true);
  assert.deepEqual(shown.map((item) => item.slug), [vape.slug, backwoods.slug, carton.slug]);

  const cigCard = (item: { category?: string }) => item.category === "CIGARETTES";
  assert.deepEqual(names(visibleTvCardItems(shelf, "CIGARETTES", cigCard, true, false)), [
    carton.name, grabba.name, backwoods.name, pouch.name, wrap.name, cigarillo.name, zyn.name, pablo.name,
  ]);
  assert.deepEqual(names(visibleTvCardItems(shelf, "CIGARETTES", cigCard, false, false)), [
    backwoods.name, pouch.name, wrap.name, cigarillo.name, zyn.name, pablo.name,
  ]);
  assert.deepEqual(names(visibleTvCardItems(shelf, "CIGARETTES", cigCard, true, true)), [
    carton.name, grabba.name, backwoods.name, pouch.name, wrap.name, cigarillo.name, zyn.name, pablo.name,
  ]);
  assert.deepEqual(names(visibleTvCardItems(shelf, "CIGARETTES", cigCard, false, true)), []);
});

test("the TV header is the live flag and the website static gate stays off", () => {
  const headers = new Headers({
    "x-tv-data-cig-tv": "1",
    "x-tv-data-cig-web": "0",
  });
  assert.equal(readCigaretteTvHeader(headers).show, true);
  assert.equal(readCigaretteTvHeader(new Headers({ "x-tv-data-cig-tv": "0" })).show, false);
  assert.equal(SHOW_CIGARETTES, false);
  assert.equal(isHiddenCigaretteProduct(carton), true);
  assert.equal(isHiddenCigaretteProduct(backwoods), false);
  assert.equal(isHiddenCigaretteProduct(pouch), false);

  const tv2 = readFileSync(new URL("../app/tv2/page.tsx", import.meta.url), "utf8");
  const tv = readFileSync(new URL("../app/tv/page.tsx", import.meta.url), "utf8");
  const route = readFileSync(new URL("../app/api/tv-data/route.ts", import.meta.url), "utf8");
  const home = readFileSync(new URL("../app/HomePage.tsx", import.meta.url), "utf8");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(tv2, /readCigaretteTvHeader/);
  assert.match(tv2, /visibleTvCardItems/);
  assert.doesNotMatch(tv2, /SHOW_CIGARETTES/);
  assert.match(tv, /readCigaretteTvHeader/);
  assert.doesNotMatch(tv, /SHOW_CIGARETTES/);
  assert.match(route, /snapshotHeaders/);
  assert.doesNotMatch(route, /SHOW_CIGARETTES/);
  assert.match(home, /SHOW_CIGARETTES/);
  assert.match(layout, /web: SHOW_CIGARETTES \? cigarettes\.web : false/);
  assert.match(readFileSync(new URL("../app/lib/tvStock.js", import.meta.url), "utf8"), /CIG_STOCK_CACHE_MS/);
});
