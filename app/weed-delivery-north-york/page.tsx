import type { Metadata } from "next";
import { AreaIntentPage } from "../components/AreaIntentPage";

export const metadata: Metadata = {
  title: "North York Weed Delivery | Jane Finch Cannabis",
  description: "Request North York weed delivery dispatched from Jane Finch Cannabis at 2728 Jane St. Courier hours are 10 a.m.–10 p.m. daily — not 24-hour delivery. Adults 19+.",
  alternates: { canonical: "/weed-delivery-north-york" },
};

export default function Page() {
  return <AreaIntentPage eyebrow="North York delivery" h1="North York Weed Delivery From Jane Finch Cannabis" addressLine="Dispatched from 2728 Jane St, North York, ON M3L 2G6" storeHref="/cannabis-delivery-north-york" storeLabel="North York Delivery Hours & FAQ" menuHref="/delivery" intro={[
    "Delivery from Jane Finch Cannabis is dispatched from 2728 Jane St, North York, in the Jane–Finch / Jane & Sheppard area. The dispatcher confirms whether your address is in range. This is not a second North York storefront.",
    "Courier hours are 10 a.m. to 10 p.m. daily. The Jane Street walk-in counter is open 24 hours, but delivery is not a 24-hour courier. Use LIVE ORDER on the delivery menu during that window.",
  ]} sections={[{ heading: "Walk-In and Delivery Are Separate", paragraphs: ["Customers visiting in person should use the North York walk-in page for the Jane and Finch counter. Neighbourhood delivery hours, how to order, and the FAQ live on the North York cannabis delivery page. This page does not change the store’s physical address."] }]} relatedLinks={[{ href: "/visit", label: "Walk-in hub" }, { href: "/weed-dispensary-north-york", label: "North York store page" }, { href: "/exotic-weed", label: "Exotic Weed" }, { href: "/premium-weed", label: "Premium Weed" }, { href: "/aaa-weed", label: "AAA+ Weed" }, { href: "/aa-weed", label: "AA Weed" }, { href: "/budget-weed", label: "Budget Weed" }]} />;
}
