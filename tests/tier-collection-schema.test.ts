import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  assertCollectionPageItemListContract,
  buildCollectionPageItemListJsonLd,
  collectSchemaKeysAndTypes,
  FLOWER_TIER_COLLECTION_PATHS,
  flowerCanonicalUrl,
  SCHEMA_STORE_ID,
  SCHEMA_WEBSITE_ID,
  SITE_ORIGIN,
  TIER_COLLECTION_SCHEMA_CONTRACT,
} from "../app/lib/collectionPageSchema.ts";
import { SITE_ORIGIN as NAP_ORIGIN } from "../app/lib/nap.ts";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

const MENU_SWIMLANE = [
  "flowers.json",
  "items.json",
  "prebuild-stock",
  "prebuild",
  "adcInventory",
  "APPS_SCRIPT_URL",
] as const;

const pricedFlowers = [
  {
    name: "Sale First",
    slug: "sale-first",
    sku: "X1",
    tier: "EXOTIC",
    type: "hybrid" as const,
    isHot: false,
    isSale: true,
    thc: "36%",
    price3g: { regular: 40, sale: 32 },
    price5g: null,
    price14g: { regular: 140, sale: 95 },
    price28g: null,
    image: "/flowers/sale-first.webp",
  },
  {
    name: "Regular Second",
    slug: "regular-second",
    sku: "X2",
    tier: "EXOTIC",
    type: "indica" as const,
    isHot: false,
    isSale: false,
    thc: "34%",
    price3g: { regular: 40, sale: null },
    price5g: null,
    price14g: null,
    price28g: null,
    image: "/flowers/regular-second.webp",
  },
];

test("tier collection schema preserves visible product order without volatile offer fields", () => {
  const jsonLd = buildCollectionPageItemListJsonLd({
    canonicalPath: "/exotic-weed",
    name: "Exotic Weed & Cannabis Flower in North York",
    description: "Exotic flower collection. Posted prices can change.",
    items: pricedFlowers,
    itemUrl: (flower) => flowerCanonicalUrl(flower.slug),
  });

  assertCollectionPageItemListContract(jsonLd, {
    canonicalPath: "/exotic-weed",
    expectedItemUrls: [
      flowerCanonicalUrl("sale-first"),
      flowerCanonicalUrl("regular-second"),
    ],
  });

  const collection = jsonLd["@graph"][0];
  const list = jsonLd["@graph"][1];

  assert.equal(collection["@type"], "CollectionPage");
  assert.deepEqual(collection.about, { "@id": SCHEMA_STORE_ID });
  assert.deepEqual(collection.isPartOf, { "@id": SCHEMA_WEBSITE_ID });
  assert.equal(list["@type"], "ItemList");
  assert.equal(list.numberOfItems, 2);
  assert.deepEqual(list.itemListElement, [
    {
      "@type": "ListItem",
      position: 1,
      name: "Sale First",
      url: "https://janefinchcannabis.ca/flower/sale-first",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Regular Second",
      url: "https://janefinchcannabis.ca/flower/regular-second",
    },
  ]);

  const { keys, types } = collectSchemaKeysAndTypes(jsonLd);
  for (const forbidden of TIER_COLLECTION_SCHEMA_CONTRACT.forbiddenTypes) {
    assert.equal(types.has(forbidden), false, `leaked type ${forbidden}`);
  }
  for (const forbidden of TIER_COLLECTION_SCHEMA_CONTRACT.forbiddenKeys) {
    assert.equal(keys.has(forbidden), false, `leaked key ${forbidden}`);
  }
  assert.equal(keys.has("price3g"), false);
  assert.equal(keys.has("price14g"), false);
});

test("all five flower tier slugs emit a unique CollectionPage + ItemList", () => {
  const products = read("app/lib/products.ts");
  for (const canonicalPath of FLOWER_TIER_COLLECTION_PATHS) {
    const slug = canonicalPath.slice(1);
    assert.match(products, new RegExp(`slug: "${slug}"`));
  }

  const seenItemListIds = new Set<string>();
  for (const canonicalPath of FLOWER_TIER_COLLECTION_PATHS) {
    const jsonLd = buildCollectionPageItemListJsonLd({
      canonicalPath,
      name: canonicalPath,
      description: "Tier collection.",
      items: pricedFlowers,
      itemUrl: (flower) => flowerCanonicalUrl(flower.slug),
    });
    assertCollectionPageItemListContract(jsonLd, {
      canonicalPath,
      expectedItemUrls: pricedFlowers.map((flower) => flowerCanonicalUrl(flower.slug)),
    });
    const itemListId = jsonLd["@graph"][1]["@id"];
    assert.equal(seenItemListIds.has(itemListId), false, `duplicate ItemList @id ${itemListId}`);
    seenItemListIds.add(itemListId);
    assert.match(jsonLd["@graph"][1].itemListElement[0].url, /\/flower\/sale-first$/);
  }
  assert.equal(seenItemListIds.size, 5);
});

test("empty on-page lists still emit a valid CollectionPage + ItemList without invented stock", () => {
  const jsonLd = buildCollectionPageItemListJsonLd({
    canonicalPath: "/budget-weed",
    name: "Budget Weed in North York",
    description: "Budget flower shelf at Jane Finch Cannabis.",
    items: [],
    itemUrl: (flower) => flowerCanonicalUrl(flower.slug),
  });

  assertCollectionPageItemListContract(jsonLd, {
    canonicalPath: "/budget-weed",
    expectedItemUrls: [],
  });
  assert.equal(jsonLd["@graph"][1].numberOfItems, 0);
  assert.deepEqual(jsonLd["@graph"][1].itemListElement, []);
});

test("layout Store/WebSite @ids match the apex NAP identity refs", () => {
  const layout = read("app/layout.tsx");
  const nap = read("app/lib/nap.ts");
  assert.match(layout, /const storeId = `\$\{SITE_ORIGIN\}\/#store`/);
  assert.match(layout, /const websiteId = `\$\{SITE_ORIGIN\}\/#website`/);
  assert.match(nap, /SITE_ORIGIN = "https:\/\/janefinchcannabis\.ca"/);
  assert.equal(SITE_ORIGIN, NAP_ORIGIN);
  assert.equal(SITE_ORIGIN, "https://janefinchcannabis.ca");
  assert.equal(SCHEMA_WEBSITE_ID, `${NAP_ORIGIN}/#website`);
  assert.equal(SCHEMA_STORE_ID, `${NAP_ORIGIN}/#store`);
});

test("tier page wires the contract through a native JSON-LD script and keeps FAQPage", () => {
  const page = read("app/[tier]/page.tsx");
  const builder = read("app/lib/tierStructuredData.ts");
  const redirects = read("next.config.ts");
  assert.match(builder, /buildCollectionPageItemListJsonLd/);
  assert.match(builder, /flowerCanonicalUrl/);
  assert.match(page, /buildTierCollectionJsonLd/);
  assert.match(page, /serializeJsonLd\(tierJsonLd\)/);
  assert.match(page, /type="application\/ld\+json"/);
  assert.match(page, /faqJsonLd\(seo\.faqs\)/);
  assert.match(page, /name: seo\?\.h1 \|\| config\.name/);
  assert.match(page, /canonical: `\$\{SITE_ORIGIN\}\/\$\{tierSlug\}`/);
  for (const [shortSlug, owner] of [
    ["/exotic", "/exotic-weed"],
    ["/premium", "/premium-weed"],
    ["/aaa", "/aaa-weed"],
    ["/aa", "/aa-weed"],
    ["/budget", "/budget-weed"],
  ] as const) {
    assert.match(
      redirects,
      new RegExp(`source: "${shortSlug}", destination: "${owner}", permanent: true`),
    );
  }
  assert.doesNotMatch(page, /"@type": "Offer"/);
  assert.doesNotMatch(page, /from "next\/script"/);
});

test("schema modules stay out of the menu swimlane", () => {
  const schemaSources = [
    read("app/lib/collectionPageSchema.ts"),
    read("app/lib/tierStructuredData.ts"),
    read("app/lib/categoryStructuredData.ts"),
  ].join("\n");

  for (const token of MENU_SWIMLANE) {
    assert.doesNotMatch(
      schemaSources,
      new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `schema swimlane must not mention ${token}`,
    );
  }
});
