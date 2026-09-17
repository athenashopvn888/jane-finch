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
  seoTitle: "North York Weed Dispensary | Jane Finch Cannabis 24/7",
  metaDescription: "Walk-in North York dispensary at 2728 Jane St. Open 24/7 near Finch West and York University. Flower from $3/g. Call (437) 524-9336. Adults 19+.",
  h1: "North York Weed Dispensary at Jane & Finch — Open 24 Hours",
  introTitle: "Walk-In Cannabis at Jane and Finch",
  intro: [
  "Jane Finch Cannabis is the North York walk-in dispensary at 2728 Jane Street, at the Jane and Finch corridor. The store is open 24 hours. This page is for people coming to the counter — students heading down from York University, shift workers off Highway 400, and residents around Finch West, Pioneer Village, and Jane-Sheppard.",
  "Browse the five flower tiers and the format pages before you travel. Posted Budget flower starts at $3/g. Product listings and prices can change, so use the current menu for today’s choices.",
  "Call +1 (437) 524-9336 if one item decides the trip. Plaza parking is in front of the store. Adults 19+ with valid government photo ID."
],
  findTitle: "Find Your Weed at Jane Finch Cannabis",
  discoveryLinks: [
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
    title: "Weed in North York at Jane Finch Cannabis",
    text: "Jane Finch Cannabis is open 24 hours at 2728 Jane St. Adults 19+ can explore store information, cannabis resources and the dedicated North York Weed section.",
    primaryLabel: "Explore Weed in North York",
    secondaryLabel: "Explore Cannabis Resources",
    secondaryHref: "/resources",
  },
};
