import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "../components/GBPLandingPage.module.css";
import {
  JFC,
  SITE_ORIGIN,
  STORE_ID,
  VISIT_FAQS,
  faqPageJsonLd,
  jsonLdScript,
} from "../lib/jfcLocal";

const title = "How to Reach Jane Finch Cannabis | Jane–Finch / Black Creek";
const description =
  "Route notes for Jane Finch Cannabis at 2728 Jane St: Jane Street from Finch, TTC on Jane, plaza parking, and the walk-in entrance. Adults 19+. Open 24 hours.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: `${SITE_ORIGIN}/visit` },
  openGraph: {
    url: `${SITE_ORIGIN}/visit`,
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export default function VisitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(VISIT_FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_ORIGIN}/visit#page`,
            url: `${SITE_ORIGIN}/visit`,
            name: title,
            isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
            about: { "@id": STORE_ID },
          }),
        }}
      />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Jane–Finch / Black Creek · Adults 19+</p>
          <h1>How to reach Jane Finch Cannabis on Jane Street</h1>
          <p className={styles.heroAddress}>{JFC.addressLine}</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href={JFC.mapsDirUrl} target="_blank" rel="noreferrer">
              Open directions
            </a>
            <Link className={styles.secondaryAction} href="/">
              Jane–Finch visit hub
            </Link>
          </div>
        </section>

        <section className={styles.section}>
          <h2>2728 Jane St is a Jane Street plaza stop</h2>
          <p>
            Jane Finch Cannabis is a single walk-in counter at 2728 Jane St, North York, ON M3L 2G6.
            The last road is Jane Street. The store sits in the Jane–Finch / Black Creek neighbourhood,
            south of Finch Avenue West, with the door on the Jane Street face of the plaza — not inside
            a shopping mall and not on Finch Avenue itself.
          </p>
          <p>
            Use this page to finish the last kilometre. The homepage remains the visit hub for hours,
            the live menu, and the same NAP. This URL is a how-to-arrive guide only.
          </p>
        </section>

        <section className={styles.visitSection} id="nap">
          <div>
            <p className={styles.kicker}>{JFC.hoursLabel}</p>
            <h2>{JFC.brand}</h2>
            <address>
              {JFC.streetAddress}
              <br />
              {JFC.city}, {JFC.region} {JFC.postalCode}
            </address>
          </div>
          <div className={styles.visitFacts}>
            <strong>{JFC.hoursDetail}</strong>
            <a href={`tel:${JFC.phoneIntl}`}>Phone: {JFC.phoneDisplay}</a>
            <span>Adults 19+ with government photo ID</span>
            <a href={JFC.mapsSearchUrl} target="_blank" rel="noreferrer">
              Open the map pin
            </a>
          </div>
          <p>
            Call if one product decides the trip. This page does not list inventory, prices, or a
            delivery radius.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Map and plaza lot</h2>
          <div className={styles.mapWrapper}>
            <iframe
              className={styles.mapIframe}
              title="Map of Jane Finch Cannabis at 2728 Jane St"
              src={JFC.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p>
            Plaza parking is directly in front of the store. Pull into the Jane Street lot, then walk
            to the Jane Finch Cannabis entrance on that same plaza frontage.
          </p>
        </section>

        <section className={styles.section}>
          <h2>From Finch Avenue West</h2>
          <p>
            If you are already on Finch Avenue West — including trips that started near Finch West
            Station or the Black Creek Pioneer Village / York University side of the corridor — get
            onto Jane Street and stay on Jane until 2728. You will pass the Finch intersection first;
            the plaza is further south on Jane, still inside the Jane–Finch neighbourhood rather than
            downtown North York Centre.
          </p>
          <p>
            Do not look for a Finch Avenue storefront. The legal address and the door are on Jane Street.
          </p>
        </section>

        <section className={styles.section}>
          <h2>From Sheppard Avenue West and south Jane</h2>
          <p>
            Coming north on Jane Street from Sheppard Avenue West, remain on Jane. 2728 Jane St is
            north of Sheppard and south of Finch. Watch the west side of Jane for the plaza lot in
            front of the store. Overnight visits use this same Jane Street approach; the listed hours
            are 24 hours, seven days a week.
          </p>
        </section>

        <section className={styles.section}>
          <h2>TTC along Jane and Finch</h2>
          <p>
            The 35 Jane bus is the street-level route that follows Jane Street past the store. Buses
            on Finch Avenue West cover the east–west Finch spine. Transfer toward Jane Street, then
            walk the last stretch to the plaza. Stop numbers change; confirm the current TTC trip
            rather than treating this paragraph as a timetable.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What to bring</h2>
          <p>
            Adults 19+ only. Bring valid government photo ID to the door. No appointment is needed.
            If you already know the category you want — flower tier, pre-rolls, edibles, vapes — open
            the current homepage menu before you travel. Staff can only speak to what is on the counter
            that day.
          </p>
          <p>
            Delivery, when you want it, is a different path with its own 10:00 a.m. to 10:00 p.m.
            ordering window. It does not replace walking into 2728 Jane St.
          </p>
        </section>

        <section className={styles.section} id="faq">
          <h2>Jane–Finch arrival questions</h2>
          <div className={styles.faqList}>
            {VISIT_FAQS.map((faq) => (
              <article className={styles.faqItem} key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
