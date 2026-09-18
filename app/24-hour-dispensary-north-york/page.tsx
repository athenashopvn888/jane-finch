import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../components/GBPLandingPage.module.css";
import {
  FULL_ADDRESS,
  HOURS_LABEL,
  HOURS_SHORT,
  INTERSECTION,
  OPEN_NOW_FAQS,
  OPEN_NOW_H1,
  OPEN_NOW_PATH,
  OPEN_NOW_SEO_DESCRIPTION,
  OPEN_NOW_SEO_TITLE,
  PHONE_DISPLAY,
  PHONE_INTL,
  SITE_ORIGIN,
  STORE_NAME,
  STREET_ADDRESS,
  VISIT_PATH,
  faqJsonLd,
} from "../lib/nap";
import SccHubLinks from "../components/SccHubLinks";

export const metadata: Metadata = {
  title: { absolute: OPEN_NOW_SEO_TITLE },
  description: OPEN_NOW_SEO_DESCRIPTION,
  alternates: {
    canonical: `${SITE_ORIGIN}${OPEN_NOW_PATH}`,
  },
  openGraph: {
    title: OPEN_NOW_SEO_TITLE,
    description: OPEN_NOW_SEO_DESCRIPTION,
    url: `${SITE_ORIGIN}${OPEN_NOW_PATH}`,
  },
};

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export default function OpenNowFaqPage() {
  return (
    <>
      {/* FAQPage JSON-LD matches the visible Q&A below. Store hours stay 00:00–24:00 on the homepage CannabisStore. GBP Website remains the homepage root. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(OPEN_NOW_FAQS)) }}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{HOURS_LABEL} · Adults 19+</p>
          <h1>{OPEN_NOW_H1}</h1>
          <p className={styles.heroAddress}>{FULL_ADDRESS}</p>
          <p className={styles.heroAddress}>
            {INTERSECTION} · <a href={`tel:${PHONE_INTL}`}>{PHONE_DISPLAY}</a>
          </p>
          <div className={styles.actions}>
            <Link href="/" className={styles.primaryAction}>
              Homepage menu
            </Link>
            <Link href="/weed-dispensary-north-york" className={styles.secondaryAction}>
              North York store page
            </Link>
            <Link href={VISIT_PATH} className={styles.secondaryAction}>
              Walk-in hub
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Walk-in hubs and five flower tiers</h2>
          <p>
            This FAQ owns 24-hour / open-now walk-in questions. Delivery stays 10 a.m. to 10 p.m.
            and is not a 24-hour courier. For the pin, use the visit hub. For flower shelves, use
            the five tier pages.
          </p>
          <SccHubLinks currentPath={OPEN_NOW_PATH} heading="Cross-links from the 24-hour FAQ" />
        </section>

        <section className={styles.section}>
          <h2>Hours truth</h2>
          <p>
            {STORE_NAME} is a 24 hour dispensary in North York. The listed walk-in hours are{" "}
            {HOURS_LABEL.toLowerCase()} at {STREET_ADDRESS}. That is the same 00:00–24:00 window on
            the store listing — not a slogan for a shorter counter.
          </p>
          <div className={styles.hoursTable}>
            {WEEKDAYS.map((day) => (
              <div className={styles.hoursRow} key={day}>
                <span>{day}</span>
                <span>{HOURS_SHORT}</span>
              </div>
            ))}
          </div>
          <p>
            Delivery is a different clock: 10 a.m. to 10 p.m. daily. A 24 hour search is about the
            Jane Street counter, not a 24-hour courier.
          </p>
        </section>

        <section className={styles.section}>
          <h2>North York open now</h2>
          <p>
            “Dispensary near me open now” and “24/7 dispensary near me” in North York map to this
            storefront. Walk-in is open now at any hour — overnight included. Staff are at the Jane
            Street counter after dark as well as during the day.
          </p>
          <p>
            If a map card shows closed, a different street, or a delivery-only listing, ignore it
            and use {FULL_ADDRESS}. Call {PHONE_DISPLAY} if you want open-now confirmed before you
            leave. The website for this store stays{" "}
            <a href={SITE_ORIGIN}>https://janefinchcannabis.ca/</a> — the homepage root, not this
            FAQ and not a menu deep link.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Jane–Finch arrival</h2>
          <p>
            The pin is {STREET_ADDRESS}, North York, ON M3L 2G6, at {INTERSECTION} in the Jane–Finch
            corridor. Plaza parking is in front of the store. TTC buses run Jane Street and nearby
            Finch Avenue.
          </p>
          <p>
            Late-night arrival is the same door as daytime. Bring valid government photo ID. Adults
            19+ only. For parking, transit, and walk-in vs delivery, use the{" "}
            <Link href={VISIT_PATH}>2728 Jane St walk-in hub</Link>. Then come to the counter — no
            appointment.
          </p>
        </section>

        <section className={styles.section} id="faq">
          <h2>FAQ: 24 hour dispensary North York</h2>
          <div className={styles.faqList}>
            {OPEN_NOW_FAQS.map((item) => (
              <article className={styles.faqItem} key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.visitSection} id="nap">
          <div>
            <p className={styles.kicker}>Homepage NAP</p>
            <h2>{STORE_NAME}</h2>
            <address>
              {STREET_ADDRESS}
              <br />
              North York, ON M3L 2G6
              <br />
              {INTERSECTION}
            </address>
          </div>
          <div className={styles.visitFacts}>
            <strong>{HOURS_LABEL}</strong>
            <a href={`tel:${PHONE_INTL}`}>Phone: {PHONE_DISPLAY}</a>
            <a href={SITE_ORIGIN}>Website: janefinchcannabis.ca</a>
            <Link href="/">Homepage</Link>
            <Link href="/weed-dispensary-north-york">North York store page</Link>
            <Link href={VISIT_PATH}>Walk-in hub</Link>
            <span>Adults 19+</span>
          </div>
          <p>
            Name, address, and phone match the homepage. The Google Business Profile website for
            this store is the homepage root — not this 24-hour FAQ and not the North York landing
            page.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
