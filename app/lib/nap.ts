/** Canonical NAP for Jane Finch Cannabis (JFC01). Keep schema, footer, and contact identical. */
export const SITE_ORIGIN = "https://janefinchcannabis.ca";
export const STORE_NAME = "Jane Finch Cannabis";
export const STREET_ADDRESS = "2728 Jane St";
export const CITY = "North York";
export const REGION = "ON";
export const COUNTRY = "CA";
export const POSTAL_CODE = "M3L 2G6";
export const FULL_ADDRESS = "2728 Jane St, North York, ON M3L 2G6";
export const PHONE_DISPLAY = "+1 (437) 524-9336";
export const PHONE_INTL = "+14375249336";
export const HOURS_LABEL = "Open 24 hours, 7 days";
export const HOURS_SHORT = "Open 24 Hours";
export const INTERSECTION = "Jane St & Sheppard Ave W";
export const LATITUDE = 43.7432147;
export const LONGITUDE = -79.5144564;
export const MAPS_CID_URL = "https://www.google.com/maps?cid=6991178766551029626";

export const VISIT_PATH = "/visit";

export const HOME_SEO_TITLE = "Dispensary Near Me in Jane–Finch | North York Walk-In";
export const HOME_SEO_DESCRIPTION =
  "Walk-in dispensary near me at 2728 Jane St, North York (Jane & Finch / Jane & Sheppard). Jane Finch Cannabis is open 24 hours, 7 days. Call +1 (437) 524-9336. Adults 19+.";
export const HOME_H1 = "Dispensary Near Me in Jane–Finch / North York";

export const GBP_SEO_TITLE = "Cannabis Store North York — Open Now at Jane & Finch";
export const GBP_SEO_DESCRIPTION =
  "Cannabis store in North York at 2728 Jane St, Jane & Finch / Jane & Sheppard. Walk in 24 hours at Jane Finch Cannabis. Plaza parking out front. Call +1 (437) 524-9336. Adults 19+.";
export const GBP_H1 = "Cannabis Store in North York at Jane & Finch";

export const VISIT_SEO_TITLE = "Visit Jane Finch Cannabis — 2728 Jane St Walk-In Hub";
export const VISIT_SEO_DESCRIPTION =
  "How to walk in at Jane Finch Cannabis, 2728 Jane St, North York. Jane–Finch pin, hours, parking, TTC, and walk-in vs delivery. Call +1 (437) 524-9336. Adults 19+.";
export const VISIT_H1 = "Visit Jane Finch Cannabis at 2728 Jane St";

export const HOME_FAQS = [
  {
    q: "Is there a dispensary near me in Jane–Finch / North York?",
    a: "Yes. Jane Finch Cannabis is the walk-in dispensary at 2728 Jane St, North York, ON M3L 2G6, in the Jane & Finch / Jane & Sheppard area. Open 24 hours, 7 days.",
  },
  {
    q: "Is the dispensary near me open now?",
    a: "The Jane Street storefront is open 24 hours a day, 7 days a week, so walk-in is available any time. Delivery is separate and only runs 10 a.m. to 10 p.m.",
  },
  {
    q: "Where is the weed dispensary near Jane Finch?",
    a: "Jane Finch Cannabis is at 2728 Jane St, North York, ON M3L 2G6, on Jane Street near Sheppard Ave W. Call +1 (437) 524-9336 for directions.",
  },
  {
    q: "Is there a 24 hour dispensary in North York?",
    a: "Yes. Jane Finch Cannabis at 2728 Jane St, North York is open 24 hours a day, 7 days a week. Walk in anytime — no appointment needed.",
  },
  {
    q: "What is the cheapest weed at Jane Finch Cannabis?",
    a: "Start with the Budget Weed collection, then compare the product information presented with each selection.",
  },
] as const;

export const VISIT_FAQS = [
  {
    q: "Is there a cannabis store in North York near Jane and Finch?",
    a: "Yes. Jane Finch Cannabis is the cannabis store at 2728 Jane St, North York, ON M3L 2G6 — Jane Street near Sheppard Ave W, in the Jane–Finch corridor.",
  },
  {
    q: "Do I walk in or order delivery for a near-me search?",
    a: "Most “dispensary near me” searches want the counter. Walk in at 2728 Jane St any hour. Delivery is a separate 10 a.m.–10 p.m. menu and does not change the store address.",
  },
  {
    q: "Is Jane Finch Cannabis open 24 hours?",
    a: "Yes. The walk-in store is open 24 hours, 7 days. Bring valid government photo ID. Adults 19+ only.",
  },
  {
    q: "Where do I park or take transit?",
    a: "Plaza parking is in front of the store. TTC buses run Jane Street and nearby Finch Avenue. Call +1 (437) 524-9336 if you need the pin confirmed before you travel.",
  },
] as const;

export function faqJsonLd(faqs: ReadonlyArray<{ q: string; a: string } | { question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => {
      const name = "q" in faq ? faq.q : faq.question;
      const text = "a" in faq ? faq.a : faq.answer;
      return {
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      };
    }),
  };
}
