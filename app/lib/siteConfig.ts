/**
 * Site-wide recallable switch for cigarette and tobacco storefront surfaces.
 * SHOW_CIGARETTES defaults to false. NEXT_PUBLIC_SHOW_CIGARETTES overrides it
 * when set (true/1/yes/on or false/0/no/off). Rolling papers, Backwoods, and
 * cigarillos stay visible in either state.
 */
function readShowCigarettesEnv(raw: string | undefined): boolean | undefined {
  if (raw == null || raw.trim() === "") return undefined;
  const value = raw.trim().toLowerCase();
  if (value === "true" || value === "1" || value === "yes" || value === "on") return true;
  if (value === "false" || value === "0" || value === "no" || value === "off") return false;
  return undefined;
}

export const SHOW_CIGARETTES: boolean =
  readShowCigarettesEnv(process.env.NEXT_PUBLIC_SHOW_CIGARETTES) ?? false;

/** Nicotine vape shop page. Cigarette URLs 302 here while the switch is off. */
export const VAPE_PAGE_PATH = "/vape-shop-north-york";

const STATIC_CIGARETTE_PATHS = new Set([
  "/cigarettes",
  "/native-cigarettes-jane-finch",
  "/info/native-cigarettes-north-york",
  "/info/native-cigarettes-york",
]);

/** Brand guides under /guides. Backwoods stays. Delivery guides are not in this set. */
const HIDDEN_GUIDE_SLUGS = new Set([
  "canadian-classics",
  "nexus-cigarettes",
  "canadian-goose",
  "putters",
  "time-cigarettes",
  "rolled-gold",
  "canadian-cigarettes",
  "grabba",
  "playfares",
  "bb-cigarettes",
  "dks-cigarettes",
  "belmont-king-size",
]);

const KEPT_ITEM_SLUGS = new Set([
  "backwoods-assorted-flavors-20-25",
  "new-backwoods-flavors",
  "raw-paper-king-size",
  "nicotine-pouches-velo-pablo-killa",
]);

const HIDDEN_ITEM_SLUGS = new Set([
  "canadian-lights",
  "canadian-full",
  "putters",
  "canadian-goose-full",
  "canadian-goose-lights",
  "canadian-menthol",
  "canadian-classics-original",
  "canadian-classics-silver",
  "rolled-gold-lights",
  "nexus-full",
  "nexus-lights",
  "time-full",
  "grabba",
  "grabba-shaker-redrose-red-herring",
  "grabba-redrose-redherring",
  "grabba-shaker-redrose-red-herring-x2-available",
  "bb-full-carton",
  "bb-lights-carton",
  "belmont-king-size-pack-only",
  "10-x-premium-mix-cigarettes",
]);

export type SmokeProduct = { name?: string; slug?: string; category?: string };

function normalizePath(pathname: string): string {
  const withoutOrigin = pathname.replace(/^https?:\/\/[^/]+/i, "");
  const path = withoutOrigin.split("?")[0]?.split("#")[0] || "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

function keptSmokeText(value: string): boolean {
  return /backwood|cigarillo|rolling[\s-]?paper|raw[\s-]?paper|zig[\s-]?zag|\bocb\b/.test(value);
}

function pouchText(value: string): boolean {
  return /\b(pouch|pouches|zyn|velo|pablo|killa)\b/.test(value);
}

export function isHiddenGuideSlug(slug: string): boolean {
  if (SHOW_CIGARETTES) return false;
  return HIDDEN_GUIDE_SLUGS.has(slug);
}

export function isHiddenItemSlug(slug: string): boolean {
  if (SHOW_CIGARETTES) return false;
  const key = slug.toLowerCase();
  if (KEPT_ITEM_SLUGS.has(key) || keptSmokeText(key)) return false;
  if (pouchText(key)) return false;
  if (HIDDEN_ITEM_SLUGS.has(key)) return true;
  return /cigarette|tobacco|marlboro|belmont|grabba|^bb-|carton/.test(key);
}

export function isHiddenCigaretteProduct(item: SmokeProduct): boolean {
  if (SHOW_CIGARETTES) return false;
  const blob = `${item.name || ""} ${item.slug || ""}`.toLowerCase();
  if (item.slug && (KEPT_ITEM_SLUGS.has(item.slug) || keptSmokeText(item.slug.toLowerCase()))) return false;
  if (keptSmokeText(blob)) return false;
  if (item.slug && isHiddenItemSlug(item.slug)) return true;
  if ((item.category || "").toUpperCase() === "CIGARETTES") {
    if (pouchText(blob)) return false;
    return true;
  }
  return /\b(cigarettes?|tobacco|marlboro|belmont)\b/.test(blob);
}

/** Exact paths that 302 to the vape page while the switch is off. */
export function hiddenCigarettePaths(): string[] {
  if (SHOW_CIGARETTES) return [];
  return [
    ...STATIC_CIGARETTE_PATHS,
    "/resources/native-smokes",
    ...[...HIDDEN_GUIDE_SLUGS].map((slug) => `/guides/${slug}`),
    ...[...HIDDEN_ITEM_SLUGS].map((slug) => `/item/${slug}`),
  ];
}

/** True when this URL should 302 to the vape page while the switch is off. */
export function isCigaretteRedirectPath(pathname: string): boolean {
  if (SHOW_CIGARETTES) return false;
  const path = normalizePath(pathname);
  if (STATIC_CIGARETTE_PATHS.has(path)) return true;
  if (path === "/resources/native-smokes" || path.startsWith("/resources/native-smokes/")) return true;
  if (path.startsWith("/guides/")) {
    const slug = path.slice("/guides/".length);
    if (!slug || slug.includes("/")) return false;
    return isHiddenGuideSlug(slug);
  }
  if (path.startsWith("/item/")) {
    const slug = path.slice("/item/".length);
    if (!slug || slug.includes("/")) return false;
    return isHiddenItemSlug(slug);
  }
  return false;
}

export function mentionsCigaretteCopy(text: string): boolean {
  return /\b(cigarettes?|tobacco|native smokes|native cigarettes)\b/i.test(text);
}

/** Identity when the switch is on. Drops cigarette list clauses and cigarette links when off. */
export function omitCigaretteProse(text: string): string {
  if (SHOW_CIGARETTES || !text) return text;
  return text
    .replace(/\[([^\]]+)\]\((\/[^)\s]+)\)/g, (full, _label: string, href: string) =>
      isCigaretteRedirectPath(href) ? "" : full,
    )
    .replace(/`(\/[^`]+)`/g, (full, href: string) => (isCigaretteRedirectPath(href) ? "" : full))
    .replace(/, Native Cigarettes,/g, ",")
    .replace(/, cigarettes,/gi, ",")
    .replace(/, and cigarettes\b/gi, "")
    .replace(/\bcigarettes, /gi, "")
    .replace(/, native smokes,/gi, ",")
    .replace(/\bnative smokes, /gi, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+([,.;])/g, "$1")
    .replace(/\(\s*\)/g, "");
}

type FaqPair = { q: string; a: string };

const HIDDEN_FAQ_TEXT: Record<string, FaqPair> = {
  "Does this weed dispensary page replace the visit hub or the 24-hour FAQ?": {
    q: "Does this weed dispensary page replace the visit hub or the 24-hour FAQ?",
    a: "No. This page owns broad weed-dispensary intent. Arrival, parking, and TTC stay on the visit hub. Open-now hours stay on the 24-hour FAQ. Delivery and nicotine vapes have their own neighbourhood pages.",
  },
  "Can I walk in for flower, Native cigarettes, or nicotine vapes?": {
    q: "Can I walk in for flower or nicotine vapes?",
    a: "Yes, when those categories are listed. Use the five flower-tier pages or the North York nicotine vape page, then confirm the live menu. Adults 19+.",
  },
  "Can I walk in 24 hours for Native cigarettes or nicotine vapes?": {
    q: "Can I walk in 24 hours for nicotine vapes?",
    a: "Yes, when that category is listed. The 24-hour clock is the Jane Street walk-in. Use the North York nicotine vape page for the category path, then confirm the live menu.",
  },
  "Does Jane Finch have a separate nicotine pouches landing page?": {
    q: "Does Jane Finch have a separate nicotine pouches landing page?",
    a: "No dedicated pouches LP on this wave. This page is for the sold nicotine vape category only.",
  },
};

/** Returns the original FAQ list when the switch is on. */
export function visibleFaqs<T extends FaqPair>(faqs: readonly T[]): readonly T[] {
  if (SHOW_CIGARETTES) return faqs;
  const next: T[] = [];
  for (const faq of faqs) {
    const replacement = HIDDEN_FAQ_TEXT[faq.q];
    if (replacement) {
      next.push({ ...faq, q: replacement.q, a: replacement.a });
      continue;
    }
    if (mentionsCigaretteCopy(`${faq.q} ${faq.a}`)) continue;
    next.push(faq);
  }
  return next;
}
