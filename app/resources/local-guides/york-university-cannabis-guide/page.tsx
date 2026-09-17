import type { Metadata } from "next";
import { GeneratedGuidePage } from "../../../components/GeneratedGuidePage";

export const metadata: Metadata = {
  title: "York University Students | Cannabis Guide Near Jane & Finch",
  description: "Plan an off-campus trip from the York University area to Jane Finch Cannabis at 2728 Jane St in North York.",
  alternates: { canonical: "/resources/local-guides/york-university-cannabis-guide" },
};

export default function Page() {
  return <GeneratedGuidePage guideKey="York University to 2728 Jane St" eyebrow="Off-campus North York guide" h1="Cannabis Near York University — Jane Finch Cannabis on Jane Street" />;
}

