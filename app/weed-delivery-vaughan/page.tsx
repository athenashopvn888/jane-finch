import type { Metadata } from "next";
import { AreaIntentPage } from "../components/AreaIntentPage";
import { SITE_ORIGIN } from "../lib/jfcLocal";

export const metadata: Metadata = {
  title: { absolute: "Delivery requests from Jane Street | Jane Finch Cannabis" },
  description:
    "Jane Finch Cannabis dispatches from 2728 Jane St in Jane–Finch / Black Creek. The dispatcher confirms whether a given address is in range. Adults 19+.",
  alternates: { canonical: `${SITE_ORIGIN}/delivery` },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <AreaIntentPage
      eyebrow="Dispatcher confirms range"
      h1="There is no Jane Finch Cannabis counter off Jane Street"
      addressLine="Physical store: 2728 Jane St, North York, ON M3L 2G6"
      storeHref="/visit"
      storeLabel="How to reach 2728 Jane St"
      menuHref="/delivery"
      intro={[
        "Jane Finch Cannabis is the walk-in store at 2728 Jane St in the Jane–Finch / Black Creek neighbourhood. Delivery requests, including trips that start north of Finch toward Vaughan, are still dispatched from that Jane Street counter when the dispatcher says the address is in range.",
        "Do not treat this URL as a second shop. Check the live delivery menu, then call or use LIVE ORDER so range, timing, and availability can be confirmed for that request.",
      ]}
      sections={[
        {
          heading: "If you are walking in instead",
          paragraphs: [
            "Travel to 2728 Jane St. Use the how-to-get-here page for Jane Street, Finch Avenue West, TTC, and plaza parking. Adults 19+ with government photo ID.",
          ],
        },
      ]}
    />
  );
}
