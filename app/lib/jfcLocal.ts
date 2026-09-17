/** JFC01 Jane Finch Cannabis — standalone local facts. Live-GBP-first NAP; FMD phone is fallback. */
export const SITE_ORIGIN = "https://www.janefinchcannabis.ca";
export const STORE_ID = `${SITE_ORIGIN}/#store`;

export const JFC = {
  brand: "Jane Finch Cannabis",
  streetAddress: "2728 Jane St",
  city: "North York",
  region: "ON",
  postalCode: "M3L 2G6",
  country: "CA",
  addressLine: "2728 Jane St, North York, ON M3L 2G6",
  phoneDisplay: "+1 (437) 524-9336",
  phoneIntl: "+14375249336",
  hoursLabel: "Open 24 Hours",
  hoursDetail: "Open 24 hours a day, 7 days a week",
  lat: 43.7432199,
  lng: -79.5144264,
  corridor: "Jane–Finch / Black Creek",
  mapsCidUrl: "https://www.google.com/maps?cid=6991178766551029626",
  mapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=2728+Jane+St,+North+York,+ON+M3L+2G6",
  mapsDirUrl:
    "https://www.google.com/maps/dir/?api=1&destination=2728+Jane+St,+North+York,+ON+M3L+2G6",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=2728+Jane+St,+North+York,+ON+M3L+2G6&output=embed",
  image:
    "https://www.janefinchcannabis.ca/wp-content/uploads/2026/04/7Clmh.jpg",
} as const;

export type VisibleFaq = { q: string; a: string };

/** Homepage FAQs — must match visible homepage copy exactly. */
export const HOME_FAQS: VisibleFaq[] = [
  {
    q: "Where is Jane Finch Cannabis in the Jane–Finch / Black Creek neighbourhood?",
    a: "Jane Finch Cannabis is the walk-in counter at 2728 Jane St, North York, ON M3L 2G6, on Jane Street in the Jane–Finch / Black Creek corridor. Call +1 (437) 524-9336.",
  },
  {
    q: "How do I get to 2728 Jane St from Finch Avenue West?",
    a: "Stay on Jane Street south of Finch Avenue West until the plaza storefront at 2728 Jane St. Plaza parking is in front of the store. The How to get here page has the Jane–Finch route notes.",
  },
  {
    q: "Do I need ID to walk into Jane Finch Cannabis?",
    a: "Yes. The counter is for adults 19+ with valid government photo ID. No appointment is required.",
  },
  {
    q: "Is Jane Finch Cannabis open overnight?",
    a: "The Jane Street storefront is listed open 24 hours a day, seven days a week. Use the same plaza entrance on Jane Street for overnight and early-shift visits.",
  },
  {
    q: "Does Jane Finch Cannabis deliver from this Jane Street store?",
    a: "Delivery is a separate Jane Finch Cannabis dispatcher service from 2728 Jane St. Ordering hours are 10:00 a.m. to 10:00 p.m. daily. The dispatcher confirms whether an address is in range. Walk-in at the Jane–Finch counter is available 24 hours.",
  },
];

/** /visit FAQs — different questions from the homepage; must match visible /visit copy. */
export const VISIT_FAQS: VisibleFaq[] = [
  {
    q: "What is the simplest Jane Street approach from Finch?",
    a: "From Finch Avenue West, turn onto Jane Street and continue toward 2728 Jane St. The storefront faces Jane Street in a plaza; look for the Jane Finch Cannabis sign rather than a mall interior unit.",
  },
  {
    q: "Which TTC routes help for Jane–Finch / Black Creek?",
    a: "The 35 Jane bus runs along Jane Street past the store. Finch Avenue West buses connect across the Finch West corridor. This page does not invent a stop number; use the current TTC trip planner for the ride you are on.",
  },
  {
    q: "Where do I park, and which door do I use?",
    a: "Plaza parking is directly in front of the Jane Street storefront at 2728 Jane St. Walk from the lot to the Jane Finch Cannabis entrance on the Jane Street face of the plaza. There is no separate rear counter advertised on this site.",
  },
  {
    q: "Can I come through from York University or Pioneer Village?",
    a: "Yes as a walk-in adult 19+. Those trips still end at 2728 Jane St on Jane Street, south of Finch Avenue West in the Black Creek neighbourhood. Use Jane Street as the last road, then the plaza lot in front of the store.",
  },
  {
    q: "Should I call before a Jane–Finch trip for one product?",
    a: "Call +1 (437) 524-9336 if one listing is the reason you are coming. Menus change. Bring government photo ID; adults 19+ only.",
  },
];

export function faqPageJsonLd(faqs: VisibleFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export const cannabisStoreJsonLd = {
  "@context": "https://schema.org",
  "@type": "CannabisStore",
  "@id": STORE_ID,
  name: JFC.brand,
  description:
    "Walk-in cannabis dispensary at 2728 Jane St in the Jane–Finch / Black Creek neighbourhood of North York. Open 24 hours. Adults 19+.",
  url: SITE_ORIGIN,
  telephone: JFC.phoneIntl,
  image: JFC.image,
  address: {
    "@type": "PostalAddress",
    streetAddress: JFC.streetAddress,
    addressLocality: JFC.city,
    addressRegion: JFC.region,
    postalCode: JFC.postalCode,
    addressCountry: JFC.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: JFC.lat,
    longitude: JFC.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  areaServed: {
    "@type": "Place",
    name: "Jane–Finch / Black Creek, North York",
  },
  sameAs: [JFC.mapsCidUrl],
  hasMap: JFC.mapsCidUrl,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_ORIGIN}/#website`,
  name: JFC.brand,
  url: SITE_ORIGIN,
  publisher: { "@id": STORE_ID },
};

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
