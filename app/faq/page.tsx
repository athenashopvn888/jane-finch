import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./faq.module.css";
import { OPEN_NOW_PATH, SITE_ORIGIN, VISIT_PATH } from "../lib/nap";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Hours, address, 24-hour open-now, and visit questions for Jane Finch Cannabis at 2728 Jane St, North York — a 24 hour weed dispensary near Jane Finch and Sheppard.",
  alternates: {
    canonical: `${SITE_ORIGIN}/faq`,
  },
};

const FAQ_CATEGORIES = [
  {
    title: "24-Hour / Open Now",
    faqs: [
      { q: "Is Jane Finch Cannabis a 24/7 dispensary near me?", a: "Yes. The walk-in counter at 2728 Jane St, North York is open 24 hours, 7 days. A 24/7 dispensary near me search around Jane–Finch can use this storefront. Delivery is not 24/7 — it runs 10 a.m. to 10 p.m." },
      { q: "Is the North York dispensary open now?", a: "Walk-in is open now at any hour. Jane Finch Cannabis does not close overnight. Use the 24-hour North York FAQ for hours truth, then the homepage or walk-in hub for the pin." },
      { q: "Where should I read the 24-hour open-now FAQ?", a: "Open the 24-hour North York dispensary FAQ for hours, open-now, and Jane–Finch arrival. The homepage, North York store page, and /visit hub list the same 2728 Jane St address and phone." },
    ],
  },
  {
    title: "Location and Hours",
    faqs: [
      { q: "Where is Jane Finch Cannabis located?", a: "Jane Finch Cannabis is at 2728 Jane St, North York, ON M3L 2G6, at Jane St & Sheppard Ave W. Use the /visit walk-in hub or the North York store page for directions and contact options before visiting." },
      { q: "Is there a cannabis store in North York?", a: "Yes. Jane Finch Cannabis is the cannabis store at 2728 Jane St in the Jane–Finch / Jane & Sheppard area of North York. Walk in 24 hours." },
      { q: "Is there a 24 hour dispensary in North York?", a: "Yes. Jane Finch Cannabis is open 24 hours a day, 7 days a week. Walk in anytime — no appointment needed. The dedicated 24-hour FAQ has the hours table and late-arrival notes." },
      { q: "Is this a weed dispensary near Jane Finch?", a: "Yes. The walk-in store is on Jane Street in the Jane and Finch / Jane and Sheppard area of North York." },
      { q: "Are you near Jane and Sheppard?", a: "Yes. The storefront is at 2728 Jane St, at the Jane St & Sheppard Ave W area. Plaza parking is in front of the store." },
      { q: "What is the best way to plan the visit?", a: "Start with the homepage or the /visit walk-in hub, confirm 2728 Jane St and the 24-hour hours, then open the North York store page or the menu category that matches the visit." },
    ],
  },
  {
    title: "Products and Menu",
    faqs: [
      { q: "What menu categories can shoppers compare?", a: "The site has paths for flower, pre-rolls, edibles, THC vapes, concentrates, accessories, and cigarettes where listed." },
      { q: "How should shoppers use the menu?", a: "Pick one category first, then compare product name, format, weight or package size, posted price, and item notes." },
      { q: "Do menu details change?", a: "Yes. Product names, prices, and listings can change, so use the current menu or ask staff before making the trip." },
    ],
  },
  {
    title: "Flower and Value",
    faqs: [
      { q: "Where should cheap weed shoppers start?", a: "Start with Budget Weed or AA Weed, then review the product information shown with each selection." },
      { q: "Where should shoppers explore other flower collections?", a: "Use Premium Weed or Exotic Weed as separate collection routes when those tiers match the browsing goal." },
      { q: "How do shoppers avoid guessing?", a: "Stay inside one tier, compare the posted details, and ask staff when the final choice needs a current answer." },
    ],
  },
  {
    title: "Native Smokes",
    faqs: [
      { q: "Does Jane Finch Cannabis list Native cigarettes?", a: "The cigarette menu may show Native smoke brands such as Canadian Lights, Canadian Full, Putters, Canadian Goose Full, Canadian Goose Lights, Canadian Menthol, Canadian Classics Original, and Canadian Classics Silver. Confirm current options through the menu or staff." },
      { q: "Are $25 cartons guaranteed?", a: "No. Where $25 carton-style listings are shown, confirm current price and listings through the menu or staff." },
      { q: "Where should cigarette shoppers start?", a: "Open the cigarette category first, then use the store page for directions, contact options, and listed hours." },
    ],
  },
  {
    title: "Delivery",
    faqs: [
      { q: "Does Jane Finch Cannabis offer delivery?", a: "Yes. The delivery menu is available daily from 10:00 a.m. to 10:00 p.m. with a $60 product minimum and a $10 delivery fee." },
      { q: "How do I start a delivery order?", a: "Browse the delivery menu, then select LIVE ORDER to connect with the Jane Finch Cannabis dispatcher. The dispatcher confirms availability and delivery details." },
      { q: "Are the store and delivery hours the same?", a: "No. The storefront is listed as open 24 hours. Delivery ordering hours are 10:00 a.m. to 10:00 p.m. daily." },
    ],
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
        <Navbar />
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.pageSubtitle}>
            Straight answers for shopping Jane Finch Cannabis: store page first, menu category second, staff when the current detail matters. For 24 hour / open-now questions, start with the{" "}
            <Link href={OPEN_NOW_PATH}>24-hour North York FAQ</Link>, then the{" "}
            <Link href="/">homepage</Link>,{" "}
            <Link href="/weed-dispensary-north-york">North York store page</Link>, or{" "}
            <Link href={VISIT_PATH}>walk-in hub</Link>
            . Flower shelves:{" "}
            <Link href="/exotic-weed">Exotic Weed</Link>,{" "}
            <Link href="/premium-weed">Premium Weed</Link>,{" "}
            <Link href="/aaa-weed">AAA+ Weed</Link>,{" "}
            <Link href="/aa-weed">AA Weed</Link>,{" "}
            <Link href="/budget-weed">Budget Weed</Link>.
          </p>

          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.title} className={styles.category}>
              <h2 className={styles.categoryTitle}>{cat.title}</h2>
              {cat.faqs.map((faq) => (
                <details key={faq.q} className={styles.faqItem}>
                  <summary className={styles.faqQuestion}>{faq.q}</summary>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </details>
              ))}
            </div>
          ))}

          <div className={styles.ctaSection}>
            <h2 className={styles.ctaTitle}>Still have questions?</h2>
            <p className={styles.ctaText}>
              Call <a href="tel:+14375249336">+1 (437) 524-9336</a> or visit <a href={SITE_ORIGIN}>janefinchcannabis.ca</a> before heading to 2728 Jane St. Open-now hours: <Link href={OPEN_NOW_PATH}>24-hour FAQ</Link>.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
