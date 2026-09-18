import {
  CITY,
  GBP_H1,
  GBP_SEO_DESCRIPTION,
  GBP_SEO_TITLE,
  HOURS_LABEL,
  PHONE_DISPLAY,
  PHONE_INTL,
  POSTAL_CODE,
  SITE_ORIGIN,
  STORE_NAME,
  STREET_ADDRESS,
} from "./nap";
import { gbpLocation } from "./gbp-location";

export type WeedDiscoveryLink = { label: string; description: string; href: string };
export type WeedFaq = { question: string; answer: string };

export const weedOwner = {
  storeName: STORE_NAME,
  domain: SITE_ORIGIN.replace(/^https:\/\//, ""),
  ownerPath: "/weed-dispensary-north-york",
  city: CITY,
  streetAddress: STREET_ADDRESS,
  postalCode: POSTAL_CODE,
  phoneDisplay: PHONE_DISPLAY,
  phoneIntl: PHONE_INTL,
  hoursLabel: HOURS_LABEL,
  openingHours: "Mo-Su 00:00-24:00",
  seoTitle: GBP_SEO_TITLE,
  metaDescription: GBP_SEO_DESCRIPTION,
  h1: GBP_H1,
  introTitle: gbpLocation.sectionTitle,
  intro: [
    "Jane Finch Cannabis is the North York walk-in weed dispensary at 2728 Jane St, at Jane St & Sheppard Ave W in the Jane and Finch corridor. The store is open 24 hours, 7 days. This page is for people coming to the counter — neighbours around Jane Finch, shoppers coming down Jane Street, students heading over from the York University area, and drivers off Highway 400.",
    "Browse the five flower tiers and the format pages before you travel. Posted Budget flower starts at $3/g. Product listings and prices can change, so use the current menu for today’s choices.",
    "Call +1 (437) 524-9336 if one item decides the trip. Plaza parking is in front of the store. TTC buses run Jane Street and nearby Finch Avenue. Adults 19+ with valid government photo ID.",
  ],
  neighborhoodTitle: gbpLocation.sectionTitle,
  neighborhoodDescription: gbpLocation.neighborhoodDescription,
  parkingNote: gbpLocation.parkingNote,
  transitNote: gbpLocation.transitNote,
  nearbyAreas: gbpLocation.nearbyAreas,
  findTitle: "Find Your Weed at Jane Finch Cannabis",
  discoveryLinks: [
    {
      label: "Store Homepage",
      description: "Open 24 hours at 2728 Jane St. Start here for the current Jane Finch Cannabis menu.",
      href: "/",
    },
    {
      label: "Contact & Hours",
      description: "Address, phone, and 24-hour walk-in details for Jane & Sheppard.",
      href: "/contact",
    },
    {
      label: "York University Area",
      description: "Plan the trip from the York University area to the Jane Street counter.",
      href: "/resources/local-guides/york-university-cannabis-guide",
    },
    {
      label: "Cheap Weed North York",
      description: "Start with Budget Weed and AA Weed, then compare posted details.",
      href: "/info/cheap-weed-north-york",
    },
    {
      label: "Frequently Asked Questions",
      description: "Hours, location, delivery windows, and menu questions.",
      href: "/faq",
    },
  ] satisfies WeedDiscoveryLink[],
  guides: [
    {
      label: "York University cannabis guide",
      description: "Off-campus route notes from the York University area to 2728 Jane St.",
      href: "/resources/local-guides/york-university-cannabis-guide",
    },
    {
      label: "Highway 400 / Pioneer Village",
      description: "Commuter notes from Highway 400 and Pioneer Village to the Jane Street store.",
      href: "/resources/local-guides/highway-400-pioneer-village-cannabis",
    },
    {
      label: "Dispensary near me in North York",
      description: "Confirm the Jane Finch Cannabis storefront before a near-me trip.",
      href: "/info/dispensary-near-me-north-york",
    },
    {
      label: "Contact Jane Finch Cannabis",
      description: "Call +1 (437) 524-9336 or use the contact page for visit questions.",
      href: "/contact",
    },
  ] satisfies WeedDiscoveryLink[],
  faq: [
    {
      question: "Where is Jane Finch Cannabis?",
      answer: "Jane Finch Cannabis is located at 2728 Jane St, North York, ON M3L 2G6.",
    },
    {
      question: "Is Jane Finch Cannabis a 24 hour dispensary in North York?",
      answer: "Yes. Jane Finch Cannabis is open 24 hours a day, 7 days a week.",
    },
    {
      question: "Is this a weed dispensary near Jane Finch?",
      answer: "Yes. The walk-in store is at 2728 Jane St in the Jane and Finch / Jane and Sheppard area of North York.",
    },
    {
      question: "Are you near Jane and Sheppard?",
      answer: "Yes. The storefront is at Jane St & Sheppard Ave W. Plaza parking is in front of the store.",
    },
    {
      question: "What does weed mean compared with cannabis?",
      answer: "Weed is casual everyday terminology. Cannabis is the broader term.",
    },
    {
      question: "What is cannabis flower?",
      answer: "Flower is dried cannabis flower. Bud is a common informal term for the same category.",
    },
    {
      question: "Can I confirm a particular item before visiting?",
      answer: "Yes. Call +1 (437) 524-9336 if you are making a special trip for something specific.",
    },
    {
      question: "Do I need to be 19+?",
      answer: "Yes. Jane Finch Cannabis is for adults 19+.",
    },
  ] satisfies WeedFaq[],
  home: {
    title: "Weed dispensary near Jane Finch and Sheppard",
    text: "Jane Finch Cannabis is open 24 hours, 7 days at 2728 Jane St, North York — Jane St & Sheppard Ave W. Adults 19+ can walk in or open the North York store page for address, parking, and visit notes.",
    primaryLabel: "North York walk-in details",
    secondaryLabel: "Contact the store",
    secondaryHref: "/contact",
  },
};
