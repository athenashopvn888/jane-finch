import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../components/GBPLandingPage.module.css";
import {
  DELIVERY_FAQS,
  DELIVERY_H1,
  DELIVERY_HOURS_LABEL,
  DELIVERY_HOURS_SHORT,
  DELIVERY_LP_PATH,
  DELIVERY_MENU_PATH,
  DELIVERY_SEO_DESCRIPTION,
  DELIVERY_SEO_TITLE,
  FULL_ADDRESS,
  HOURS_LABEL,
  INTERSECTION,
  OPEN_NOW_PATH,
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
  title: { absolute: DELIVERY_SEO_TITLE },
  description: DELIVERY_SEO_DESCRIPTION,
  alternates: {
    canonical: `${SITE_ORIGIN}${DELIVERY_LP_PATH}`,
  },
  openGraph: {
    title: DELIVERY_SEO_TITLE,
    description: DELIVERY_SEO_DESCRIPTION,
    url: `${SITE_ORIGIN}${DELIVERY_LP_PATH}`,
  },
};

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

const ORDER_STEPS = [
  {
    label: "Browse the delivery menu",
    detail: "Open the Jane Finch Cannabis flower delivery menu and note the items you want. Listings can change.",
  },
  {
    label: "Start LIVE ORDER",
    detail: "Use LIVE ORDER on the delivery menu to connect with the Jane Finch Cannabis dispatcher. Choose new or returning customer.",
  },
  {
    label: "Send the order details",
    detail: "New customers complete the private ID review in Web Chat. Have the drop-off address ready.",
  },
  {
    label: "Wait for confirmation",
    detail: "The dispatcher confirms range, stock, the $60 product minimum, the $10 fee, and timing before checkout.",
  },
] as const;

const AREA_TAGS = [
  "Jane–Finch",
  "Jane & Sheppard",
  "North York",
  "Jane Street",
  "Finch West",
  "Black Creek",
  "Downsview",
  "York University area",
  "Toronto",
  "Vaughan",
  "Etobicoke",
] as const;

const deliveryServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Jane Finch Cannabis delivery",
  serviceType: "Cannabis delivery",
  provider: { "@id": `${SITE_ORIGIN}/#store` },
  url: `${SITE_ORIGIN}${DELIVERY_LP_PATH}`,
  areaServed: [
    { "@type": "City", name: "North York" },
    { "@type": "City", name: "Toronto" },
    { "@type": "Place", name: "Jane and Finch" },
  ],
  hoursAvailable: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: WEEKDAYS,
    opens: "10:00",
    closes: "22:00",
  },
  offers: {
    "@type": "Offer",
    name: "Jane Finch Cannabis delivery fee",
    price: "10.00",
    priceCurrency: "CAD",
    eligibleTransactionVolume: {
      "@type": "PriceSpecification",
      name: "Product minimum",
      minPrice: "60.00",
      priceCurrency: "CAD",
    },
  },
};

export default function CannabisDeliveryNorthYorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(DELIVERY_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(deliveryServiceJsonLd) }}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{DELIVERY_HOURS_LABEL} · Adults 19+</p>
          <h1>{DELIVERY_H1}</h1>
          <p className={styles.heroAddress}>{FULL_ADDRESS}</p>
          <p className={styles.heroAddress}>
            {INTERSECTION} · <a href={`tel:${PHONE_INTL}`}>{PHONE_DISPLAY}</a>
          </p>
          <div className={styles.actions}>
            <Link href={DELIVERY_MENU_PATH} className={styles.primaryAction}>
              Order on the delivery menu
            </Link>
            <Link href="/" className={styles.secondaryAction}>
              Homepage menu
            </Link>
            <Link href={VISIT_PATH} className={styles.secondaryAction}>
              Walk-in hub
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Homepage, visit hub, North York weed page, and flower tiers</h2>
          <p>
            This page owns Jane Finch / North York cannabis delivery intent. It does not replace the
            homepage NAP card, the 24-hour walk-in FAQ, or the live delivery menu. Flower shelves
            stay on their own routes.
          </p>
          <SccHubLinks currentPath={DELIVERY_LP_PATH} heading="Cross-links from North York delivery" />
        </section>

        <section className={styles.section}>
          <h2>Jane Finch cannabis delivery vs 24-hour walk-in</h2>
          <p>
            {STORE_NAME} at {STREET_ADDRESS} is a 24 hour walk-in dispensary in North York. That
            overnight clock is for people coming to the Jane Street counter — {HOURS_LABEL.toLowerCase()}.
            Delivery is a separate courier window: {DELIVERY_HOURS_LABEL.toLowerCase()}. LIVE ORDER
            does not run overnight.
          </p>
          <p>
            If you want to see the product and pay at the counter, walk in at {FULL_ADDRESS}. If you
            want a drop-off during delivery hours, use the{" "}
            <Link href={DELIVERY_MENU_PATH}>delivery menu</Link>. A 24-hour search should open the{" "}
            <Link href={OPEN_NOW_PATH}>24-hour North York FAQ</Link>, not this courier page.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Delivery hours from Jane Finch Cannabis</h2>
          <p>
            Site truth for Jane Finch Cannabis delivery is 10:00 a.m. to 10:00 p.m. daily. That is
            the same window on the live menu. It is not a 24-hour courier and it does not follow the
            walk-in 00:00–24:00 listing.
          </p>
          <div className={styles.hoursTable}>
            {WEEKDAYS.map((day) => (
              <div className={styles.hoursRow} key={day}>
                <span>{day}</span>
                <span>{DELIVERY_HOURS_SHORT}</span>
              </div>
            ))}
          </div>
          <p>
            $60 product minimum. $10 delivery fee. The dispatcher confirms range, stock, and timing
            for each request. Call {PHONE_DISPLAY} if one listed item is the whole reason for the
            order.
          </p>
        </section>

        <section className={styles.section} id="how-to-order">
          <h2>How to order Jane Finch Cannabis delivery</h2>
          <p>
            Delivery orders go through the Jane Finch Cannabis dispatcher — not a second website
            and not a GBP menu deep link. The store website stays{" "}
            <a href={SITE_ORIGIN}>https://janefinchcannabis.ca/</a>.
          </p>
          <div className={styles.cardGrid}>
            {ORDER_STEPS.map((step, index) => (
              <article className={styles.card} key={step.label}>
                <span>
                  {index + 1}. {step.label}
                </span>
                <small>{step.detail}</small>
              </article>
            ))}
          </div>
          <p>
            Ready to order? Open the{" "}
            <Link href={DELIVERY_MENU_PATH}>Jane Finch Cannabis delivery menu</Link> and start LIVE
            ORDER during the 10 a.m.–10 p.m. window.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Jane–Finch / North York delivery area</h2>
          <p>
            Delivery is coordinated from the Jane Street store in the Jane–Finch corridor — Jane St
            &amp; Sheppard Ave W, North York. Neighbours around Jane–Finch, Jane &amp; Sheppard,
            Black Creek, Downsview, Finch West, and the York University area can request a drop-off
            when the dispatcher confirms the address.
          </p>
          <p>
            A practical planning area is about 50 km from Jane Street and Finch Avenue, including
            North York, Toronto, Vaughan, Etobicoke, Brampton, and Mississauga. Longer trips are
            not guaranteed. This is not a second storefront in Vaughan or anywhere else — the
            physical pin stays {FULL_ADDRESS}.
          </p>
          <div className={styles.areaList}>
            {AREA_TAGS.map((area) => (
              <span className={styles.areaTag} key={area}>
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.section} id="faq">
          <h2>FAQ: cannabis delivery North York</h2>
          <div className={styles.faqList}>
            {DELIVERY_FAQS.map((item) => (
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
            <strong>{DELIVERY_HOURS_LABEL}</strong>
            <span>Walk-in: {HOURS_LABEL} (separate)</span>
            <a href={`tel:${PHONE_INTL}`}>Phone: {PHONE_DISPLAY}</a>
            <a href={SITE_ORIGIN}>Website: janefinchcannabis.ca</a>
            <Link href="/">Homepage</Link>
            <Link href="/weed-dispensary-north-york">North York store page</Link>
            <Link href={VISIT_PATH}>Walk-in hub</Link>
            <span>Adults 19+</span>
          </div>
          <p>
            Name, address, and phone match the homepage. The Google Business Profile website for
            this store is the homepage root — not this delivery page and not the live menu.
          </p>
        </section>

        <section className={styles.section}>
          <h2>After you confirm delivery vs walk-in</h2>
          <p>
            Use the delivery menu to order, or the homepage if you are coming to the counter. Flower
            shelves:{" "}
            <Link href="/exotic-weed">Exotic Weed</Link>,{" "}
            <Link href="/premium-weed">Premium Weed</Link>,{" "}
            <Link href="/aaa-weed">AAA+ Weed</Link>,{" "}
            <Link href="/aa-weed">AA Weed</Link>, or{" "}
            <Link href="/budget-weed">Budget Weed</Link>
            . Walk-in detail stays on the{" "}
            <Link href="/weed-dispensary-north-york">North York cannabis store page</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
