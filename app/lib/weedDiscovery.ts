import {
  CITY,
  HOURS_LABEL,
  PHONE_DISPLAY,
  PHONE_INTL,
  POSTAL_CODE,
  SITE_ORIGIN,
  STORE_NAME,
  STREET_ADDRESS,
  OPEN_NOW_PATH,
  VISIT_PATH,
  WEED_FAQS,
  WEED_H1,
  WEED_LP_PATH,
  WEED_SEO_DESCRIPTION,
  WEED_SEO_TITLE,
} from "./nap";
import { gbpLocation } from "./gbp-location";

export type WeedDiscoveryLink = { label: string; description: string; href: string };
export type WeedFaq = { question: string; answer: string };

export const weedOwner = {
  storeName: STORE_NAME,
  domain: SITE_ORIGIN.replace(/^https:\/\//, ""),
  ownerPath: WEED_LP_PATH,
  city: CITY,
  streetAddress: STREET_ADDRESS,
  postalCode: POSTAL_CODE,
  phoneDisplay: PHONE_DISPLAY,
  phoneIntl: PHONE_INTL,
  hoursLabel: HOURS_LABEL,
  openingHours: "Mo-Su 00:00-24:00",
  seoTitle: WEED_SEO_TITLE,
  metaDescription: WEED_SEO_DESCRIPTION,
  h1: WEED_H1,
  introTitle: gbpLocation.sectionTitle,
  intro: [
    "Jane Finch Cannabis is the cannabis store in North York at 2728 Jane St, at Jane St & Sheppard Ave W in the Jane and Finch corridor. The store is open 24 hours, 7 days. This page is for people coming to the counter — neighbours around Jane Finch, shoppers coming down Jane Street, students heading over from the York University area, and drivers off Highway 400.",
    "Walk-in is separate from delivery. The Jane Street counter is open any hour. Delivery uses its own menu from 10 a.m. to 10 p.m. and does not change this address. Browse the five flower tiers before you travel. Posted Budget flower starts at $3/g. Product listings and prices can change, so use the current menu for today’s choices.",
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
      label: "Walk-In Hub",
      description: "Jane–Finch pin, hours, parking, TTC, and walk-in vs delivery.",
      href: VISIT_PATH,
    },
    {
      label: "24-Hour Open-Now FAQ",
      description: "24 hour dispensary North York hours truth, open now, and late arrival.",
      href: OPEN_NOW_PATH,
    },
    {
      label: "North York Cannabis Delivery",
      description: "Jane Finch courier hours 10 a.m.–10 p.m. — not 24-hour delivery.",
      href: "/cannabis-delivery-north-york",
    },
    {
      label: "Jane Finch Native Cigarettes",
      description: "Neighbourhood page for the cigarette category at 2728 Jane St.",
      href: "/native-cigarettes-jane-finch",
    },
    {
      label: "North York Nicotine Vape",
      description: "Dedicated nic-vape category, kept separate from THC vapes.",
      href: "/nicotine-vape-north-york",
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
  faq: WEED_FAQS.map((faq) => ({ question: faq.q, answer: faq.a })),
  home: {
    title: "Weed dispensary North York — Jane Finch owner",
    text: "This homepage holds NAP, hours, and the map at 2728 Jane St, North York — Jane St & Sheppard Ave W. The North York weed dispensary page owns weed-dispensary intent for Jane Finch. Use the visit hub for arrival and the 24-hour FAQ for open-now hours. Adults 19+.",
    primaryLabel: "Weed dispensary North York",
    secondaryLabel: "24-hour North York FAQ",
    secondaryHref: OPEN_NOW_PATH,
  },
};
