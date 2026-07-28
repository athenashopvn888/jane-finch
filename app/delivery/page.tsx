import type { Metadata } from "next";
import DeliveryCatalog from "./DeliveryCatalog";
import JFCWebChat from "./JFCWebChat";
import menu from "./delivery-menu.json";

export const metadata: Metadata = {
  title: { absolute: "Cannabis Delivery North York | Jane Finch Cannabis" },
  description: "Browse the Jane Finch Cannabis flower delivery menu in North York and connect with the store dispatcher through LIVE ORDER, daily from 10:00 a.m. to 10:00 p.m.",
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
      areaServed: { "@type": "City", name: "North York" },
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
