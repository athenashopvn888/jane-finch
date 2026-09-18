import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./GBPLandingPage.module.css";
import { weedOwner as store } from "../lib/weedDiscovery";
import { FULL_ADDRESS, INTERSECTION, OPEN_NOW_PATH, SITE_ORIGIN, VISIT_PATH } from "../lib/nap";
import SccHubLinks from "./SccHubLinks";

export function GBPLandingPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{store.hoursLabel ? `${store.hoursLabel} · Adults 19+` : "Adults 19+"}</p>
          <h1>{store.h1}</h1>
          <p className={styles.heroAddress}>{store.streetAddress}, {store.city}, ON {store.postalCode}</p>
          <p className={styles.heroAddress}>{INTERSECTION} · <a href={SITE_ORIGIN}>janefinchcannabis.ca</a></p>
          <div className={styles.actions}><Link href="#find-your-weed" className={styles.primaryAction}>Find Your Weed</Link><Link href={VISIT_PATH} className={styles.secondaryAction}>Visit {store.storeName}</Link></div>
        </section>

        <section className={styles.section}>
          <h2>Visit hub, 24-hour FAQ, and five flower tiers</h2>
          <p>This North York page owns broad weed-dispensary intent for Jane Finch. Walk-in arrival stays on the visit hub. Open-now hours stay on the 24-hour FAQ. Each flower shelf has its own route.</p>
          <SccHubLinks currentPath={store.ownerPath} heading="Cross-links from the North York weed page" />
        </section>

        <section className={styles.section}>
          <h2>{store.introTitle}</h2>
          {store.intro.map((text) => <p key={text}>{text}</p>)}
        </section>

        <section className={styles.section}>
          <h2>Jane–Finch walk-in vs North York delivery</h2>
          <p>A cannabis store near me search should open this Jane Street counter. Walk in at {FULL_ADDRESS} any hour — no appointment. Delivery is a separate 10 a.m. to 10 p.m. menu and does not move the store pin.</p>
          <p>Use the <Link href={VISIT_PATH}>walk-in hub</Link> for arrival notes, the <Link href={OPEN_NOW_PATH}>24-hour open-now FAQ</Link> for hours truth, or the <Link href="/">homepage</Link> for the current store menu. Adults 19+ with valid government photo ID.</p>
        </section>

        <section className={styles.section}>
          <h2>Jane Finch, Jane &amp; Sheppard, North York</h2>
          <p>{store.neighborhoodDescription}</p>
          <p>{store.parkingNote}. {store.transitNote}</p>
          <div className={styles.areaList}>
            {store.nearbyAreas.map((area) => (
              <span className={styles.areaTag} key={area}>{area}</span>
            ))}
          </div>
        </section>

        <section className={styles.section} id="find-your-weed">
          <p className={styles.kicker}>{store.findTitle}</p>
          <h2>Helpful Places to Start</h2>
          <div className={styles.cardGrid}>{store.discoveryLinks.map((item) => <Link href={item.href} className={styles.card} key={item.href}><span>{item.label}</span><small>{item.description}</small></Link>)}</div>
          <p className={styles.note}>Browse these pages to learn about product categories and store information before you visit or order.</p>
        </section>

        <section className={styles.section}>
          <h2>Weed, Cannabis, Bud and Flower</h2>
          <p>Different shoppers use different words for cannabis. The terms overlap, but product format is usually the more useful distinction.</p>
          <div className={styles.termGrid}>
            <article><h3>Weed</h3><p>Weed is common everyday language for cannabis.</p></article>
            <article><h3>Cannabis</h3><p>Cannabis is the broader term covering flower and other retail formats.</p></article>
            <article><h3>Flower</h3><p>Flower refers specifically to dried cannabis flower.</p></article>
            <article><h3>Bud</h3><p>Bud is a common informal term for cannabis flower.</p></article>
          </div>
          <p>Choosing the cannabis format you want to explore is more useful than worrying about which of these words you use.</p>
        </section>

        <section className={styles.visitSection} id="visit">
          <div>
            <p className={styles.kicker}>{store.hoursLabel || "Adults 19+"}</p>
            <h2>{store.storeName}</h2>
            <address>
              {store.streetAddress}<br />
              {store.city}, ON {store.postalCode}<br />
              {INTERSECTION}
            </address>
          </div>
          <div className={styles.visitFacts}>
            {store.hoursLabel && <strong>{store.hoursLabel}</strong>}
            <a href={`tel:${store.phoneIntl}`}>Phone: {store.phoneDisplay}</a>
            <a href={SITE_ORIGIN}>Website: janefinchcannabis.ca</a>
            <Link href={VISIT_PATH}>Walk-in hub</Link>
            <span>Adults 19+</span>
          </div>
          <p>Call ahead if one particular product is the reason for your trip. This page does not make a current inventory claim. The physical address is {FULL_ADDRESS} — not a second North York counter.</p>
        </section>

        <section className={styles.section}>
          <h2>Helpful {store.storeName} Guides</h2>
          <div className={styles.guideGrid}>{store.guides.map((guide) => <article className={styles.guideCard} key={guide.href}><h3>{guide.label}</h3><p>{guide.description}</p><Link href={guide.href}>Explore {guide.label}</Link></article>)}</div>
        </section>

        <section className={styles.section} id="faq"><h2>Frequently Asked Questions</h2><div className={styles.faqList}>{store.faq.map((item) => <article className={styles.faqItem} key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></article>)}</div></section>
      </main>
      <Footer />
    </>
  );
}
