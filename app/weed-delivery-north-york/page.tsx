import type { Metadata } from "next";
import { AreaIntentPage } from "../components/AreaIntentPage";

export const metadata: Metadata = {
  title: "North York Weed Delivery | Jane Finch Cannabis",
  description: "Request North York weed delivery dispatched from Jane Finch Cannabis at 2728 Jane St. Service range is confirmed by the dispatcher. Adults 19+.",
  alternates: { canonical: "/weed-delivery-north-york" },
};

export default function Page() {
  return <AreaIntentPage eyebrow="North York delivery" h1="North York Weed Delivery From Jane Finch Cannabis" addressLine="Dispatched from 2728 Jane St, North York, ON M3L 2G6" storeHref="/weed-dispensary-north-york" storeLabel="North York Walk-In Store" intro={[
    "Delivery from Jane Finch Cannabis is dispatched from 2728 Jane St, North York. The dispatcher confirms whether your address is in range. This is not a second North York storefront and not a Brampton store.",
    "Use the current menu to compare posted flower tiers and other formats before requesting service. Availability, pricing, timing, and delivery range are confirmed for the individual request.",
  ]} sections={[{ heading: "Walk-In and Delivery Are Separate", paragraphs: ["Customers visiting in person should use the North York walk-in page for the Jane and Finch counter. This page describes delivery intent only and does not change the store’s physical address."] }]} />;
}
