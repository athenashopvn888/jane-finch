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
export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=2728+Jane+St,+North+York,+ON+M3L+2G6&hl=en&z=16&output=embed";

export const VISIT_PATH = "/visit";
export const OPEN_NOW_PATH = "/24-hour-dispensary-north-york";
export const DELIVERY_LP_PATH = "/cannabis-delivery-north-york";
export const DELIVERY_MENU_PATH = "/delivery";
export const DELIVERY_HOURS_LABEL = "Delivery 10 a.m.–10 p.m. daily";
export const DELIVERY_HOURS_SHORT = "10 a.m.–10 p.m.";

/*
 * B16 eng note: www→apex host consolidation is a separate ticket.
 * Do not add slash-duplicate routes (keep /weed-dispensary-north-york and
 * /24-hour-dispensary-north-york without trailing-slash twins). GBP Website
 * stays the homepage root at SITE_ORIGIN.
 */

export const HOME_SEO_TITLE = "Jane Finch Cannabis | Jane and Finch Dispensary North York";
export const HOME_SEO_DESCRIPTION =
  "Jane Finch Cannabis is the Jane and Finch dispensary at 2728 Jane St, North York. Cannabis store North York walk-in hub with NAP, hours, and map. Dispensary near me, open 24 hours. Call +1 (437) 524-9336. Adults 19+.";
export const HOME_H1 = "Jane Finch Cannabis — Jane and Finch Dispensary";

export const GBP_SEO_TITLE = "Cannabis Store North York — Open Now at Jane & Finch";
export const GBP_SEO_DESCRIPTION =
  "Cannabis store in North York at 2728 Jane St, Jane & Finch / Jane & Sheppard. Walk in 24 hours at Jane Finch Cannabis. Plaza parking out front. Call +1 (437) 524-9336. Adults 19+.";
export const GBP_H1 = "Cannabis Store in North York at Jane & Finch";

export const VISIT_SEO_TITLE = "Visit Jane Finch Cannabis — 2728 Jane St Walk-In Hub";
export const VISIT_SEO_DESCRIPTION =
  "How to walk in at Jane Finch Cannabis, 2728 Jane St, North York. Jane–Finch pin, hours, parking, TTC, and walk-in vs delivery. Call +1 (437) 524-9336. Adults 19+.";
export const VISIT_H1 = "Visit Jane Finch Cannabis at 2728 Jane St";

export const OPEN_NOW_SEO_TITLE = "24-Hour North York Dispensary — Jane Finch Open-Now FAQ";
export const OPEN_NOW_SEO_DESCRIPTION =
  "24 hour dispensary in North York at 2728 Jane St, Jane Finch. Open now 24/7 for walk-in. Hours truth, arrival, and FAQ. Call +1 (437) 524-9336. Adults 19+.";
export const OPEN_NOW_H1 = "24-Hour North York Dispensary — Jane Finch Open Now";

export const DELIVERY_SEO_TITLE = "Jane Finch Cannabis Delivery in North York — 10 a.m. to 10 p.m.";
export const DELIVERY_SEO_DESCRIPTION =
  "Cannabis delivery from Jane Finch Cannabis at 2728 Jane St, North York. LIVE ORDER 10 a.m.–10 p.m. daily — not 24-hour delivery. $60 minimum, $10 fee. Call +1 (437) 524-9336. Adults 19+.";
export const DELIVERY_H1 = "Cannabis Delivery from Jane Finch in North York";

export const HOME_FAQS = [
  {
    q: "What is Jane Finch Cannabis?",
    a: "Jane Finch Cannabis is the walk-in cannabis store at 2728 Jane St, North York, ON M3L 2G6 — the Jane and Finch dispensary at Jane St & Sheppard Ave W. This homepage is the local hub for name, address, phone, hours, and the map. Open 24 hours, 7 days. Adults 19+.",
  },
  {
    q: "Is Jane Finch Cannabis a cannabis store in North York?",
    a: "Yes. Jane Finch Cannabis is the cannabis store North York shoppers use at 2728 Jane St in the Jane–Finch corridor. Use this homepage for NAP, hours, and the map, then the North York store page or the 24-hour FAQ if you need extra walk-in or open-now detail.",
  },
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

/** B09 FAQPage entities — visible on /24-hour-dispensary-north-york only. Hours match GBP / layout CannabisStore 00:00–24:00. */
export const OPEN_NOW_FAQS = [
  {
    q: "Is there a 24 hour dispensary in North York?",
    a: "Yes. Jane Finch Cannabis at 2728 Jane St, North York is a 24 hour dispensary. The walk-in counter is open 24 hours a day, 7 days a week. No appointment.",
  },
  {
    q: "Is Jane Finch Cannabis a 24/7 dispensary near me?",
    a: "If you are around Jane–Finch, Jane & Sheppard, or elsewhere in North York looking for a 24/7 dispensary near me, walk in at 2728 Jane St any hour. Delivery is not 24/7 — it runs 10 a.m. to 10 p.m.",
  },
  {
    q: "Is the dispensary near me open now in North York?",
    a: "Walk-in is open now at any hour. Jane Finch Cannabis does not close overnight. Call +1 (437) 524-9336 if you want the pin confirmed before you travel.",
  },
  {
    q: "Is this a cannabis store in North York that stays open 24 hours?",
    a: "Yes. Jane Finch Cannabis is the cannabis store at 2728 Jane St in the Jane–Finch / Jane & Sheppard area of North York, and the counter is open 24 hours, 7 days.",
  },
  {
    q: "Do I need an appointment for a late-night walk-in?",
    a: "No. Adults 19+ with valid government photo ID can walk in any hour. Use the visit hub for parking and transit, then come to 2728 Jane St.",
  },
] as const;

/** Wave 2 delivery FAQPage — neighbourhood owner for Jane Finch / North York courier intent. Walk-in 24h stays on /visit and the 24-hour FAQ. */
export const DELIVERY_FAQS = [
  {
    q: "Does Jane Finch Cannabis deliver cannabis in North York?",
    a: "Yes. Jane Finch Cannabis dispatches cannabis delivery from 2728 Jane St in the Jane–Finch / Jane & Sheppard area of North York. The dispatcher confirms whether your address is in range. Adults 19+.",
  },
  {
    q: "What hours does Jane Finch Cannabis delivery run?",
    a: "Delivery ordering runs daily from 10 a.m. to 10 p.m. That window is on the delivery menu as 10:00 a.m.–10:00 p.m. It is not overnight and not 24/7.",
  },
  {
    q: "Is Jane Finch delivery open 24 hours like the walk-in store?",
    a: "No. The Jane Street counter at 2728 Jane St is open 24 hours, 7 days. Delivery is a separate courier service and only runs 10 a.m. to 10 p.m. A 24-hour search is for walk-in, not a 24-hour courier.",
  },
  {
    q: "How do I place a Jane Finch Cannabis delivery order?",
    a: "Open the delivery menu, note the items you want, then use LIVE ORDER to connect with the Jane Finch Cannabis dispatcher. New customers complete ID review in Web Chat. The dispatcher confirms availability, the $60 product minimum, the $10 fee, and drop-off details.",
  },
  {
    q: "Where is Jane Finch Cannabis delivery dispatched from?",
    a: "Orders leave the walk-in store at 2728 Jane St, North York, ON M3L 2G6 — Jane St & Sheppard Ave W. This is not a second North York counter. Call +1 (437) 524-9336 if you need the pin confirmed.",
  },
  {
    q: "Which Jane–Finch and North York areas can request delivery?",
    a: "A practical planning area is about 50 km from Jane Street and Finch Avenue, including Jane–Finch, Jane & Sheppard, North York, Toronto, Vaughan, Etobicoke, Brampton, and Mississauga. The dispatcher confirms the destination for each request. Longer trips are not guaranteed.",
  },
  {
    q: "What is the Jane Finch Cannabis delivery minimum and fee?",
    a: "Site terms are a $60 product minimum and a $10 delivery fee. Eligibility, stock, and timing are confirmed by the dispatcher before checkout. Adults 19+ with valid government photo ID.",
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
