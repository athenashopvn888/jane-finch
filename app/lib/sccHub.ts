/** SCC hub graph for JFC01. Wave 2 adds the North York delivery LP; keep live `*-weed` canonicals. */
import { DELIVERY_LP_PATH, OPEN_NOW_PATH, VISIT_PATH } from "./nap";

export const WEED_OWNER_PATH = "/weed-dispensary-north-york";

export const FLOWER_TIER_PAGES = [
  {
    key: "EXOTIC",
    href: "/exotic-weed",
    shortHref: "/exotic",
    name: "Exotic Weed",
    blurb: "Highest-positioned flower shelf at 2728 Jane St.",
  },
  {
    key: "PREMIUM",
    href: "/premium-weed",
    shortHref: "/premium",
    name: "Premium Weed",
    blurb: "Premium flower for Jane & Sheppard walk-in.",
  },
  {
    key: "AAA+",
    href: "/aaa-weed",
    shortHref: "/aaa",
    name: "AAA+ Weed",
    blurb: "AAA+ flower at the Jane–Finch counter.",
  },
  {
    key: "AA",
    href: "/aa-weed",
    shortHref: "/aa",
    name: "AA Weed",
    blurb: "AA flower for Jane–Finch value browsing.",
  },
  {
    key: "BUDGET",
    href: "/budget-weed",
    shortHref: "/budget",
    name: "Budget Weed",
    blurb: "Value-first flower, posted from $3/g.",
  },
] as const;

export const HUB_PAGES = [
  {
    href: "/",
    label: "Homepage local hub",
    blurb: "NAP, hours, map, and Jane–Finch menu cards.",
  },
  {
    href: VISIT_PATH,
    label: "Walk-in hub",
    blurb: "2728 Jane St pin, parking, TTC, Jane–Sheppard arrival.",
  },
  {
    href: WEED_OWNER_PATH,
    label: "North York cannabis store",
    blurb: "Weed intent owner for Jane Finch / North York.",
  },
  {
    href: OPEN_NOW_PATH,
    label: "24-hour North York FAQ",
    blurb: "Open-now hours truth for the walk-in counter.",
  },
  {
    href: DELIVERY_LP_PATH,
    label: "North York cannabis delivery",
    blurb: "Jane Finch courier window 10 a.m.–10 p.m., not 24h walk-in.",
  },
] as const;

export function siblingTierPages(currentHref: string) {
  return FLOWER_TIER_PAGES.filter((tier) => tier.href !== currentHref);
}

export function hubPagesExcept(currentHref: string) {
  return HUB_PAGES.filter((page) => page.href !== currentHref);
}
