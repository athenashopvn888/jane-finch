import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../components/GBPLandingPage.module.css";
import {
  FULL_ADDRESS,
  HOURS_LABEL,
  INTERSECTION,
  OPEN_NOW_PATH,
  PHONE_DISPLAY,
  PHONE_INTL,
  SITE_ORIGIN,
  STORE_NAME,
  STREET_ADDRESS,
  VISIT_FAQS,
  VISIT_H1,
  VISIT_PATH,
  VISIT_SEO_DESCRIPTION,
  VISIT_SEO_TITLE,
  faqJsonLd,
} from "../lib/nap";

export const metadata: Metadata = {
  title: { absolute: VISIT_SEO_TITLE },
  description: VISIT_SEO_DESCRIPTION,
  alternates: {
    canonical: `${SITE_ORIGIN}${VISIT_PATH}`,
  },
  openGraph: {
    title: VISIT_SEO_TITLE,
    description: VISIT_SEO_DESCRIPTION,
    url: `${SITE_ORIGIN}${VISIT_PATH}`,
  },
};

export default function VisitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(VISIT_FAQS)) }}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{HOURS_LABEL} · Adults 19+</p>
          <h1>{VISIT_H1}</h1>
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
            <Link href={OPEN_NOW_PATH} className={styles.secondaryAction}>
              24-hour FAQ
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>2728 Jane St — Jane–Finch intersection clarity</h2>
          <p>
            Jane Finch Cannabis is the walk-in dispensary at {STREET_ADDRESS}, North York, ON M3L 2G6.
            The pin is on Jane Street at the {INTERSECTION} area — not a second counter on Finch Avenue
            and not a mall kiosk. People searching “dispensary near me” around Jane–Finch, Jane &amp;
            Sheppard, Black Creek, Downsview, or Finch West should use this Jane Street storefront.
          </p>
          <p>
            If a map card shows a different street or a delivery-only listing, ignore it and use{" "}
            {FULL_ADDRESS}. Call {PHONE_DISPLAY} if you want the pin confirmed before you leave.
          </p>
        </section>

        <section className={styles.section}>
          <h2>North York walk-in vs delivery</h2>
          <p>
            Walk-in is the default for a near-me search. The counter at {STREET_ADDRESS} is open 24
            hours, 7 days. No appointment. Adults 19+ with valid government photo ID.
          </p>
          <p>
            Delivery is a separate service with its own menu, a $60 product minimum, a $10 delivery
            fee, and ordering hours from 10 a.m. to 10 p.m. It does not change the physical address
            and it is not a 24-hour courier. If you want to see the product and pay at the counter,
            walk in. If you want a drop-off during delivery hours, use the{" "}
            <Link href="/delivery">delivery menu</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Open now / hours</h2>
          <p>
            {STORE_NAME} is {HOURS_LABEL.toLowerCase()}. A “dispensary near me open now” search in
            North York can use this storefront at any hour. Staff are at the Jane Street counter
            overnight as well as during the day. For the dedicated 24 hour dispensary North York
            questions, use the <Link href={OPEN_NOW_PATH}>open-now FAQ</Link>.
          </p>
          <p>
            Delivery “open now” is different: LIVE ORDER only runs 10 a.m. to 10 p.m. The homepage
            website for this store stays <a href={SITE_ORIGIN}>https://janefinchcannabis.ca/</a> —
            not a menu deep link.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Transit &amp; parking tips</h2>
          <p>
            Plaza parking is directly in front of the store on Jane Street. You do not need to hunt
            for a side lot. If you are arriving by TTC, buses run Jane Street and nearby Finch
            Avenue. Shoppers coming from the York University area or Highway 400 / Pioneer Village
            can use the local guides, then finish at this pin.
          </p>
          <p>
            Bring photo ID. If one listed item is the whole reason for the trip, call{" "}
            {PHONE_DISPLAY} first — menus change.
          </p>
        </section>

        <section className={styles.section} id="faq">
          <h2>FAQ: cannabis store North York</h2>
          <div className={styles.faqList}>
            {VISIT_FAQS.map((item) => (
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
            <span>Adults 19+</span>
          </div>
          <p>
            Name, address, and phone match the homepage. The Google Business Profile website for
            this store is the homepage root — not this visit page and not the North York landing
            page.
          </p>
        </section>

        <section className={styles.section}>
          <h2>After the pin is confirmed</h2>
          <p>
            Use the homepage for the current menu, then open one category if you already know the
            format. Flower shoppers can start with{" "}
            <Link href="/budget-weed">Budget Weed</Link> or the{" "}
            <Link href="/weed-dispensary-north-york">North York walk-in page</Link>. Keep product
            browsing secondary to the address.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
