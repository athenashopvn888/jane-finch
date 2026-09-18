import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./contact.module.css";
import {
  FULL_ADDRESS,
  HOURS_LABEL,
  HOURS_SHORT,
  INTERSECTION,
  PHONE_DISPLAY,
  PHONE_INTL,
  SITE_ORIGIN,
  STORE_NAME,
} from "../lib/nap";

export const metadata: Metadata = {
  title: "Contact Us — 2728 Jane St, North York",
  description:
    "Visit Jane Finch Cannabis at 2728 Jane St, North York, ON M3L 2G6. Open 24 hours, 7 days. Call +1 (437) 524-9336. Walk-ins welcome.",
  alternates: {
    canonical: `${SITE_ORIGIN}/contact`,
  },
  openGraph: {
    title: "Contact Jane Finch Cannabis — North York Dispensary",
    description:
      "2728 Jane St, North York (Jane & Sheppard). Open 24 hours, 7 days. Call +1 (437) 524-9336.",
  },
};

export default function ContactPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero} style={{ paddingTop: "92px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <img src="/banners/08_Contact_Us.webp" alt="Contact Jane Finch Cannabis in North York" style={{ width: "100%", height: "auto", display: "block", borderRadius: "var(--radius-lg)" }} />
          <h1 className={styles.heroTitle} style={{ marginTop: "28px" }}>Contact {STORE_NAME}</h1>
          <p className={styles.heroSub}>{FULL_ADDRESS} · {INTERSECTION} · {HOURS_LABEL}</p>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoGrid}>
            {/* Location */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <h2 className={styles.infoTitle}>Location</h2>
              <p className={styles.infoText}>
                2728 Jane St
                <br />
                North York, ON M3L 2G6
                <br />
                <span className={styles.infoMuted}>{INTERSECTION}</span>
              </p>
            </div>

            {/* Hours */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🕒</div>
              <h2 className={styles.infoTitle}>Hours</h2>
              <div className={styles.hoursTable}>
                <div className={styles.hoursRow}><span>Monday</span><span className={styles.hoursTime}>{HOURS_SHORT}</span></div>
                <div className={styles.hoursRow}><span>Tuesday</span><span className={styles.hoursTime}>{HOURS_SHORT}</span></div>
                <div className={styles.hoursRow}><span>Wednesday</span><span className={styles.hoursTime}>{HOURS_SHORT}</span></div>
                <div className={styles.hoursRow}><span>Thursday</span><span className={styles.hoursTime}>{HOURS_SHORT}</span></div>
                <div className={styles.hoursRow}><span>Friday</span><span className={styles.hoursTime}>{HOURS_SHORT}</span></div>
                <div className={styles.hoursRow}><span>Saturday</span><span className={styles.hoursTime}>{HOURS_SHORT}</span></div>
                <div className={styles.hoursRow}><span>Sunday</span><span className={styles.hoursTime}>{HOURS_SHORT}</span></div>
              </div>
              <div className={styles.openBadge}>
                <div className={styles.openDot} />
                {HOURS_LABEL}
              </div>
            </div>

            {/* Phone */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📞</div>
              <h2 className={styles.infoTitle}>Phone</h2>
              <p className={styles.infoText}>
                <a href={`tel:${PHONE_INTL}`}>{PHONE_DISPLAY}</a>
                <br />
                <span className={styles.infoMuted}>Website: </span>
                <a href={SITE_ORIGIN}>janefinchcannabis.ca</a>
              </p>
              <p className={styles.infoMuted}>
                Call if one product is the reason for the trip. Listings can change.
              </p>
            </div>

            {/* Walk-in */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🔥</div>
              <h2 className={styles.infoTitle}>Walk In</h2>
              <p className={styles.infoText}>
                No appointment needed.
                <br />
                Just walk in and our staff will
                <br />
                help you find the perfect strain.
              </p>
              <p className={styles.infoMuted}>
                <Link href="/visit">2728 Jane St walk-in hub</Link>
                {" · "}
                <Link href="/24-hour-dispensary-north-york">24-hour open-now FAQ</Link>
              </p>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Browse current flower tiers
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Knowledgeable budtenders
                </div>
                <div className={styles.featureItem}>
                  <span className={styles.featureCheck}>✓</span>
                  Debit &amp; cash accepted
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className={styles.mapSection}>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
