import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BudtenderApplicationForm from "./BudtenderApplicationForm";
import styles from "./budtender.module.css";

export const metadata: Metadata = {
  title: { absolute: "Budtender And Manager Application | Jane Finch Cannabis" },
  description: "Apply online for budtender or manager opportunities at Jane Finch Cannabis in North York.",
  alternates: { canonical: "https://www.janefinchcannabis.ca/careers/budtender" },
};

export default function BudtenderCareersPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Jane Finch Cannabis Careers</span>
          <h1>Budtenders / Managers Wanted For The 24-Hour Counter</h1>
          <p>
            Jane Finch Cannabis is collecting applications from reliable people who can keep service smooth, speak clearly with customers, and stay steady during late-night or high-traffic shifts.
          </p>
          <p className={styles.onlineOnly}>Online applications only. Please do not call the store about hiring. If we think you may be a good fit, we will contact you.</p>
          <div className={styles.heroActions}>
            <a href="#application" className={styles.primaryAction}>Start Application</a>
            <Link href="/" className={styles.secondaryAction}>Back Home</Link>
          </div>
        </div>
        <aside className={styles.heroPanel}>
          <span>Counter Snapshot</span>
          <ul>
            <li>Reliable shifts and clear communication</li>
            <li>Comfort helping adults 19+ shop calmly</li>
            <li>Menu curiosity across flower and products</li>
            <li>Late-shift availability is a strong plus</li>
          </ul>
        </aside>
      </section>
      <section className={styles.contentSection}>
        <div className={styles.contentGrid}>
          <aside className={styles.infoPanel}>
            <h2>After You Apply</h2>
            <p>We review online applications first and contact candidates who match the counter pace, availability, and customer service fit.</p>
            <p>Selfie photo is required before submission.</p>
          </aside>
          <section id="application" className={styles.formPanel} aria-label="Jane Finch Cannabis application form">
            <div className={styles.formIntro}>
              <span className={styles.eyebrow}>Apply Online</span>
              <h2>Tell Us About You</h2>
              <p>Use real availability and practical answers. Short, honest, useful is better than polished fluff.</p>
            </div>
            <BudtenderApplicationForm />
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
