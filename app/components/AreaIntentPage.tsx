import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./GBPLandingPage.module.css";

const SAME_SITE_LINK = /\[([^\]]+)\]\((\/(?!\/)[^)\s]*)\)/g;

function renderSameSiteLinks(paragraph: string): ReactNode {
  SAME_SITE_LINK.lastIndex = 0;
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let count = 0;
  while ((match = SAME_SITE_LINK.exec(paragraph)) !== null) {
    const href = match[2];
    if (href.includes("..") || href.includes("\\")) continue;
    if (match.index > last) nodes.push(paragraph.slice(last, match.index));
    nodes.push(<Link key={`${href}-${count}`} href={href}>{match[1]}</Link>);
    last = SAME_SITE_LINK.lastIndex;
    count += 1;
  }
  if (count === 0) return paragraph;
  if (last < paragraph.length) nodes.push(paragraph.slice(last));
  return nodes;
}

export type AreaIntentPageProps = {
  eyebrow: string;
  h1: string;
  addressLine: string;
  intro: string[];
  sections?: Array<{ heading: string; paragraphs: string[] }>;
  storeHref: string;
  storeLabel: string;
  menuHref?: string;
  mapAddress?: string;
  faq?: string;
  relatedLinks?: Array<{ href: string; label: string }>;
};

export function AreaIntentPage({ eyebrow, h1, addressLine, intro, sections = [], storeHref, storeLabel, menuHref = "/", mapAddress, faq, relatedLinks = [] }: AreaIntentPageProps) {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{h1}</h1>
          <p className={styles.heroAddress}>{addressLine}</p>
          <div className={styles.actions}>
            <Link href={menuHref} className={styles.primaryAction}>Check the Current Menu</Link>
            <Link href={storeHref} className={styles.secondaryAction}>{storeLabel}</Link>
          </div>
        </section>
        <section className={styles.section}>
          {intro.map((paragraph) => <p key={paragraph}>{renderSameSiteLinks(paragraph)}</p>)}
        </section>
        {sections.map((section) => (
          <section className={styles.section} key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        {mapAddress ? (
          <section className={styles.section}>
            <h2>Map and Address</h2>
            <p>{mapAddress}</p>
            <p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`} target="_blank" rel="noreferrer">Open this destination in Google Maps</a></p>
          </section>
        ) : null}
        {faq ? (
          <section className={styles.section}>
            <h2>Frequently Asked Question</h2>
            <p>{faq}</p>
          </section>
        ) : null}
        {relatedLinks.length ? (
          <section className={styles.section}>
            <h2>Explore the Current Flower Tiers</h2>
            <p>{relatedLinks.map((link, index) => <span key={link.href}>{index ? " · " : ""}<Link href={link.href}>{link.label}</Link></span>)}</p>
          </section>
        ) : null}
        <section className={styles.section}>
          <h2>Before You Travel</h2>
          <p>Adults 19+ only. Bring valid government photo ID. Product listings and posted prices can change, so use the current menu and call the store when one specific item is the reason for the trip.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
