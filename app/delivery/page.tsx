import type { Metadata } from "next";
import DeliveryCatalog from "./DeliveryCatalog";
import JFCWebChat from "./JFCWebChat";
import menu from "./delivery-menu.json";

export const metadata: Metadata = {
  title: { absolute: "Jane–Finch / Black Creek Delivery | Jane Finch Cannabis" },
  description: "Browse the Jane Finch Cannabis delivery menu dispatched from 2728 Jane St. LIVE ORDER connects you with the dispatcher daily from 10:00 a.m. to 10:00 p.m. Range is confirmed per request. Adults 19+.",
  alternates: { canonical: "https://www.janefinchcannabis.ca/delivery" },
};

export default function DeliveryPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Jane Finch Cannabis North York Delivery Menu",
      url: "https://www.janefinchcannabis.ca/delivery",
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: menu.products.length,
        itemListElement: menu.products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Jane Finch Cannabis Delivery",
      serviceType: "Cannabis delivery",
      url: "https://www.janefinchcannabis.ca/delivery",
      areaServed: { "@type": "Place", name: "Jane–Finch / Black Creek, North York" },
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "22:00",
      },
      offers: {
        "@type": "Offer",
        name: "Jane Finch Cannabis delivery fee",
        price: "10.00",
        priceCurrency: "CAD",
        eligibleTransactionVolume: {
          "@type": "PriceSpecification",
          name: "Product minimum",
          minPrice: "60.00",
          priceCurrency: "CAD",
        },
      },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <DeliveryCatalog />
      <JFCWebChat />
    </>
  );
}
