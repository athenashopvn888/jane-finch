export type WeedDiscoveryLink = { label: string; description: string; href: string };
export type WeedFaq = { question: string; answer: string };

export const weedOwner = {
  storeName: "Jane Finch Cannabis",
  domain: "www.janefinchcannabis.ca",
  ownerPath: "/weed-dispensary-north-york",
  city: "North York",
  streetAddress: "2728 Jane St",
  postalCode: "M3L 2G6",
  phoneDisplay: "+1 (437) 524-9336",
  phoneIntl: "+14375249336",
  hoursLabel: "Open 24 Hours · 7 Days a Week",
  openingHours: "Mo-Su 00:00-23:59",
  seoTitle: "Jane Finch Cannabis — Weed Dispensary in North York",
  metaDescription: "Walk-in Jane–Finch / Black Creek dispensary at 2728 Jane St. Open 24 hours. Flower from $3/g on the current menu. Call +1 (437) 524-9336. Adults 19+.",
  h1: "Jane–Finch / Black Creek walk-in at 2728 Jane St — Open 24 Hours",
  introTitle: "Walk-In Cannabis at Jane and Finch",
  intro: [
  "Jane Finch Cannabis is the North York walk-in dispensary at 2728 Jane Street, at the Jane and Finch corridor. The store is open 24 hours. This page is for people coming to the counter — students heading down from York University, shift workers off Highway 400, and residents around Finch West, Pioneer Village, and Jane-Sheppard.",
  "Browse the five flower tiers and the format pages before you travel. Posted Budget flower starts at $3/g. Product listings and prices can change, so use the current menu for today’s choices.",
  "Call +1 (437) 524-9336 if one item decides the trip. Plaza parking is in front of the store. Adults 19+ with valid government photo ID."
],
  findTitle: "Find Your Weed at Jane Finch Cannabis",
  discoveryLinks: [
  {
    "label": "How to get here",
    "description": "Jane Street from Finch, TTC, plaza parking, and the walk-in door.",
    "href": "/visit"
  },
  {
    "label": "Explore Categories",
    "description": "See the broad cannabis choices presented by Jane Finch Cannabis.",
    "href": "/"
  },
  {
    "label": "Cannabis Resources",
    "description": "Explore general cannabis and store information.",
    "href": "/resources"
  },
  {
    "label": "Frequently Asked Questions",
    "description": "Find answers to common store and cannabis questions.",
    "href": "/faq"
  },
  {
    "label": "Contact Jane Finch Cannabis",
    "description": "Ask about a specific product or visit question.",
    "href": "/contact"
  }
] satisfies WeedDiscoveryLink[],
  guides: [
  {
    "label": "Cannabis Resources",
    "description": "General cannabis and store information.",
    "href": "/resources"
  },
  {
    "label": "Frequently Asked Questions",
    "description": "Answers to common questions.",
    "href": "/faq"
  },
  {
    "label": "Contact Jane Finch Cannabis",
    "description": "Direct contact for a specific product or visit question.",
    "href": "/contact"
  }
] satisfies WeedDiscoveryLink[],
  faq: [
  {
    "question": "Where is Jane Finch Cannabis?",
    "answer": "Jane Finch Cannabis is located at 2728 Jane St, North York, ON M3L 2G6."
  },
  {
    "question": "Is Jane Finch Cannabis open 24 hours?",
    "answer": "Yes. Jane Finch Cannabis is open 24 hours a day, seven days a week."
  },
  {
    "question": "What does weed mean compared with cannabis?",
    "answer": "Weed is casual everyday terminology. Cannabis is the broader term."
  },
  {
    "question": "What is cannabis flower?",
    "answer": "Flower is dried cannabis flower. Bud is a common informal term for the same category."
  },
  {
    "question": "Can I confirm a particular item before visiting?",
    "answer": "Yes. Call +1 (437) 524-9336 if you are making a special trip for something specific."
  },
  {
    "question": "Do I need to be 19+?",
    "answer": "Yes. Jane Finch Cannabis is for adults 19+."
  }
] satisfies WeedFaq[],
  home: {
    title: "Walk in at Jane–Finch / Black Creek",
    text: "Jane Finch Cannabis is the 24-hour walk-in counter at 2728 Jane St on Jane Street in the Jane–Finch / Black Creek neighbourhood. Use the visit hub on the homepage, then the how-to-get-here notes for Finch, TTC, and plaza parking.",
    primaryLabel: "How to get here",
    secondaryLabel: "Explore Cannabis Resources",
    secondaryHref: "/resources",
  },
};
