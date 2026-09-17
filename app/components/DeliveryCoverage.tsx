import Link from "next/link";
import { JFC, SITE_ORIGIN, STORE_ID } from "../lib/jfcLocal";

export function DeliveryCoverage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_ORIGIN}/delivery#service`,
    name: "Jane Finch Cannabis delivery",
    serviceType: "Cannabis delivery information",
    provider: { "@id": STORE_ID },
    url: `${SITE_ORIGIN}/delivery`,
    areaServed: { "@type": "Place", name: "Jane–Finch / Black Creek, North York" },
  };

  return (
    <section style={{ maxWidth: 1040, margin: "0 auto", padding: "24px 24px 64px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <h2>Delivery from the Jane Street counter</h2>
      <p>
        Delivery requests are dispatched from Jane Finch Cannabis at {JFC.addressLine}. The dispatcher confirms whether an address is in range. This site does not publish a kilometre radius or a list of other cities.
      </p>
      <p>Ordering hours are 10:00 a.m. to 10:00 p.m. daily. Walk-in at the Jane–Finch / Black Creek counter remains 24 hours.</p>
      <p><Link href="/delivery">Open the Jane Finch Cannabis delivery menu</Link></p>
    </section>
  );
}
