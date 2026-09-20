import Link from "next/link";
import { SITE_ORIGIN } from "../lib/nap";

const areas = ["North York", "Toronto", "Vaughan", "Etobicoke", "Brampton", "Mississauga"];

export function DeliveryCoverage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_ORIGIN}/weed-dispensary-north-york/#delivery-service`,
    name: "Jane Finch Cannabis delivery coverage",
    serviceType: "Cannabis delivery information",
    provider: { "@id": `${SITE_ORIGIN}/#store` },
    url: `${SITE_ORIGIN}/cannabis-delivery-north-york`,
    areaServed: [
      { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: 43.7432199, longitude: -79.5144264 }, geoRadius: 50000 },
      ...areas.map((name) => ({ "@type": "City", name })),
    ],
  };

  return <section style={{ maxWidth: 1040, margin: "0 auto", padding: "24px 24px 64px" }}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <h2>Delivery Coverage from Jane Finch Cannabis</h2>
    <p>Delivery is coordinated from the North York store and confirmed when an order is placed. A practical planning area is approximately 50 km from Jane Street and Finch Avenue, including North York, Toronto, Vaughan, Etobicoke, Brampton and Mississauga.</p>
    <p>Longer trips toward Barrie, Kitchener or Hamilton may be available when a driver is already positioned in that area. Extended coverage is not guaranteed, so confirm the destination and timing with the dispatcher before relying on delivery.</p>
    <p><Link href="/cannabis-delivery-north-york">North York cannabis delivery hours</Link> · <Link href="/delivery">LIVE ORDER delivery menu</Link></p>
  </section>;
}
