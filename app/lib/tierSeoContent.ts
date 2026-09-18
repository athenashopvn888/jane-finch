import pinkyTierAdditions from "./pinkyTierAdditions.json";
import { OPEN_NOW_PATH, VISIT_PATH } from "./nap";
import { WEED_OWNER_PATH } from "./sccHub";

export interface TierSeoData {
  h1: string;
  seoTitle: string;
  seoIntro: string;
  sections: { heading: string; body: string; links?: { href: string; label: string }[] }[];
  faqs: { q: string; a: string }[];
}

export const TIER_SEO: Record<string, TierSeoData> = {
  EXOTIC: {
    h1: "Exotic Weed & Cannabis Flower in North York",
    seoTitle: "Exotic Weed & Cannabis Flower in North York | Jane Finch Cannabis",
    seoIntro:
      "Exotic Weed is the highest-positioned flower shelf at Jane Finch Cannabis, 2728 Jane St, North York. This route stays narrow — the North York cannabis store page owns broader weed intent, and the homepage remains the local visit hub.",
    sections: [
      {
        heading: "Exotic as a Jane Finch flower tier",
        body: "Exotic Weed sits beside Premium, AAA+, AA, and Budget so this page can stay about one shelf. Compare listed flower details here, then walk in at Jane St & Sheppard Ave W. The counter is open 24 hours; delivery is a separate 10 a.m. to 10 p.m. window.",
        links: [
          { href: "/premium-weed", label: "Premium Weed" },
          { href: "/aaa-weed", label: "AAA+ Weed" },
          { href: "/aa-weed", label: "AA Weed" },
          { href: "/budget-weed", label: "Budget Weed" },
        ],
      },
      {
        heading: "Exotic is not the North York weed hub",
        body: "Use this page only for Exotic flower. For pin, parking, and Jane–Sheppard arrival, open the walk-in hub. For open-now hours truth, use the 24-hour North York FAQ. For general weed-dispensary intent, stay on the North York store page.",
        links: [
          { href: "/", label: "Homepage local hub" },
          { href: VISIT_PATH, label: "Walk-in hub" },
          { href: WEED_OWNER_PATH, label: "North York cannabis store" },
          { href: OPEN_NOW_PATH, label: "24-hour North York FAQ" },
        ],
      },
    ],
    faqs: [
      {
        q: "What is the Exotic Weed tier at Jane Finch Cannabis?",
        a: "Exotic Weed is one of five dedicated flower routes at 2728 Jane St, North York. It is a browsing shelf, not a government grade and not a promise about one strain.",
      },
      {
        q: "Is Exotic Weed Jane Finch’s main North York weed page?",
        a: "No. This page is Exotic-only. Broader weed intent stays on the North York cannabis store page, and the homepage is the local NAP hub.",
      },
      {
        q: "Which other Jane Finch flower tiers have their own pages?",
        a: "Premium Weed, AAA+ Weed, AA Weed, and Budget Weed each have a separate route. Walk in 24 hours at 2728 Jane St; delivery does not run overnight.",
      },
    ],
  },
  PREMIUM: {
    h1: "Premium Weed at Jane & Sheppard",
    seoTitle: "Premium Weed at Jane & Sheppard | Jane Finch Cannabis",
    seoIntro:
      "Premium Weed is the Jane & Sheppard flower shelf at Jane Finch Cannabis. Shoppers coming down Jane Street can compare this tier before walking in at 2728 Jane St — without treating this page as the city-wide weed owner.",
    sections: [
      {
        heading: "Premium flower for Jane & Sheppard walk-in",
        body: "Premium Weed is organized separately from Exotic, AAA+, AA, and Budget. Use the listings on this page, then come to the Jane Street counter. Walk-in is 24 hours. Delivery stays on its own 10 a.m.–10 p.m. menu.",
        links: [
          { href: "/exotic-weed", label: "Exotic Weed" },
          { href: "/aaa-weed", label: "AAA+ Weed" },
          { href: "/aa-weed", label: "AA Weed" },
          { href: "/budget-weed", label: "Budget Weed" },
        ],
      },
      {
        heading: "Premium stays narrower than the weed hub",
        body: "Jane–Sheppard arrival, parking, and TTC notes live on the walk-in hub. Open-now questions belong on the 24-hour FAQ. The homepage holds NAP, hours, and the map.",
        links: [
          { href: "/", label: "Homepage local hub" },
          { href: VISIT_PATH, label: "Walk-in hub" },
          { href: WEED_OWNER_PATH, label: "North York cannabis store" },
          { href: OPEN_NOW_PATH, label: "24-hour North York FAQ" },
        ],
      },
    ],
    faqs: [
      {
        q: "What does Premium Weed mean at Jane Finch Cannabis?",
        a: "Premium Weed is a dedicated flower collection for the Jane & Sheppard / Jane–Finch counter. It is retail positioning on the menu, not a regulated national grade.",
      },
      {
        q: "Does this Premium page replace the North York weed hub?",
        a: "No. Premium is a narrow flower-tier route. The North York cannabis store page remains the broad weed owner.",
      },
      {
        q: "Where do Jane & Sheppard shoppers walk in for Premium flower?",
        a: "Walk in at 2728 Jane St, North York, ON M3L 2G6. Confirm the pin on the visit hub. The counter is open 24 hours; delivery is 10 a.m. to 10 p.m. only.",
      },
    ],
  },
  "AAA+": {
    h1: "AAA+ Weed at 2728 Jane St",
    seoTitle: "AAA+ Weed at 2728 Jane St | Jane Finch Cannabis",
    seoIntro:
      "AAA+ Weed is Jane Finch Cannabis’s mid-high flower shelf at 2728 Jane St. The label is retail shorthand used on this store’s menu — not a universal government grade.",
    sections: [
      {
        heading: "AAA+ as its own Jane–Finch shelf",
        body: "AAA+ sits between Premium and AA so shoppers can scan one collection at a time. Compare current listings here, then walk in at Jane St & Sheppard Ave W. Overnight hours apply to the counter, not to delivery.",
        links: [
          { href: "/exotic-weed", label: "Exotic Weed" },
          { href: "/premium-weed", label: "Premium Weed" },
          { href: "/aa-weed", label: "AA Weed" },
          { href: "/budget-weed", label: "Budget Weed" },
        ],
      },
      {
        heading: "AAA+ does not own 24-hour or visit intent",
        body: "Hours truth is on the 24-hour North York FAQ. Parking, TTC, and Jane–Sheppard pin notes stay on the walk-in hub. The homepage remains the NAP card for the store.",
        links: [
          { href: "/", label: "Homepage local hub" },
          { href: VISIT_PATH, label: "Walk-in hub" },
          { href: WEED_OWNER_PATH, label: "North York cannabis store" },
          { href: OPEN_NOW_PATH, label: "24-hour North York FAQ" },
        ],
      },
    ],
    faqs: [
      {
        q: "What is AAA+ Weed at Jane Finch Cannabis?",
        a: "AAA+ Weed is a dedicated flower route at 2728 Jane St. AAA and AAA+ are familiar retail terms here; they are not one government grading system.",
      },
      {
        q: "Is AAA+ the same as the North York cannabis store page?",
        a: "No. AAA+ is one flower tier. The North York store page is the broad weed owner for Jane Finch / North York searches.",
      },
      {
        q: "Can I walk in 24 hours for AAA+ flower at 2728 Jane St?",
        a: "Yes. The Jane Street counter is open 24 hours, 7 days. Delivery is not 24-hour — LIVE ORDER runs 10 a.m. to 10 p.m.",
      },
    ],
  },
  AA: {
    h1: "AA Weed for Jane–Finch Walk-In",
    seoTitle: "AA Weed for Jane–Finch Walk-In | Jane Finch Cannabis",
    seoIntro:
      "AA Weed is the Jane–Finch value-adjacent flower collection. Use this page to compare AA listings, then walk in at 2728 Jane St — this is not a delivery catalogue and not the main North York weed page.",
    sections: [
      {
        heading: "AA flower for the Jane–Finch counter",
        body: "AA Weed sits between AAA+ and Budget. Value and quality are different questions: a lower posted price does not mean the flower is stale. Compare current listings, then visit the Jane Street door.",
        links: [
          { href: "/exotic-weed", label: "Exotic Weed" },
          { href: "/premium-weed", label: "Premium Weed" },
          { href: "/aaa-weed", label: "AAA+ Weed" },
          { href: "/budget-weed", label: "Budget Weed" },
        ],
      },
      {
        heading: "Walk-in first; delivery stays separate",
        body: "A near-me search around Jane–Finch, Black Creek, or Downsview wants the counter. Confirm 2728 Jane St on the visit hub. Delivery uses a different menu from 10 a.m. to 10 p.m. and does not change the store pin.",
        links: [
          { href: "/", label: "Homepage local hub" },
          { href: VISIT_PATH, label: "Walk-in hub" },
          { href: WEED_OWNER_PATH, label: "North York cannabis store" },
          { href: OPEN_NOW_PATH, label: "24-hour North York FAQ" },
        ],
      },
    ],
    faqs: [
      {
        q: "What is AA Weed at Jane Finch Cannabis?",
        a: "AA Weed is one of five flower routes for Jane–Finch walk-in shoppers. The label helps scan the menu; it does not freeze one THC number or bud size.",
      },
      {
        q: "Is the AA page a 24-hour delivery menu?",
        a: "No. This is a walk-in flower tier. The storefront is open 24 hours. Delivery is a separate 10 a.m. to 10 p.m. service.",
      },
      {
        q: "How do I get to AA flower from Jane and Finch?",
        a: "Come to 2728 Jane St, North York, at Jane St & Sheppard Ave W. Use the visit hub for parking and TTC, then ask at the counter.",
      },
    ],
  },
  BUDGET: {
    h1: "Budget Weed in North York",
    seoTitle: "Budget Weed in North York | Jane Finch Cannabis",
    seoIntro:
      "Budget Weed is Jane Finch Cannabis’s value-first flower collection in North York. Posted Budget flower starts at $3/g on the live menu. The word Budget describes price positioning — not a claim that flower is weak or stale.",
    sections: [
      {
        heading: "Start here for value, then compare siblings",
        body: "Budget Weed is the lowest-priced of the five flower tiers. Check the live grid for today’s listings, then compare AA, AAA+, Premium, or Exotic if you want another shelf. Walk in at 2728 Jane St any hour.",
        links: [
          { href: "/exotic-weed", label: "Exotic Weed" },
          { href: "/premium-weed", label: "Premium Weed" },
          { href: "/aaa-weed", label: "AAA+ Weed" },
          { href: "/aa-weed", label: "AA Weed" },
        ],
      },
      {
        heading: "Budget browsing vs 24-hour walk-in vs delivery",
        body: "This page is a flower shelf. 24-hour open-now questions go to the dedicated FAQ. Arrival notes stay on the visit hub. Delivery windows stay 10 a.m. to 10 p.m. and do not replace walk-in.",
        links: [
          { href: "/", label: "Homepage local hub" },
          { href: VISIT_PATH, label: "Walk-in hub" },
          { href: WEED_OWNER_PATH, label: "North York cannabis store" },
          { href: OPEN_NOW_PATH, label: "24-hour North York FAQ" },
        ],
      },
    ],
    faqs: [
      {
        q: "What is Budget Weed at Jane Finch Cannabis?",
        a: "Budget Weed is the value-first flower collection at 2728 Jane St, North York. Posted listings start at $3/g. Confirm today’s names and prices on this page before you travel.",
      },
      {
        q: "Does Budget Weed mean the counter is only open daytime?",
        a: "No. Walk-in is open 24 hours, 7 days. Budget is a flower tier name, not a hours claim. Delivery still runs 10 a.m. to 10 p.m. only.",
      },
      {
        q: "Where should value shoppers go after this Budget page?",
        a: "Compare AA Weed next, or open the North York cannabis store page and the walk-in hub for the Jane–Finch pin. Keep product browsing secondary to the address.",
      },
    ],
  },
};

for (const [key, addition] of Object.entries(pinkyTierAdditions)) {
  if (!TIER_SEO[key]) continue;
  TIER_SEO[key].sections.push(
    ...addition.rows.map((row) => ({
      heading: row.heading,
      body: row.body,
      links: addition.links.map((href) => ({ href, label: "Learn more" })),
    })),
  );
}
