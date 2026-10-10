import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import VapeActionPanel from "../components/VapeActionPanel";
import styles from "../components/GBPLandingPage.module.css";
import { getLiveMenu } from "../lib/liveMenu";
import { FULL_ADDRESS, HOURS_LABEL, INTERSECTION, PHONE_DISPLAY, SITE_ORIGIN, STORE_NAME } from "../lib/nap";

const PATH = "/vape-shop-north-york";
const FAQS = [
  { q: "Does Jane Finch Cannabis list nicotine vapes?", a: "Yes. Current nicotine devices appear in the live VAPE PENS feed. Adults 19+. Nicotine is addictive." },
  { q: "Are nicotine vapes separate from THC vapes?", a: "Yes. Nicotine devices are under /items/vapes. THC and cannabis vape products are under /items/vape-disposables." },
  { q: "Can staff hold a flavour for pickup?", a: "You can call or send a manual text. A hold is confirmed only when staff reply." },
] as const;

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: { absolute: "Vape Shop North York | Jane Finch Cannabis" },
  description: "Current nicotine vape listings and prices at Jane Finch Cannabis, 2728 Jane St in North York. Call, get directions, or text staff to request a hold. Adults 19+. Nicotine is addictive." ,
  alternates: { canonical: `${SITE_ORIGIN}${PATH}` },
};

function priceValue(value: string) { const match = value.match(/[0-9]+(?:\.[0-9]{1,2})?/); return match?.[0]; }
function puffCount(name: string) { const match = name.match(/(\d+(?:\.\d+)?)\s*K\b/i); return match ? Math.round(Number(match[1]) * 1000) : null; }

export default async function VapeShopNorthYorkPage() {
  const { items } = await getLiveMenu();
  const vapes = items.filter((item) => item.category.trim().toUpperCase() === "VAPE PENS");
  const puffVapes = vapes.map((item) => ({ item, count: puffCount(item.name) })).filter((entry) => entry.count !== null).sort((a,b) => a.count! - b.count!);
  const shelf = puffVapes.length >= 3 ? [puffVapes[0], puffVapes[Math.floor((puffVapes.length - 1) / 2)], puffVapes[puffVapes.length - 1]] : [];
  const graph = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "WebPage", "@id": `${SITE_ORIGIN}${PATH}#webpage`, url: `${SITE_ORIGIN}${PATH}`, name: "Vape Shop North York", about: { "@id": `${SITE_ORIGIN}/#store` } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN }, { "@type": "ListItem", position: 2, name: "Vape Shop North York", item: `${SITE_ORIGIN}${PATH}` }] },
      { "@type": "ItemList", name: "Current nicotine vape listings", numberOfItems: vapes.length, itemListElement: vapes.map((item, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "Product", name: item.name, sku: item.sku, url: `${SITE_ORIGIN}/item/${item.slug}`, offers: priceValue(item.price) ? { "@type": "Offer", priceCurrency: "CAD", price: priceValue(item.price), availability: "https://schema.org/InStock", url: `${SITE_ORIGIN}/item/${item.slug}` } : undefined } })) },
      { "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} /><Navbar /><main className={styles.main}>
    <section className={styles.hero}><p className={styles.eyebrow}>Adults 19+ · Nicotine is addictive</p><h1>Vape Shop in North York at Jane &amp; Finch</h1><p className={styles.heroAddress}>{FULL_ADDRESS} · {INTERSECTION}</p><VapeActionPanel /></section>
    <section className={styles.section}><h2>Current nicotine vape listings</h2><p>These names and prices come from the store&apos;s current live feed. A listed item can sell before staff confirm a hold.</p><div className={styles.cardGrid}>{vapes.map((item) => <Link className={styles.card} href={`/item/${item.slug}`} key={item.sku}><span>{item.name}</span><small>{item.price || "Ask staff for the current price"} · Listed in the current feed</small></Link>)}</div></section>
    {shelf.length === 3 && <section className={styles.section}><h2>Good, better, best by stated puff count</h2><p>This row sorts only the puff counts stated in product names. It is not a quality, lifespan, or performance claim.</p><div className={styles.termGrid}>{shelf.map((entry, index) => <article key={entry.item.sku}><h3>{["Good", "Better", "Best"][index]} · {entry.count!.toLocaleString()} puffs</h3><p>{entry.item.name} · {entry.item.price}</p></article>)}</div></section>}
    <section className={styles.section}><h2>Nicotine and THC are separate menus</h2><p>Nicotine vapes are listed on <Link href="/items/vapes">the nicotine vape menu</Link>. THC and cannabis vape products are listed separately on <Link href="/items/vape-disposables">the THC vape menu</Link>.</p></section>
    <section className={styles.visitSection}><div><p className={styles.kicker}>{HOURS_LABEL}</p><h2>{STORE_NAME}</h2><address>{FULL_ADDRESS}<br />{INTERSECTION}</address></div><div className={styles.visitFacts}><strong>{HOURS_LABEL}</strong><span>{PHONE_DISPLAY}</span><span>Bring valid government photo ID. Adults 19+.</span></div><p>Plaza parking is in front of the store. TTC buses run Jane Street and nearby Finch Avenue.</p></section>
    <section className={styles.section}><h2>Vape shop FAQ</h2><div className={styles.faqList}>{FAQS.map((faq) => <article className={styles.faqItem} key={faq.q}><h3>{faq.q}</h3><p>{faq.a}</p></article>)}</div></section>
  </main><Footer /></>;
}
