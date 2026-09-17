import type { Metadata } from "next";
import { AreaIntentPage } from "../components/AreaIntentPage";

export const metadata: Metadata = {
  title: "Vaughan Weed Delivery | Dispatched From North York",
  description: "Request Vaughan weed delivery dispatched from the Jane Finch Cannabis store in North York. The dispatcher confirms the service range. Adults 19+.",
  alternates: { canonical: "/weed-delivery-vaughan" },
};

export default function Page() {
  return <AreaIntentPage eyebrow="Vaughan delivery" h1="Vaughan Weed Delivery — Dispatched From North York" addressLine="Physical store: 2728 Jane St, North York, ON M3L 2G6" storeHref="/weed-dispensary-north-york" storeLabel="North York Walk-In Store" intro={[
    "Jane Finch Cannabis can arrange delivery requests for Vaughan from the physical store at 2728 Jane St in North York. There is no Jane Finch Cannabis storefront in Vaughan.",
    "The dispatcher confirms whether a Vaughan address is in range, along with timing and current availability. Check the live menu before requesting service because posted products and prices can change.",
  ]} sections={[{ heading: "Planning a Vaughan Delivery Request", paragraphs: ["Have the delivery address ready and call the store when one specific item matters. Walk-in customers should travel to the Jane Street counter in North York and use the walk-in page for store information."] }]} />;
}
