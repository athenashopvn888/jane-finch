import type { Metadata } from "next";
import { GeneratedGuidePage } from "../../../components/GeneratedGuidePage";

export const metadata: Metadata = {
  title: "Highway 400 & Pioneer Village | North York Dispensary Guide",
  description: "Plan a current route from Highway 400 or Pioneer Village to Jane Finch Cannabis at 2728 Jane St in North York.",
  alternates: { canonical: "/resources/local-guides/highway-400-pioneer-village-cannabis" },
};

export default function Page() {
  return <GeneratedGuidePage guideKey="Highway 400 / Pioneer Village to 2728 Jane St" eyebrow="North York commuter guide" h1="Cannabis Off Highway 400 Near Pioneer Village — Jane Finch Cannabis" />;
}

