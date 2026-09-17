import type { Metadata } from "next";
import { AreaIntentPage } from "../components/AreaIntentPage";
import { SITE_ORIGIN } from "../lib/jfcLocal";

export const metadata: Metadata = {
  title: "Jane–Finch Delivery Notes | Jane Finch Cannabis",
  description:
    "Delivery requests from Jane Finch Cannabis are dispatched from 2728 Jane St. The dispatcher confirms range. Adults 19+.",
  alternates: { canonical: `${SITE_ORIGIN}/delivery` },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <AreaIntentPage
      eyebrow="Delivery from Jane–Finch / Black Creek"
      h1="Delivery dispatched from 2728 Jane St"
      addressLine="Dispatched from 2728 Jane St, North York, ON M3L 2G6"
      storeHref="/visit"
      storeLabel="How to reach the Jane Street counter"
      menuHref="/delivery"
      intro={[
        "Jane Finch Cannabis can take delivery requests from the walk-in counter at 2728 Jane St in the Jane–Finch / Black Creek neighbourhood. The dispatcher confirms whether your address is in range. This page does not publish a radius, fee table beyond the live delivery menu, or a second storefront.",
        "Ordering hours are 10:00 a.m. to 10:00 p.m. daily. Walk-in at Jane Street stays 24 hours. Use the delivery menu and LIVE ORDER when you want that path.",
      ]}
      sections={[
        {
          heading: "Walk-in and delivery are different doors on the same address",
          paragraphs: [
            "Coming in person? Use the homepage visit hub and the how-to-get-here notes for Jane Street, Finch Avenue West, plaza parking, and ID. This URL only describes delivery intent from 2728 Jane St.",
          ],
        },
      ]}
    />
  );
}
