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
  NATIVE_CIG_LP_PATH,
  NIC_VAPE_FAQS,
  NIC_VAPE_H1,
  NIC_VAPE_LP_PATH,
  NIC_VAPE_MENU_PATH,
  NIC_VAPE_SEO_DESCRIPTION,
  NIC_VAPE_SEO_TITLE,
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
  title: { absolute: NIC_VAPE_SEO_TITLE },
  description: NIC_VAPE_SEO_DESCRIPTION,
  alternates: {
    canonical: `${SITE_ORIGIN}${NIC_VAPE_LP_PATH}`,
  },
  openGraph: {
    title: NIC_VAPE_SEO_TITLE,
    description: NIC_VAPE_SEO_DESCRIPTION,
    url: `${SITE_ORIGIN}${NIC_VAPE_LP_PATH}`,
  },
};

const AREA_TAGS = [
  "Jane & Finch",
  "Jane–Finch",
  "Jane & Sheppard",
  "North York",
  "Black Creek",
  "Finch West",
  "York University area",
] as const;

export default function NicotineVapeNorthYorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(NIC_VAPE_FAQS)) }}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Adults 19+ · Nicotine is addictive</p>
          <h1>{NIC_VAPE_H1}</h1>
          <p className={styles.heroAddress}>{FULL_ADDRESS}</p>
          <p className={styles.heroAddress}>
            {INTERSECTION} · <a href={`tel:${PHONE_INTL}`}>{PHONE_DISPLAY}</a>
          </p>
          <div className={styles.actions}>
            <Link href={NIC_VAPE_MENU_PATH} className={styles.primaryAction}>
              Browse nicotine vapes
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
            This page owns Jane Finch / North York nicotine vape neighbourhood intent. It does not
            replace the live nic-vape category or invent stock. THC vapes stay on a different menu.
            Walk-in hours stay on the 24-hour FAQ.
          </p>
          <SccHubLinks currentPath={NIC_VAPE_LP_PATH} heading="Cross-links from North York nicotine vape" />
        </section>

        <section className={styles.section}>
          <h2>Nicotine vape at Jane Finch Cannabis in North York</h2>
          <p>
            {STORE_NAME} keeps nicotine vapes in a dedicated category at {STREET_ADDRESS}. People
            searching nicotine vape around Jane &amp; Finch, Jane &amp; Sheppard, Black Creek, or
            the York University area should pin {FULL_ADDRESS} first, then open{" "}
            <Link href={NIC_VAPE_MENU_PATH}>/items/vapes</Link>. Adults 19+. Nicotine is addictive.
          </p>
          <p>
            The walk-in counter is {HOURS_LABEL.toLowerCase()}. Delivery is a separate 10 a.m.–10 p.m. window and is not a 24-hour nic-vape courier. Call {PHONE_DISPLAY} if one listed device is the reason you are coming in.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Keep nicotine vapes separate from THC vapes</h2>
          <p>
            Nicotine vapes live under /items/vapes. THC and cannabis vapour products live under{" "}
            <Link href="/items/vape-disposables">/items/vape-disposables</Link>. Do not treat those
            two lists as one shelf.
          </p>
          <p>
            The live nic-vape menu may show names such as Geek Promax, Geek Universe, Level X G2
            Pod, NEXA PIX, or OVNS formats when those lines are posted. Those names identify
            listings. They are not stock promises, puff-count guarantees, or a claim that one
            device is better than another.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Jane–Finch / North York walk-in for nic vape</h2>
          <p>
            Arrive at Jane St &amp; Sheppard Ave W. Plaza parking is in front of the store. This is
            the Jane Finch counter in North York — not a second North York shop and not a Jane
            Street storefront at a different intersection.
          </p>
          <p>
            For overnight walk-in, use the <Link href={OPEN_NOW_PATH}>24-hour North York FAQ</Link>.
            Native cigarettes stay on the{" "}
            <Link href={NATIVE_CIG_LP_PATH}>Jane Finch Native cigarettes page</Link>. Nicotine
            pouches, when listed, stay on the cigarette category rather than a pouches LP this
            wave.
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
          <h2>FAQ: nicotine vape North York</h2>
          <div className={styles.faqList}>
            {NIC_VAPE_FAQS.map((item) => (
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
            <span>Adults 19+. Nicotine is addictive.</span>
          </div>
          <p>
            Name, address, and phone match the homepage. The Google Business Profile website for
            this store is the homepage root — not this nicotine vape page and not the live menu.
          </p>
        </section>

        <section className={styles.section}>
          <h2>After you confirm the nic-vape category</h2>
          <p>
            Use the <Link href={NIC_VAPE_MENU_PATH}>nicotine vape menu</Link>, the{" "}
            <Link href="/">homepage</Link>, the <Link href={VISIT_PATH}>visit hub</Link>, and the{" "}
            <Link href="/weed-dispensary-north-york">North York cannabis store page</Link>. Courier
            hours stay on <Link href={DELIVERY_LP_PATH}>North York cannabis delivery</Link>. A
            product-card resource still lives at{" "}
            <Link href="/info/nicotine-vapes-north-york">Nicotine Vapes North York</Link>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
