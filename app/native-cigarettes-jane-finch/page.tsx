import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styles from "../components/GBPLandingPage.module.css";
import {
  DELIVERY_LP_PATH,
  FULL_ADDRESS,
  HOURS_LABEL,
  INTERSECTION,
  NATIVE_CIG_FAQS,
  NATIVE_CIG_H1,
  NATIVE_CIG_LP_PATH,
  NATIVE_CIG_MENU_PATH,
  NATIVE_CIG_SEO_DESCRIPTION,
  NATIVE_CIG_SEO_TITLE,
  NIC_VAPE_LP_PATH,
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
  title: { absolute: NATIVE_CIG_SEO_TITLE },
  description: NATIVE_CIG_SEO_DESCRIPTION,
  alternates: {
    canonical: `${SITE_ORIGIN}${NATIVE_CIG_LP_PATH}`,
  },
  openGraph: {
    title: NATIVE_CIG_SEO_TITLE,
    description: NATIVE_CIG_SEO_DESCRIPTION,
    url: `${SITE_ORIGIN}${NATIVE_CIG_LP_PATH}`,
  },
};

const AREA_TAGS = [
  "Jane–Finch",
  "Jane & Sheppard",
  "Jane Street",
  "Black Creek",
  "North York",
  "Finch West",
  "Downsview",
] as const;

export default function NativeCigarettesJaneFinchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(NATIVE_CIG_FAQS)) }}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{HOURS_LABEL} · Adults 19+</p>
          <h1>{NATIVE_CIG_H1}</h1>
          <p className={styles.heroAddress}>{FULL_ADDRESS}</p>
          <p className={styles.heroAddress}>
            {INTERSECTION} · <a href={`tel:${PHONE_INTL}`}>{PHONE_DISPLAY}</a>
          </p>
          <div className={styles.actions}>
            <Link href={NATIVE_CIG_MENU_PATH} className={styles.primaryAction}>
              Open the cigarette menu
            </Link>
            <Link href="/" className={styles.secondaryAction}>
              Homepage
            </Link>
            <Link href={VISIT_PATH} className={styles.secondaryAction}>
              Walk-in hub
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Homepage, visit hub, North York store, and 24-hour FAQ</h2>
          <p>
            This page owns Jane Finch Native cigarette neighbourhood intent. It does not replace the
            live cigarette category, the homepage NAP card, or the 24-hour walk-in FAQ. Flower
            shelves and nicotine vapes stay on their own routes.
          </p>
          <SccHubLinks currentPath={NATIVE_CIG_LP_PATH} heading="Cross-links from Jane Finch Native cigarettes" />
        </section>

        <section className={styles.section}>
          <h2>Native cigarettes at the Jane–Finch counter</h2>
          <p>
            {STORE_NAME} at {STREET_ADDRESS} lists Native cigarettes in the cigarette category.
            Neighbours around Jane–Finch, Jane &amp; Sheppard, Black Creek, and Finch West can walk
            in at {FULL_ADDRESS} any hour — {HOURS_LABEL.toLowerCase()}. This is a retail counter
            page for adults 19+, not a medical page and not a ranking claim.
          </p>
          <p>
            Tobacco and nicotine products are addictive. Bring valid government photo ID. Brand
            names, carton notes, and posted prices can change. Use the{" "}
            <Link href={NATIVE_CIG_MENU_PATH}>cigarette menu</Link> for today’s listings, then
            confirm at the Jane Street counter.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How to shop the Jane Finch cigarette category</h2>
          <p>
            Open the cigarette category first. Listings may include carton-style Native smoke names
            such as Canadian Lights, Canadian Full, BB Lights, BB Full, Canadian Goose Lights, or
            Canadian Classics Silver when those lines are posted. Older resource copy may also
            mention Putters or Menthol — only trust what the live menu still shows.
          </p>
          <p>
            Keep flower, pre-rolls, edibles, THC vapes, and concentrates on separate lists. Nicotine
            pouches and grabba, when listed, sit on the same cigarette category rather than a second
            neighbourhood LP this wave. Call {PHONE_DISPLAY} if one carton or brand is the whole
            reason for the trip.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Jane–Finch / Jane &amp; Sheppard walk-in</h2>
          <p>
            The pin is Jane Street at Sheppard Ave W in North York. Use this Jane Finch storefront
            for Jane–Finch and Jane &amp; Sheppard cigarette walk-in. Do not mix this address with a
            different Jane Street intersection farther south.
          </p>
          <p>
            Walk-in is 24 hours. Delivery is a separate 10 a.m.–10 p.m. courier and is not a
            24-hour smoke drop-off. A late-night cigarette visit should use the{" "}
            <Link href={OPEN_NOW_PATH}>24-hour North York FAQ</Link> for hours truth, then this
            page for the category path.
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
          <h2>FAQ: Native cigarettes Jane Finch</h2>
          <div className={styles.faqList}>
            {NATIVE_CIG_FAQS.map((item) => (
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
            this store is the homepage root — not this cigarette page and not the live menu.
          </p>
        </section>

        <section className={styles.section}>
          <h2>After you confirm the cigarette category</h2>
          <p>
            Use the <Link href={NATIVE_CIG_MENU_PATH}>cigarette menu</Link> for current names, the{" "}
            <Link href="/">homepage</Link> for NAP, the{" "}
            <Link href={VISIT_PATH}>visit hub</Link> for arrival, and the{" "}
            <Link href="/weed-dispensary-north-york">North York cannabis store page</Link> for weed
            intent. Nicotine vapes stay on the{" "}
            <Link href={NIC_VAPE_LP_PATH}>North York nicotine vape page</Link>. Courier hours stay
            on <Link href={DELIVERY_LP_PATH}>North York cannabis delivery</Link>. An older resource
            still lives at{" "}
            <Link href="/info/native-cigarettes-north-york">Native cigarettes North York</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
