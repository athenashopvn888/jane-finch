import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./faq.module.css";

export const metadata: Metadata = {
  title: "FAQ | Jane Finch Cannabis",
  description: "Frequently asked questions about Jane Finch Cannabis in North York, including store-page checks, menu categories, value shopping, and Native smokes where listed.",
  alternates: {
    canonical: "https://janefinchcannabis.ca/faq",
  },
};

const FAQ_CATEGORIES = [
  {
    title: "Location and Hours",
    faqs: [
      { q: "Where is Jane Finch Cannabis located?", a: "Jane Finch Cannabis is listed at 2728 Jane St, North York, ON M3L 2G6. Use the store page for directions and contact options before visiting." },
      { q: "What are the listed hours?", a: "Open 24 Hours. Check the current store page or contact staff before visiting if timing matters." },
      { q: "What is the best way to plan the visit?", a: "Start with the store page, confirm directions and listed hours, then open the menu category that matches the visit." },
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
      { q: "Where should cheap weed shoppers start?", a: "Start with Budget and AA flower, then compare the current listings before choosing." },
      { q: "Where should premium flower shoppers start?", a: "Use Premium or Exotic flower when the visit is about the higher shelf lanes." },
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
            Straight answers for shopping Jane Finch Cannabis: store page first, menu category second, staff when the current detail matters.
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
              Call <a href="tel:+15483232728">(548) 323-2728</a> or use the store page before visiting.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
