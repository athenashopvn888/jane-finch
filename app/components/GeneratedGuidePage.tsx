import { AreaIntentPage } from "./AreaIntentPage";
import guideData from "../lib/routeGuides.generated.json";

const hrefForLabel = (label: string) => {
  const value = label.toLowerCase();
  if (value.includes("concentrate")) return "/items/concentrates";
  if (value.includes("edible")) return "/items/edibles";
  if (value.includes("vape")) return "/items/vape-disposables";
  if (value.includes("flower")) return "/exotic-weed";
  return "/";
};

export function GeneratedGuidePage({ guideKey, eyebrow, h1 }: { guideKey: keyof typeof guideData; eyebrow: string; h1: string }) {
  const guide = guideData[guideKey];
  return <AreaIntentPage
    eyebrow={eyebrow}
    h1={h1}
    addressLine="Destination: 2728 Jane St, North York, ON M3L 2G6"
    storeHref="/visit"
    storeLabel="How to reach Jane Finch Cannabis"
    intro={guide.paragraphs}
    relatedLinks={guide.links.map((label) => ({ label, href: hrefForLabel(label) }))}
  />;
}
