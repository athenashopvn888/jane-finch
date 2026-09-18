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

export const HOME_SEO_TITLE = "24 Hour Weed Dispensary Near Jane Finch | North York";
export const HOME_SEO_DESCRIPTION =
  "Jane Finch Cannabis at 2728 Jane St, North York (Jane & Sheppard). Open 24 hours, 7 days. Walk-in flower, pre-rolls, vapes and edibles. Call +1 (437) 524-9336. Adults 19+.";
export const HOME_H1 = "24 Hour Weed Dispensary Near Jane Finch";

export const GBP_SEO_TITLE = "North York Weed Dispensary at Jane & Sheppard | Open 24 Hours";
export const GBP_SEO_DESCRIPTION =
  "Walk-in North York weed dispensary at 2728 Jane St, Jane & Sheppard. Jane Finch Cannabis is open 24 hours, 7 days. Plaza parking out front. Call +1 (437) 524-9336. Adults 19+.";
export const GBP_H1 = "North York Weed Dispensary at Jane & Sheppard — Open 24 Hours";

export const HOME_FAQS = [
  {
    q: "Is there a 24 hour dispensary in North York?",
    a: "Yes. Jane Finch Cannabis at 2728 Jane St, North York is open 24 hours a day, 7 days a week. Walk in anytime — no appointment needed.",
  },
  {
    q: "Where is the weed dispensary near Jane Finch?",
    a: "Jane Finch Cannabis is at 2728 Jane St, North York, ON M3L 2G6, on Jane Street near Sheppard Ave W. Call +1 (437) 524-9336 for directions.",
  },
  {
    q: "Are you near Jane and Sheppard?",
    a: "Yes. The storefront is at 2728 Jane St in North York, at the Jane St & Sheppard Ave W area. Plaza parking is in front of the store.",
  },
  {
    q: "What cannabis products do you carry?",
    a: "Browse Exotic Weed, Premium Weed, AAA+ Weed, AA Weed, and Budget Weed as separate flower collections, plus the other category pages shown on the menu.",
  },
  {
    q: "What is the cheapest weed at Jane Finch Cannabis?",
    a: "Start with the Budget Weed collection, then compare the product information presented with each selection.",
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
