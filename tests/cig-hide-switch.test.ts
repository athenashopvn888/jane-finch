import assert from "node:assert/strict";
import test from "node:test";

import {
  SHOW_CIGARETTES,
  VAPE_PAGE_PATH,
  isCigaretteRedirectPath,
  isHiddenCigaretteProduct,
  omitCigaretteProse,
  visibleFaqs,
} from "../app/lib/siteConfig.ts";

test("cigarette switch defaults off and points old cigarette URLs at the vape page", () => {
  assert.equal(SHOW_CIGARETTES, false);
  assert.equal(VAPE_PAGE_PATH, "/vape-shop-north-york");
  assert.equal(isCigaretteRedirectPath("/native-cigarettes-jane-finch"), true);
  assert.equal(isCigaretteRedirectPath("/info/native-cigarettes-north-york"), true);
  assert.equal(isCigaretteRedirectPath("/info/native-cigarettes-york"), true);
  assert.equal(isCigaretteRedirectPath("/cigarettes"), true);
  assert.equal(isCigaretteRedirectPath("/resources/native-smokes/packs-vs-cartons"), true);
  assert.equal(isCigaretteRedirectPath("/guides/belmont-king-size"), true);
  assert.equal(isCigaretteRedirectPath("/guides/backwoods"), false);
  assert.equal(isCigaretteRedirectPath("/guides/backwoods-delivery-north-york"), false);
  assert.equal(isCigaretteRedirectPath("/items/cigarettes"), false);
  assert.equal(isCigaretteRedirectPath("/items/vapes"), false);
  assert.equal(isCigaretteRedirectPath("/nicotine-vape-north-york"), false);
});

test("backwoods, cigarillos, rolling papers, and nicotine pouches stay listed", () => {
  assert.equal(isHiddenCigaretteProduct({ name: "BACKWOODS ASSORTED FLAVORS", slug: "backwoods-assorted-flavors-20-25", category: "CIGARETTES" }), false);
  assert.equal(isHiddenCigaretteProduct({ name: "NEW BACKWOODS FLAVORS", slug: "new-backwoods-flavors", category: "CIGARETTES" }), false);
  assert.equal(isHiddenCigaretteProduct({ name: "RAW PAPER KING SIZE", slug: "raw-paper-king-size", category: "ADD ONS" }), false);
  assert.equal(isHiddenCigaretteProduct({ name: "NICOTINE POUCHES , VELO, PABLO, KILLA", slug: "nicotine-pouches-velo-pablo-killa", category: "CIGARETTES" }), false);
  assert.equal(isHiddenCigaretteProduct({ name: "CANADIAN LIGHTS", slug: "canadian-lights", category: "CIGARETTES" }), true);
  assert.equal(isHiddenCigaretteProduct({ name: "GRABBA", slug: "grabba", category: "CIGARETTES" }), true);
  assert.equal(isHiddenCigaretteProduct({ name: "10 X PREMIUM MIX CIGARETTES", slug: "10-x-premium-mix-cigarettes", category: "CIGARETTES" }), true);
  assert.equal(isCigaretteRedirectPath("/item/backwoods-assorted-flavors-20-25"), false);
  assert.equal(isCigaretteRedirectPath("/item/canadian-lights"), true);
  assert.equal(isCigaretteRedirectPath("/item/bb-full-carton"), true);
  assert.equal(isCigaretteRedirectPath("/item/bb-lights-carton"), true);
  assert.equal(isHiddenCigaretteProduct({ name: "BB FULL CARTON", slug: "bb-full-carton", category: "CIGARETTES" }), true);
});

test("shared FAQ and list copy drop cigarette clauses while the switch is off", () => {
  const faqs = visibleFaqs([
    { q: "Can I walk in for flower, Native cigarettes, or nicotine vapes?", a: "Use the Jane Finch Native cigarettes page." },
    { q: "Where is the store?", a: "2728 Jane St." },
  ]);
  assert.equal(faqs[0]?.q, "Can I walk in for flower or nicotine vapes?");
  assert.equal(faqs[1]?.a, "2728 Jane St.");
  assert.equal(
    omitCigaretteProse("Open flower, pre-rolls, edibles, vapes, concentrates, accessories, cigarettes, and specialty items."),
    "Open flower, pre-rolls, edibles, vapes, concentrates, accessories, and specialty items.",
  );
});
