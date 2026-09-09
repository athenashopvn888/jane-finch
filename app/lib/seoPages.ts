const NATIVE_HERO_DISCLOSURE = "Brand preview only. Selection varies by store; check the current cigarette menu before visiting.";

const NATIVE_HERO_PRODUCTS = [
  { name: "BB Lights", image: "/products/1001-BB-LIGHTS-CARTONS.webp" },
  { name: "BB Full", image: "/products/1003-BB-FULL-CARTON.webp" },
  { name: "Canadian Lights", image: "/products/1005-CANADIAN-LIGHTS.webp" },
  { name: "Canadian Full", image: "/products/1006-CANADIAN-FULL.webp" },
  { name: "Canadian Classics Silver", image: "/products/1015-CANADIAN-CLASSICS-SILVER.webp" },
  { name: "Canadian Menthol", image: "/products/1013-CANADIAN-MENTHOL.webp" },
] as const;

export interface SeoPageData {
  slug: string;
  title: string;
  absoluteTitle?: boolean;
  metaDescription: string;
  h1: string;
  icon: string;
  heroTagline: string;
  banner?: string;
  heroPreview?: {
    eyebrow: string;
    intro: string;
    products: readonly { name: string; image: string; sourceSlug?: string }[];
    disclosure: string;
    theme?: "cigarettes" | "nicotine";
    menuHref?: string;
    primaryLabel?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    identityStrip?: string;
    featuredHeading?: string;
    featuredIntro?: string;
    warning?: string;
  };
  sections: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES: SeoPageData[] = [
  {
    "slug": "cheap-weed-north-york",
    "title": "Jane Finch Cannabis Cheap Weed and Budget Weed Guide",
    "metaDescription": "A value-minded Jane Finch Cannabis guide for cheap weed, budget weed, affordable weed, and flower tier shopping in North York.",
    "h1": "Jane Finch Cannabis Cheap Weed and Budget Weed Guide",
    "icon": "$",
    "heroTagline": "Value shopping with current menu checks",
    "sections": [
      {
        "heading": "Start With Budget Weed And AA Weed",
        "body": "If cheap weed or affordable weed is the mission, start with the Budget Weed and AA Weed collections before exploring the rest of the menu."
      },
      {
        "heading": "Compare The Current Menu",
        "body": "Look at product name, format, weight, posted price, and item notes. Menus change, so use this page for the shopping method and the live menu or staff for current details."
      },
      {
        "heading": "Know When To Move Up",
        "body": "If Budget Weed or AA Weed does not match the browsing goal, compare AAA+ Weed, Premium Weed, or Exotic Weed next, then review the information shown with each selection."
      }
    ],
    "faqs": [
      {
        "q": "Where should value shoppers start at Jane Finch Cannabis?",
        "a": "Start with Budget Weed and AA Weed, then review the product information shown with each selection."
      },
      {
        "q": "Does affordable weed mean guessing?",
        "a": "No. Compare the category, product name, format, size, posted price, and item notes. Ask staff if anything is unclear."
      },
      {
        "q": "Where can shoppers confirm current prices?",
        "a": "Use the current menu or ask staff. A guide should not pretend prices and listings never move."
      }
    ]
  },
  {
    "slug": "native-cigarettes-north-york",
    "title": "Jane Finch Cannabis Native Cigarettes Resource",
    "metaDescription": "Jane Finch Cannabis Native cigarettes resource with brand names shown on the menu and $25 carton notes where listed.",
    "h1": "Jane Finch Cannabis Native Cigarettes Resource",
    "icon": "#",
    "heroTagline": "$25 carton notes and brand names where listed",
    "heroPreview": {
      "eyebrow": "Jane Finch Cannabis · 2728 Jane St, North York",
      "intro": "Cigarette category and visit information for Jane Street",
      "products": NATIVE_HERO_PRODUCTS,
      "disclosure": NATIVE_HERO_DISCLOSURE
    },
    "sections": [
      {
        "heading": "Start With The Cigarette Category",
        "body": "The cigarette menu may show carton-style Native smoke options around $25, with brand names such as Canadian Lights, Canadian Full, Putters, Canadian Goose Full, Canadian Goose Lights, Canadian Menthol, Canadian Classics Original, and Canadian Classics Silver. Check the current menu or ask staff before making the trip."
      },
      {
        "heading": "Keep Cannabis And Smokes Separate",
        "body": "If you are also shopping flower, pre-rolls, edibles, THC vapes, or concentrates, compare those categories separately. It keeps the visit cleaner."
      },
      {
        "heading": "Confirm What Matters Today",
        "body": "Specific brands, carton options, and prices can change. Use this resource for the shopping path, then confirm current details with the menu or staff."
      }
    ],
    "faqs": [
      {
        "q": "Does Jane Finch Cannabis list Native cigarette options?",
        "a": "The menu may show Native smoke brands such as Canadian Lights, Canadian Full, Putters, Canadian Goose Full, Canadian Goose Lights, and Canadian Menthol. Confirm current options before visiting."
      },
      {
        "q": "Are $25 cartons guaranteed?",
        "a": "No. This page points shoppers toward menu listings where $25 carton-style options are shown. Confirm current price and listings before choosing."
      },
      {
        "q": "Where should shoppers start?",
        "a": "Open the cigarette category, then use the store page for directions, contact options, and listed hours."
      }
    ]
  },
  {
    "slug": "dispensary-near-me-north-york",
    "title": "Cannabis Dispensary Near Me in North York | Jane Finch Cannabis",
    "metaDescription": "Use Jane Finch Cannabis when searching for a cannabis dispensary near me in North York; compare menu categories and confirm current details before visiting.",
    "h1": "Cannabis Dispensary Near Me in North York",
    "icon": "o",
    "heroTagline": "Start with our North York store page for location and hours, then browse the menu categories that interest you.",
    "sections": [
      {
        "heading": "Make The Search Useful",
        "body": "A near-me search should help you confirm the store, then compare menu categories and current details before visiting."
      },
      {
        "heading": "Compare Categories Naturally",
        "body": "Choose the category that matches your visit, such as Budget Weed, Premium Weed, pre-rolls, edibles, THC vapes, or concentrates, then review the information presented there."
      },
      {
        "heading": "Check Current Details",
        "body": "For product names, prices, and listings, use the current menu or ask staff. This page is for orientation and visit planning."
      }
    ],
    "faqs": [
      {
        "q": "Is Jane Finch Cannabis useful for a near-me cannabis search?",
        "a": "Yes. Use the store page to confirm Jane Finch Cannabis, then open the menu category that matches your visit."
      },
      {
        "q": "Can shoppers browse before visiting?",
        "a": "Yes. Use the current menu and resources section before heading over."
      },
      {
        "q": "What should shoppers avoid?",
        "a": "Avoid guessing from old examples. Confirm current details with the menu or staff."
      }
    ]
  },
  {
    slug: "nicotine-vapes-north-york",
    title: "Nicotine Vapes in North York | Jane Finch Cannabis",
    absoluteTitle: true,
    metaDescription: "Adults 19+: review six verified nicotine vape product pages from Jane Finch Cannabis in North York, then check /items/vapes for the current category. Nicotine is addictive.",
    h1: "Nicotine Vapes at Jane Finch Cannabis in North York",
    icon: "NV",
    heroTagline: "Adults 19+ · Nicotine is addictive.",
    heroPreview: {
      eyebrow: "JANE FINCH CANNABIS • JANE AND FINCH / NORTH YORK • ADULTS 19+",
      intro: "Searching for nicotine vapes near me around Jane and Finch in North York? This adult-only Jane Finch Cannabis guide features six verified VAPE PENS product pages. Compare the supported product names, then use /items/vapes for the current nicotine category. Product details can change. Nicotine is addictive.",
      products: [
        { name: "Geek Promax 5% — 30K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/GEEK-PROMAX.jpg", sourceSlug: "geek-promax-5-30k-puffs" },
        { name: "Geek Universe — 25K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/geek_universe_pulse_x_25k.webp", sourceSlug: "geek-universe-25k-puffs" },
        { name: "Level X G2 Pod", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/1086-Level-X-G2-pod.webp", sourceSlug: "level-x-g2-pod" },
        { name: "NEXA PIX — 30K Puffs — Many Flavors", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/nexa_showcase_600x600.webp", sourceSlug: "nexa-pix-30k-puffs-many-flavors" },
        { name: "OVNS 10000 5% — 10K Puffs", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/1081OVNS10000.jpg", sourceSlug: "ovns-10000-5-10k-puffs" },
        { name: "OVNS Disposable 5% — 8 mL — Many Flavors", image: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/OVNS500x500HQ.webp", sourceSlug: "ovns-disposable-5-8ml-many-flavors" },
      ],
      disclosure: "Featured cards are verified starting points, not guarantees of current stock, price or availability.",
      theme: "nicotine",
      menuHref: "/items/vapes",
      primaryLabel: "Browse Nicotine Vapes",
      secondaryLabel: "Compare the Six Featured Items",
      secondaryHref: "#featured-vapes",
      identityStrip: "Jane Finch Cannabis | Jane and Finch / North York | Adults 19+ | Nicotine is addictive.",
      featuredHeading: "Six Verified Jane Finch Vape Cards",
      featuredIntro: "This shortlist contains verified Geek, Level X, NEXA and OVNS VAPE PENS product pages. Use each card for its supported display name, then rely on /items/vapes for the current Jane Finch Cannabis category listing.",
      warning: "Adults 19+. Nicotine is addictive.",
    },
    sections: [
      { heading: "Read Each Product Format Carefully", body: "One verified page identifies a Level X G2 Pod, while another explicitly identifies an OVNS disposable. Keep those formats attached only to their respective products and do not relabel another featured item by assumption." },
      { heading: "Puff Counts Identify Listings", body: "Several verified names include puff counts. Use those numbers to distinguish the listings, not as guarantees of duration, performance or superiority." },
      { heading: "Keep Nicotine and Cannabis Vape Routes Separate", body: "This adult-only Jane Finch Cannabis guide uses VAPE PENS products under /items/vapes. THC and cannabis vape products under /items/vape-disposables are excluded." },
      { heading: "Review the Current North York Category", body: "Before choosing, open /items/vapes and the individual product page for current supported details. This guide does not claim prices, stock or guaranteed availability." },
    ],
    faqs: [
      { q: "Where should I check Jane Finch Cannabis’s current nicotine selection?", a: "Use /items/vapes. The six featured cards are verified starting points while the current category listing controls selection information." },
      { q: "Does every featured item use the same format?", a: "No. The verified set explicitly identifies a Level X G2 Pod and an OVNS disposable. Read every current product page for its supported format and details." },
      { q: "Does this page include cannabis vapes?", a: "No. It covers nicotine products from the VAPE PENS category for adults 19+. THC and cannabis vape products under /items/vape-disposables are excluded." },
    ],
  }
];

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}

