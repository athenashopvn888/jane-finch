import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const menu = JSON.parse(await readFile(new URL("../app/delivery/delivery-menu.json", import.meta.url), "utf8"));
const component = await readFile(new URL("../app/delivery/DeliveryCatalog.tsx", import.meta.url), "utf8");
const css = await readFile(new URL("../app/delivery/delivery.css", import.meta.url), "utf8");
const drawer = await readFile(new URL("../app/delivery/ProductDetailsDrawer.tsx", import.meta.url), "utf8");
const chat = await readFile(new URL("../app/delivery/JFCWebChat.tsx", import.meta.url), "utf8");
const page = await readFile(new URL("../app/delivery/page.tsx", import.meta.url), "utf8");
const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const navbar = await readFile(new URL("../app/components/Navbar.tsx", import.meta.url), "utf8");
const footer = await readFile(new URL("../app/components/Footer.tsx", import.meta.url), "utf8");
const faq = await readFile(new URL("../app/faq/page.tsx", import.meta.url), "utf8");
const banner = await readFile(new URL("../app/components/DeliveryBanner.tsx", import.meta.url), "utf8");
const bannerCss = await readFile(new URL("../app/components/DeliveryBanner.module.css", import.meta.url), "utf8");
const bannerAsset = await readFile(new URL("../public/delivery/jfc-delivery-banner.webp", import.meta.url));
const nextConfig = await readFile(new URL("../next.config.ts", import.meta.url), "utf8");
const products = menu.products;

assert.deepEqual([menu.store.id, menu.store.code, menu.store.pod], ["JFC", "JFC01", "POD01"]);
assert.equal(menu.status, "live");
assert.equal(menu.catalogVersion, "seed-f2457c32eed8");
assert.equal(products.length, 63);
assert.equal(products.filter((product) => product.description).length, 58);
assert.deepEqual(Object.fromEntries(["Exotics", "CRAFTS", "BC Premium", "Budget", "SHREDS"].map((tier) => [tier, products.filter((product) => product.tier === tier).length])), { Exotics: 14, CRAFTS: 13, "BC Premium": 15, Budget: 18, SHREDS: 3 });
assert(products.every((product) => product.publicProductId && product.tier && product.images.length === 1));
assert(!/"sku"|sourceProductId|sourceUrl|provenance|farmerslink\.ca/i.test(JSON.stringify(menu)));
assert(component.includes("api/catalog?store=JFC"));
assert(component.includes('["ALL", "Exotics", "CRAFTS", "BC Premium", "Budget", "SHREDS"]'));
assert(component.includes(".sort(compareProducts)") && component.includes("normalEntryPrice"));
assert(component.includes("totalPrice: loyaltyPrice * 2") && component.includes("Number(offer.quantity) !== 2"));
assert(component.indexOf("MEMBER LOYALTY 28g") < component.indexOf("STANDARD 28g"));
assert(component.includes('id="how-to-order" tabIndex={-1}') && component.includes('href="#how-to-order"'));
assert(component.includes('href="/" aria-label="Jane Finch Cannabis home"'));
assert(component.includes("DELIVERY HOURS 10:00 a.m.–10:00 p.m."));
assert(css.includes(".product-grid{grid-template-columns:repeat(2,minmax(0,1fr));"));
assert(css.includes("overflow-x: clip") && css.includes("@keyframes p59-live-order-ring"));
assert(drawer.includes('role="dialog"') && drawer.includes('aria-modal="true"') && drawer.includes('event.key==="Escape"') && drawer.includes("document.body.style.overflow"));
assert(chat.includes('"Close chat" : "LIVE ORDER"') && chat.includes('storeId: "JFC"'));
assert(chat.includes("New customer ID verification") && chat.includes("/api/web-chat/id-review"));
assert(page.includes("hoursAvailable") && page.includes('opens: "10:00"') && page.includes('closes: "22:00"'));
assert(home.includes("<DeliveryBanner />") && component.includes("<DeliveryBanner />"));
assert(banner.includes('href="/delivery"') && banner.includes("jfc-delivery-banner.webp"));
assert(banner.includes("width={1774}") && banner.includes("height={887}") && banner.includes("sizes="));
assert(bannerCss.includes("object-fit: contain") && bannerCss.includes(":focus-visible"));
assert.equal(bannerAsset.length, 424952);
assert(navbar.includes("Live 10 a.m.–10 p.m."));
assert(footer.includes('<Link href="/delivery">Delivery Menu</Link>'));
assert(faq.includes("The storefront is listed as open 24 hours"));
assert(nextConfig.includes("milestone-1-demo.vercel.app") && !nextConfig.includes("farmerslink.ca"));

const eligible = products.filter((product) => ["Exotics", "CRAFTS", "BC Premium"].includes(product.tier) && product.priceOptions.some((option) => option.label === "28g"));
for (const product of eligible) {
  const regular = product.priceOptions.find((option) => option.label === "28g").price;
  const explicit = product.offers?.find((offer) => offer.kind === "prime_time")?.price;
  const loyalty = explicit || regular - 30;
  assert(loyalty > 0);
}
for (const product of products.filter((product) => ["Budget", "SHREDS"].includes(product.tier))) {
  assert(!product.offers?.some((offer) => offer.kind === "prime_time"));
}

console.log("[verify] JFC live delivery, loyalty, banner, Web Chat, and mobile hierarchy verified.");
