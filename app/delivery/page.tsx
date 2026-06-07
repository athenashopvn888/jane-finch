import type { Metadata } from "next";
import DeliveryContent from "./DeliveryContent";

export const metadata: Metadata = {
  title: "Delivery Coming Soon — Jane Finch Cannabis | North York",
  description: "Get notified when Jane Finch Cannabis launches same-day weed delivery across North York and surrounding areas.",
  alternates: {
    canonical: "https://janefinchcannabis.ca/delivery",
  },
};

export default function DeliveryPage() {
  return <DeliveryContent />;
}
