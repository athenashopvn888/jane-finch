"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import menu from "./delivery-menu.json";
import ProductDetailsDrawer from "./ProductDetailsDrawer";
import DeliveryBanner from "../components/DeliveryBanner";

type PriceOption = { key: string; label: string; price: number };
type Offer = { kind: "prime_time" | "multi_ounce"; quantity?: number; price?: number; weight?: string; bonus?: string; perUnitPrice?: number; totalPrice?: number; label: string };
type Tier = "SHREDS" | "Budget" | "BC Premium" | "CRAFTS" | "Exotics";
type Product = { publicProductId:string; name:string; tier:Tier; category:string; strain:string; thc:string; effects:string[]; description:string|null; images:string[]; priceOptions:PriceOption[]; offers?:Offer[] };
type TierFilter = "ALL" | Tier;

const bundledProducts = menu.products as Product[];
const tierFilters: TierFilter[] = ["ALL", "Exotics", "CRAFTS", "BC Premium", "Budget", "SHREDS"];
const tierDisplayOrder: Tier[] = ["Exotics", "CRAFTS", "BC Premium", "Budget", "SHREDS"];

function tierFor(product: Product): Tier { return product.tier; }

function normalEntryPrice(product: Product) {
  const prices = product.priceOptions.map((option) => option.price);
  return prices.length ? Math.min(...prices) : Number.POSITIVE_INFINITY;
}

function compareProducts(a: Product, b: Product) {
  const tierA = tierFor(a);
  const tierB = tierFor(b);
  const tierDifference = (tierA ? tierDisplayOrder.indexOf(tierA) : tierDisplayOrder.length) - (tierB ? tierDisplayOrder.indexOf(tierB) : tierDisplayOrder.length);
  if (tierDifference !== 0) return tierDifference;
  const priceA = normalEntryPrice(a);
  const priceB = normalEntryPrice(b);
  if (priceA !== priceB) return priceA - priceB;
  return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
}

function ProductPricing({ product }: { product: Product }) {
  const regular28 = product.priceOptions.find((option) => option.label === "28g");
  const compact = product.priceOptions.filter((option) => option.label !== "28g");
  const member = product.offers?.find((offer) => offer.kind === "prime_time");
  const eligible = ["Exotics", "CRAFTS", "BC Premium"].includes(tierFor(product));
  const explicitLoyalty = Number(member?.price);
  const loyaltyPrice = Number.isFinite(explicitLoyalty) && explicitLoyalty > 0
    ? explicitLoyalty
    : eligible && regular28 ? regular28.price - 30 : null;
  const bundles = eligible && loyaltyPrice
    ? [
      { kind: "multi_ounce" as const, quantity: 2, perUnitPrice: loyaltyPrice, totalPrice: loyaltyPrice * 2, label: `2 × 28g at $${loyaltyPrice} each — $${loyaltyPrice * 2} total` },
      ...(product.offers?.filter((offer) => offer.kind === "multi_ounce" && Number(offer.quantity) !== 2) || [])
    ]
    : product.offers?.filter((offer) => offer.kind === "multi_ounce") || [];
  return <div className="product-pricing">
    {compact.length > 0 && <div><div className="compact-price-grid">{compact.map((option) => <div className="compact-price" key={option.key}><span>{option.label}</span><strong>${option.price}</strong></div>)}</div></div>}
    {(regular28 || member || bundles.length > 0) && <div className="decision-prices">
      {loyaltyPrice !== null && <div className="decision-tile member-28"><span>MEMBER LOYALTY 28g</span><strong>${loyaltyPrice}</strong><small>Member price</small><p>{member?.bonus ? `${member.bonus} applies on a later order when eligible.` : "Coupon or add-on eligibility is confirmed separately."}</p></div>}
      {bundles.map((offer, index) => { const quantity = Number(offer.quantity); const total = Number(offer.totalPrice); const each = Number(offer.perUnitPrice) || total / quantity; return <div className="decision-tile bundle-decision" key={`${quantity}-${index}`}><span>{quantity} × 28g DEAL</span><div className="bundle-numbers"><strong>${each} <small>each</small></strong><b>${total} <small>total</small></b></div></div>; })}
      {regular28 && <div className="decision-tile standard-28"><span>STANDARD 28g</span><strong>${regular28.price}</strong><small>Regular price</small></div>}
    </div>}
  </div>;
}

function LoyaltySection() {
  return <section className="member-loyalty" aria-labelledby="member-loyalty-title"><div><p className="eyebrow">SAVE ON A LATER ORDER</p><h2 id="member-loyalty-title">Member Loyalty Savings</h2><p>Qualify with an eligible regular-price 28g purchase in BC Premium, Crafts, or Exotics, or with a selected 2 × 28g tier offer. Rewards and coupons apply to a later order—not the qualifying purchase.</p></div><ol><li><span>1</span><p><strong>Qualify</strong> with an eligible regular-price ounce or selected two-ounce tier offer.</p></li><li><span>2</span><p><strong>Return</strong> for $30 off an eligible regular-price 28g item in the selected tier.</p></li><li><span>3</span><p><strong>Use the coupon later.</strong> A 3g Craft coupon requires a qualifying spend of $120 or more.</p></li><li><span>4</span><p><strong>Keep access active</strong> with a $50 or more purchase within 14 days.</p></li></ol><aside><strong>Important conditions</strong><p>Complimentary items apply only to regular-price Craft or Exotic ounces—not BC Premium. Loyalty prices are firm and cannot be reduced with points. Loyalty-price orders do not include extra complimentary items. Otherwise, requalify with a full-price purchase. Dispatcher confirms current eligibility and any included item before checkout.</p></aside></section>;
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>(bundledProducts);
  const [activeTier, setActiveTier] = useState<TierFilter>("ALL");
  const [search, setSearch] = useState("");
  const [selectedProduct,setSelectedProduct]=useState<Product|null>(null);
  const closeDetails=useCallback(()=>setSelectedProduct(null),[]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://milestone-1-demo.vercel.app/api/catalog?store=JFC", { signal: controller.signal }).then((response) => response.ok ? response.json() : Promise.reject()).then((payload) => { if (Array.isArray(payload.products) && payload.products.length >= 50 && payload.products.every((product:Product)=>product.publicProductId&&product.tier&&Array.isArray(product.images))) setProducts(payload.products); }).catch(() => {});
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return products.filter((product) => {
      if (activeTier !== "ALL" && tierFor(product) !== activeTier) return false;
      return !needle || `${product.name} ${product.category} ${product.strain}`.toLowerCase().includes(needle);
    }).sort(compareProducts);
  }, [activeTier, search, products]);

  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Jane Finch Cannabis home">
          <Image src="/jfc-mark.webp" alt="" width={44} height={44} priority />
          <span><strong>Jane Finch Cannabis</strong><small>Delivery menu</small></span>
        </Link>
        <nav aria-label="Delivery menu navigation">
          <a href="#menu">Menu</a>
          <a href="#how-to-order">How to order</a>
        </nav>
      </header>
      <DeliveryBanner />

      <section className="terms-banner" aria-labelledby="delivery-terms-title">
        <div>
          <p>JFC DELIVERY DETAILS</p>
          <h2 id="delivery-terms-title"><span>$60 PRODUCT MINIMUM</span><span>$10 DELIVERY FEE</span><span>DELIVERY HOURS 10:00 a.m.–10:00 p.m.</span></h2>
        </div>
        <a href="#how-to-order">Read the ordering steps</a>
      </section>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">JFC DELIVERY</p>
          <h1>Jane Finch Cannabis Delivery in North York</h1>
          <p className="hero-lede">
            Browse the current flower delivery menu, then use LIVE ORDER to connect with the Jane Finch Cannabis dispatcher.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#menu">Browse all flower</a>
            <a className="secondary-action" href="#how-to-order">How delivery works</a>
            <span>Adults 19+ / dispatcher assisted</span>
          </div>
        </div>
        <div className="hero-card" aria-label="Delivery status">
          <span className="status-dot" />
          <p>LIVE DELIVERY MENU</p>
          <strong>{products.length}</strong>
          <small>Browse the menu, then open LIVE ORDER</small>
        </div>
      </section>

      <section className="service-strip" aria-label="Delivery menu details">
        <div><strong>JFC delivery</strong><span>Jane Finch Cannabis menu</span></div>
        <div><strong>Every weight</strong><span>Shown directly on flower cards</span></div>
        <div><strong>{products.length} products</strong><span>Browse the flower menu</span></div>
        <div><strong>LIVE ORDER</strong><span>Connect with the dispatcher</span></div>
      </section>
      <LoyaltySection />

      <section className="menu-layout" id="menu">
        <aside className="filter-panel">
          <p className="eyebrow">FLOWER TIERS</p>
          <h2>Choose a tier.</h2>
          <div className="filter-buttons">
            {tierFilters.map((item) => (
              <button key={item} type="button" className={activeTier === item ? "active" : ""} onClick={() => setActiveTier(item)}>
                {item === "ALL" ? "ALL" : item.toUpperCase()}<span>{item === "ALL" ? products.length : products.filter((product) => tierFor(product) === item).length}</span>
              </button>
            ))}
          </div>
        </aside>

        <div className="catalog">
          <div className="catalog-tools">
            <div>
              <p className="eyebrow">JFC FLOWER MENU</p>
              <h2>{activeTier === "ALL" ? "All flower" : activeTier}</h2>
              <span>{filtered.length} products in this view</span>
            </div>
            <label>
              <span>Search flower</span>
              <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name or type" />
            </label>
          </div>

          <div className="mobile-lanes" aria-label="Flower tier filters">
            {tierFilters.map((item) => (
              <button key={item} type="button" className={activeTier === item ? "active" : ""} onClick={() => setActiveTier(item)}>{item === "ALL" ? "ALL" : item.toUpperCase()}</button>
            ))}
          </div>

          <div className="product-grid">
            {filtered.map((product) => {
              const productTier = tierFor(product);
              return (
                <article className="product-card" key={product.publicProductId}>
                  <button className="product-image" type="button" onClick={()=>setSelectedProduct(product)} aria-label={`View details for ${product.name}`}>
                    {product.images[0] ? <Image src={product.images[0]} alt={`${product.name} on the JFC delivery menu`} fill sizes="(max-width: 640px) 50vw, (max-width: 1380px) 33vw, 235px" /> : <span>JFC</span>}
                  </button>
                  <div className="product-body">
                    <div className="badges">{productTier && <span>{productTier}</span>}<span>{product.category}</span></div>
                    <h3><button className="productTitleButton" type="button" onClick={()=>setSelectedProduct(product)}>{product.name}</button></h3>
                    <ProductPricing product={product} />
                    <button className="viewDetailsButton" type="button" onClick={()=>setSelectedProduct(product)}>View details</button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

      </section>

      <section className="delivery-order-guide" id="how-to-order" tabIndex={-1}>
        <p className="eyebrow">HOW TO ORDER</p>
        <h2>Start with the menu. Finish with the dispatcher.</h2>
        <ol>
          <li><span>1</span><p><strong>Browse</strong> the current delivery menu and note the items you want.</p></li>
          <li><span>2</span><p><strong>Open LIVE ORDER</strong> and choose whether you are a new or returning customer.</p></li>
          <li><span>3</span><p><strong>Send the order details.</strong> New customers complete the private ID review in Web Chat.</p></li>
          <li><span>4</span><p><strong>Wait for confirmation.</strong> The dispatcher confirms availability, eligibility, and delivery details.</p></li>
        </ol>
      </section>

      <footer><Image src="/jfc-mark.webp" alt="" width={32} height={32} /><span>Jane Finch Cannabis delivery menu</span><strong>19+</strong></footer>
      <ProductDetailsDrawer product={selectedProduct} storeName="Jane Finch Cannabis" onClose={closeDetails} pricing={selectedProduct?<ProductPricing product={selectedProduct}/>:null}/>
    </main>
  );
}
